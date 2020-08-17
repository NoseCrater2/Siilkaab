<?php
namespace App\Traits;

use App\Binnacle;
use Illuminate\Database\Eloquent\Model;

trait SaveBinnacleTrait

{
    protected function track(Model $model,$action, callable $func = null, $table = null, $id = null)
    {
        // Allow for overriding of table if it's not the model table
        $table = get_class($model);
        // Allow for overriding of id if it's not the model id
        $id = $id ?: $model->id;

        switch ($action){
            case 'CREATED':
                $this->getCreated($table, $id);
            break;

            case 'UPDATED':
                $this->getUpdated($model,$table, $id);
            break;

            case 'DELETED':
                $this->getDeleted($model,$table, $id);
            break;

            case 'FORCE DELETED':

            break;

        }

        
    }

    protected function getUpdated($model,$table, $id)
    {
       
       Binnacle::create([
        'binnacleable_type' => $table,
        'binnacleable_id'   => $id,
        'action'            => "UPDATED",
        'actor_id'      => auth('api')->user() ==! null,
        'body'          => json_encode($model->getDirty()),
        ]);
    }

    public function getCreated($table,$id)
    {
        
       Binnacle::create([
            'binnacleable_type' => $table,
            'binnacleable_id'    => $id,
            'actor_id'        =>0,
            'action'            => 'CREATED',
        ]);
    }

    public function getDeleted($model,$table,$id){
        Binnacle::create([
            'binnacleable_type' => $table,
            'binnacleable_id'    => $id,
            'actor_id'        => auth('api')->user() ==! null,
            'action'            => 'DELETED',
            'body'          => json_encode($model->getRawOriginal(null,'id','name','last_name','email')),
        ]);
    }
}