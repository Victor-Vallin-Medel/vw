<?php

namespace Classes;

class Usuario{

    public $data;

    public function __construct($data = array()){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'usuario',
        'primary' => 'idusuario',
        'fields' => array(
            'idusuario', 
            'nombre',
            'apPat',
            'apMat',
            'calle',
            'colonia',
            'ciudad',
            'activo',
            'cp',
            'rol',
            'usuario',
            'password'
        )
    );
}

?>