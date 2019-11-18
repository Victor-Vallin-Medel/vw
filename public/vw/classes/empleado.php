<?php

namespace Classes;

class Empleado{

    public $data;

    public function _construct($data){
        $this->data = $data;
    }

    public static $definition = array(
        'table' => 'empleado',
        'primary' => 'idEmpleado',
        'fields' => array(
            'idEmpleado', 
            'apPat',
            'apMat',
            'rol',
            'Usuarios_idUsuarios',
        )
    );
}

?>