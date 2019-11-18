<?php

namespace Classes;

class Automovil{

    public $data;

    public function _construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'automovil',
        'primary' => 'idAutomovil',
        'fields' => array(
            'idAutomovil',
            'num_serie', 
            'version',
            'modelo',
            'Cliente_idCliente'
        )
    );
}

?>