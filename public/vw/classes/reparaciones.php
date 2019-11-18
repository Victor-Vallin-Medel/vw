<?php

namespace Classes;

class Reparaciones{

    public $data;

    public function _construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'reparaciones',
        'primary' => 'idReparaciones',
        'fields' => array(
            'idReparaciones',
            'nombre', 
            'precio_aprox',
            'recomendaciones'
        )
    );
}

?>