<?php

namespace Classes;

class Refacciones_accesorios{

    public $data;

    public function _construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'refacciones_accesorios',
        'primary' => 'idRefacciones_accesorios',
        'fields' => array(
            'idRefacciones_accesorios',
            'nombre', 
            'precio',
            'cantidad',
            'disponible'
        )
    );
}

?>