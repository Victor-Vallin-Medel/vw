<?php

namespace Classes;

class Automovil{

    public $data;

    public function __construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'automovil',
        'primary' => 'idautomovil',
        'fields' => array(
            'idautomovil',
            'num_serie', 
            'version',
            'modelo',
            'Cliente_idcliente'
        )
    );
}

?>