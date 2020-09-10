<?php

namespace App\Http\Controllers;

use App\Calendar;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function eventsForMonth($month, $year)
    {
        $events = Calendar::where('month', $month)
                        ->where('year', $year)->get();

        return response()->json($events);
    }


    public function eventsCountForYear($year)
    {
        $events = Calendar::where('year', $year)
            ->groupBy('month')
            ->selectRaw('count(*) as total, month')->get();
        
            return response()->json($events);
    }

    public function store()
    {
        Calendar::create([
           'type' => request('type'),
           'content' => request('content'),
           'day' => request('day'),
           'hour' => request('hour'),
           'month' => request('month'),
           'year' => request('year'),
        ]);

        return response()->json("Evento creado correctamente");
    }
}
