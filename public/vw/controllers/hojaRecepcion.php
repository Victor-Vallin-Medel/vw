<?php

$app->group('/hojas', function() use($db){

    $this->get('', function($req, $res, $args) use ($db){


        $result = $db->query("SELECT * FROM citas_completas")->fetchAll();

        $hojas = array();

        foreach($result as $row){
            $usuario = array(
                "idusuario" => $row['idusuario'],
                'nombre' => $row['usuario_nombre'],
                'apPat' => $row['usuario_apPat'],
                'apMat' => $row['usuario_apMat'],
            );

            $cita = array(
                'idcitas' => $row['idcitas'],
                'confirmacion' => $row['confirmacion'],
                'fecha' => $row['fecha']
            );

            $auto = array(
                'idautomovil' => $row['idautomovil'],
                'nombre' => $row['automovil_nombre'],
                'modelo' => $row['automovil_modelo'],
                'version' => $row['automovil_version']
            );

            $hoja = array(
                'idhojaRecepcion' => $row['idhojaRecepcion'],
                'observaciones' => $row['observaciones'],
                'citas_idcitas' => $row['idcitas'],
                'usuario' => $usuario,
                'cita' => $cita,
                'automovil' => $auto
            );

            array_push($hojas, $hoja);
        }

        $res->getBody()->write(
            json_encode(
                $hojas
            )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req, $res, $args){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM hojaRecepcion WHERE idhojaRecepcion = $id")->fetchArray()
            )
        );
    });

    $this->get('/', function($req, $res, $args) use($db){
        $params = $req->getQueryParams();
        if( isset($params['idstates']) ){
            $state = $params['idstates'];
            $res->getBody()->write(
                json_encode(
                    $db->query("SELECT * FROM hojaRecepcion WHERE states_idstates = $state")->fetchAll()
                )
            );
            return $res->withStatus(200);
        }

        return $res->withStatus(400);
    });

    $this->post('', function($req, $res, $args) use ($db){
        $data = $req->getParsedBody();

        $columns = array('observaciones', 'citas_idcitas');
        foreach($data as $key => $value){
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
        }

        $hoja = array( json_encode($data['observaciones']), $data['citas_idcitas'] );

        $result = $db->query("INSERT INTO hojaRecepcion (observaciones, citas_idcitas) VALUES (?, ?)", $hoja);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrió un error inesperado"
                    )
                )
            );
            return $res->withStatus(400);
        }

        return $res->withStatus(200);
    });

    $this->patch('', function($req, $res, $args) use ($db){
        $data = $req->getParsedBody();

        $columns = array('observaciones', 'citas_idcitas');

        foreach($data as $key => $value){
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
        }

        foreach($data as $key => $value){
            if( gettype($value) == 'string' )
                $result = $db->query("UPDATE FROM hojaRecepcion SET $key = '$value'");
            else
                $result = $db->query("UPDATE FROM hojaRecepcion SET $key = $value");
            if($result->affectedRows() != 1){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "No existe el campo $key"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        return $res->withStatus(200);
    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        $result = $db->query("DELETE FROM hojaRecepcion WHERE idhojaRecepcion = $id");
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrió un error eliminando la hoja de recepcion"
                    )
                )
            );
            return $res->withStatus(400);
        }
        return $res->withStatus(200);
    });
});

?>