<?php

namespace App\Http\Controllers;

use App\Room;
use App\Hotel;
use App\Rate;
use App\Messages;
use App\Binnacle;
use App\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\IndexReservationResource;
use App\Http\Resources\ShowReservationResource;
use App\Http\Resources\BinnacleShowResource;
use App\Http\Resources\BinnacleIndexResource;
use App\Mail\ChangedState;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    public function index(Hotel $hotel)
    {
        return IndexReservationResource::collection(
            $hotel->reservations()->orderBy('created_at','desc')->get()
        );
    }

    public function show(Reservation $reservation)
    {
        return new ShowReservationResource(Reservation::findOrFail($reservation->id));
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $rules = [
            'nights' => 'required|numeric|min:1',
            'from' => 'required|date_format:Y-m-d',
            'to' => 'required|date_format:Y-m-d|after:from',
            'guest_name' => 'required|string',
            'guest_last_name' => 'required|string',
            'guest_country' => 'required|string',
            // 'guest_names' => 'required|string',
            'guest_email' => 'required|email',
            'guest_phone' => 'required|string',
            'guest_petitions' => 'nullable|string',
            'check_in' => 'required|date_format:H:i',
            'payed' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'state' => 'required|in:Confirmed,Cancelled',
            'hotel_id' => 'required|exists:hotels,id',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            $r = DB::transaction(function () use ($data) {
                $reservation = Reservation::create($data);
                foreach ($data['rooms'] as $key => $room) {
                    $currentRoom = Room::find($room['id']);
                    $roomPrice = 0;
                    foreach ($room['rates'][0] as $rate) {
                        $roomPrice += $rate['price'];
                        if(isset($rate['id'])){
                            Rate::find($rate['id'])->decrement('bed_rooms',1);
                            $reservation->rates()->syncWithoutDetaching([$rate['id']]);
                        }else{
                            $currentRoom->decrement('quantity',1);
                        }
                    }

                    $reservation->rooms()->attach($currentRoom->id,
                    [
                        'guest_name' => $data['guest_names'][$key],
                        'adults' => intval($data['guests'][$key]['adults']),
                        'children' => intval($data['guests'][$key]['children']),
                        'child_ages' => json_encode($data['guests'][$key]['ages']),
                        'price' => $roomPrice,
                    ]);
                }
                return $reservation;
            });

            return new ShowReservationResource(Reservation::findOrFail($r->id));
        }
    }


    public function history(Reservation $reservation)
    {
        return  BinnacleShowResource::collection(
            Binnacle::where('binnacleable_id', $reservation->id)
                    ->where('binnacleable_type', 'App\Reservation')
                    ->orderBy('updated_at', 'desc')->get()
        );
    }

    public function updateClientInformation(Request $request, Reservation $reservation)
    {
        $data = $request->all();
        $rules = [
            'guest_name' => 'required|string',
            'guest_last_name' => 'required|string',
            'guest_country' => 'required|string',
            'guest_names' => 'required|array',
            'guest_email' => 'required|email',
            'guest_phone' => 'required|string',
            'guest_petitions' => 'nullable|string',
            'check_in' => 'required|date_format:H:i',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{

             foreach ($data['guest_names'] as $room) {
                DB::table('reservation_room')
                ->where('id', $room['id'])
                ->update(['guest_name' => $room['name']]);
                // $reservation->rooms()->updateExistingPivot($room['id'], ['guest_name' => $room['name']]);
             }
            $reservation->update($data);
            return new ShowReservationResource(Reservation::findOrFail($reservation->id));
        }
    }

    public function updateState(Request $request, Reservation $reservation)
    {
        $data = $request->all();
        $rules = [
            'state' => 'required|in:Confirmed,Pending,Cancelled,Aborted',
            'send_email' => 'required|boolean',
        ];

        $validator= Validator::make($data,$rules, Messages::getMessages());
        if($validator->fails()){
            return response($validator->errors(),422);
        }else{
            // dd($data['send_email']);
            $pastState = $reservation->state;
            $reservation->update($data);
            if($data['send_email']){
                Mail::to($reservation->guest_email)->send(new ChangedState($reservation, $pastState));
            }
            return new ShowReservationResource(Reservation::findOrFail($reservation->id));
        }
    }

    public function dashboard()
    {
        $now = Carbon::now()->addDays(1)->format('Y-m-d');
        $before15days = Carbon::now()->subDays(15)->format('Y-m-d');
        $period = new DatePeriod(new DateTime($before15days), new DateInterval('P1D'), new DateTime($now));
        foreach ($period as $date) {
            $dates[] = $date->format("Y-m-d");
        }
        $ids = auth('sanctum')->user()->hotels->map(function($hotel){
            return $hotel->id;
        });

        $hotels = new Collection();
        foreach ($ids as $id) {
            $hotel = [];
            $h = Hotel::find($id);
            $hotel['id'] = $h->id;
            $hotel['color'] =  $h->configuration['color'];
            $hotel['title'] =  $h->title;
            $counts = [];
            foreach ($dates as $date) {
                $counts[] = $h->reservations()->whereDate('created_at',$date)->count();
            }

            $hotel['counts'] =  $counts;
            $hotel['range'] =  $dates;


            $hotels->put($id, $hotel);
        }

        return $hotels;
    }


    public function earnings($year, $id)
    {
        //COUNT PER YEAR
        $result = DB::table('reservations')
            ->selectRaw('MONTH(created_at) month, COUNT(*) count, SUM(total_price) summatory')
            ->where('hotel_id', '=', $id)
            ->whereRaw("YEAR(created_at) = ?", [$year])
            ->groupBy('month')
            ->get();
        return $result;
    }

    public function anualEarnings($id)
    {
         $result = DB::table('reservations')
            ->where('hotel_id', '=', $id)
            ->selectRaw('YEAR(created_at) as year, COUNT(*) count, SUM(total_price) summatory')
            ->groupBy('year')
            ->limit(10)
            ->orderBy('year', 'desc')
            ->get();

        return $result;
    }

    public function dashboardReservations()
    {
        $hotels = auth('sanctum')->user()->hotels->map(function($hotel){
            return $hotel->id;
        });
        return IndexReservationResource::collection(
            // Reservation::whereIn('hotel_id',[1,2,3])->limit(10)->get()
            Reservation::whereIn('hotel_id',$hotels)->limit(10)->orderBy('created_at', 'desc')->get()
        );
    }

}
