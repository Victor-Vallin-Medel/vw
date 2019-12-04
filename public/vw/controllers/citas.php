<?php


$app->group('/citas',function() use ($db){
    $this->get('', function($req, $res, $args) use ($db){
        $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM citas")->fetchAll() )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM citas WHERE idcitas = $id")->fetchArray() )
        );
        return $res->withStatus(200);
    });

    $this->post('', function($req, $res, $args) use ($db){
        $data = $req->getParsedBody();

        $columns = array('fecha', 'confirmacion', 'numserie', 'usuario_idusuario');

        foreach($columns as $column){
            if( !array_key_exists($column, $data) ){
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

        $cita = array( $data['fecha'], $data['confirmacion'], $data['numserie'], $data['usuario_idusuario'] );

        $result = $db->query("INSERT INTO citas (fecha, confirmacion, numserie, usuario_idusuario) VALUES (?,?,?,?)", $cita);
        
        if($result->affectedRows() != 1 ){
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
        $cita = $req->getParsedBody();
        
        $columns = array('fecha', 'confirmacion', 'numserie', 'usuario_idusuario');

        foreach($cita as $key => $value){

            if( !in_array($key, $columns) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "No existe el campo $key"
                        )
                    )
                );
                return $res->withStatus(400);
            }

            if(gettype($value) == 'string'){
                $query = "UPDATE citas SET $key = '$value' WHERE idcitas = $id";
            }
            else{
                $query = "UPDATE citas SET $key = $value WHERE idcitas= $id";
            }
            $result = $db->query($query);
        }

        return $res->withStatus(200);
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