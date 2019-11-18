<?php

namespace Classes;

class Cliente{

    public $data;

    public function _construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'cliente',
        'primary' => 'idCliente',
        'fields' => array(
            'idCliente', 
            'apPat',
            'apMat',
            'calle',
            'colonia',
            'ciudad',
            'activo',
            'Usuarios_idUsuarios',
            'cp'
        )
    );
}

?>