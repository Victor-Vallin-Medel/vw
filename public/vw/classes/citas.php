<?php

namespace Classes;

class Citas{

    public $data;

    public function _construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'citas',
        'primary' => 'idCitas',
        'fields' => array(
            'idCitas',
            'fecha', 
            'confirmacion',
            'Cliente_idCliente',
            'Automovil_idAutomovil'
        )
    );
}

?>