<?php


$app->group('/citas',function() use ($db){
    $this->get('/', function($req, $res, $args) use ($db){
        $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM citas")->fetchAll() )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM citas idcitas = $id")->fetchArray() )
        );
        return $res->withStatus(200);
    });

    $this->post('/', function($req, $res, $args) use ($db){
        $data = $req->getParsedBody();

        $columns = array('fecha', 'confirmacion', 'automovil_idautomovil', 'usuario_idusuario');

        foreach($columns as $column){
            if( !array_key_exists($data, $column) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "Falta el campo $column"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        $cita = array( $data['fecha'], $data['confirmacion'], $data['automovil_idautomovil'], $data['usuario_idusuario'] );

        $result = $db->query("INSERT INTO citas (fecha, confirmacion, automovil_idautomovil, usuario_idusuario) VALUES (?,?,?,?)", $cita);
        
        if($result->affectedRows() == 0 ){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Hubo un error inesperado insertado el registro"
                    )
                )
            );
            return $res->withStatus(400);
        }

        return $res->withStatus(200);
    });

    $this->patch('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write(
            json_encode()
        );
    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        $result = $db->query("DELETE FROM citas WHERE idcita = $id");
        if($result->affectedRows() == 0){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "La cita con id $id no existe"
                    )
                )
            );
            return $res->withStatus(400);
        }
        return $res->withStatus(200);
    });


});

?>