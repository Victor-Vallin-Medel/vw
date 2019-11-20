<?php

namespace Classes;

class Usuario{

    public $data;

    public function __construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'usuario',
        'primary' => 'idUsuario',
        'fields' => array(
            'idUsuario', 
            'apPat',
            'apMat',
            'calle',
            'colonia',
            'ciudad',
            'activo',
            'cp',
            'Usuarios_idUsuarios',
            'rol',
            'usuario',
            'password'
        )
    );
}

?>