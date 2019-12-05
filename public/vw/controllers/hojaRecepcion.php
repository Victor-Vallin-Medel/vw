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
                'version' => $row['automovil_version'],
                'numserie' => $row['numserie']
            );

            $hoja = array(
                'idhojaRecepcion' => $row['idhojaRecepcion'],
                'observaciones' => $row['observaciones'],
                'citas_idcitas' => $row['idcitas'],
                'states_idstates' => $row['states_idstates'],
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

    $this->get('/estado/{estado}', function($req, $res, $args) use ($db){
        $estado = $args['estado'];

        $citas = $db->query("SELECT idusuario, usuario_nombre, usuario_apPat, usuario_apMat, usuario_email, idcitas, fecha, confirmacion, idhojaRecepcion, JSON_EXTRACT(observaciones,'$.observaciones') as observaciones, states_idstates, numserie, idautomovil, automovil_nombre, automovil_version, automovil_modelo FROM citas_completas WHERE states_idstates = $estado ORDER BY fecha DESC")->fetchAll();

        $return = array();
        foreach($citas as $cita){
            $cita_aux = array(
                "idcitas" => $cita['idcitas'],
                "confirmacion" => $cita['confirmacion'],
                "fecha" => $cita['fecha'],
                "numserie" => $cita['numserie'],
                "usuario_idusuario" => $cita['idusuario']
            );

            $usuario = array(
                "idusuario" => $cita['idusuario'],
                "nombre" => $cita['usuario_nombre'],
                "apPat" => $cita['usuario_apPat'],
                "apMat" => $cita['usuario_apMat'],
                "email" => $cita['usuario_email']
            );

            $auto = array(
                "idautomovil" => $cita['idautomovil'],
                "nombre" => $cita['automovil_nombre'],
                "modelo" => $cita['automovil_modelo'],
                "version" => $cita['automovil_version']
            );

            $idHoja = $cita['idhojaRecepcion'];
            $reparaciones = $db->query("SELECT rv.idreparaciones, rv.nombre, rv.descripcion, rv.precio FROM hojaRecepcion_has_reparaciones hr, reparaciones_view rv WHERE hr.hojaRecepcion_idhojaRecepcion = $idHoja AND hr.reparaciones_idreparaciones = rv.idreparaciones")->fetchAll();

            $hoja = array(
                "idhojaRecepcion" => $cita['idhojaRecepcion'],
                "observaciones" => $cita['observaciones'],
                "citas_idcitas" => $cita['idcitas'],
                "states_idstates" => $cita['states_idstates'],
                "usuario" => $usuario,
                "automovil" => $auto,
                "cita" => $cita_aux,
                "reparaciones" => $reparaciones
            );
            array_push($return, $hoja);
        }

        $res->getBody()->write(
            json_encode(
                $return
            )
        );
        return $res->withStatus(200);
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

    //Add reparacionees to hojaRecepcion
    $this->post('/', function($req, $res, $args) use($db){
        $params = $req->getQueryParams();
        if( isset($params['idreparaciones']) ){
            $data = $req->getParsedBody();

            $reparaciones = $data['reparaciones_idreparaciones'];

            foreach($reparaciones as $reparacion){
                $rep = array( $data['hojaRecepcion_idhojaRecepcion'], $reparacion );
                $result = $db->query("INSERT INTO hojaRecepcion_has_reparaciones (hojaRecepcion_idhojaRecepcion, reparaciones_idreparaciones) VALUES (?,?)",$rep);
                if($result->affectedRows() != 1){
                    $res->getBody()->write(
                        json_encode(
                            array(
                                "error" => "Ocurrio un error insertando los datos"
                            )
                        )
                            );
                    return $res->withStatus(400);
                }
            }

            return $res->withStatus(200);
        }
        return $res->withStatus(400);
    });

    $this->patch('/{id}', function($req, $res, $args) use ($db){

        $id = $args['id'];

        $data = $req->getParsedBody();

        $columns = array('observaciones', 'citas_idcitas', 'states_idstates');

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

        if( isset($data['observaciones']) ){
            $json = json_encode($data['observaciones']);
            $db->query("UPDATE hojaRecepcion SET observaciones = '$json' WHERE idhojaRecepcion = $id");
            unset($data['observaciones']);
        }

        foreach($data as $key => $value){
            if( gettype($value) == 'string' )
                $query = "UPDATE hojaRecepcion SET $key = '$value' WHERE idhojaRecepcion = $id";
                
            else
                $query = "UPDATE hojaRecepcion SET $key = $value WHERE idhojaRecepcion = $id";
            $result = $db->query($query);
            if($result->affectedRows() < 0){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "error insertando el campo $key".$result->affectedRows()
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