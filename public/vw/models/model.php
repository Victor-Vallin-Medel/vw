<?php

namespace Models{

    class Model{
        public static function getObjects($db,$object){
            $class = get_class($object);
            $table = $class::$definition["table"];
            return $db->query("SELECT * FROM $table");
        }
    
        public static function getObject($object){
            $class = get_class($object);
            return $db->query("SELECT * FROM $class->definition['table'] WHERE $class->definition['primary'] = $object->data['id']")->fetchAll();
        }
    }

}

?>