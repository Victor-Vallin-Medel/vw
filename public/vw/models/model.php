<?php

namespace Models{

    class Model{

        /**
         * Return a query with all objects in a table. The executed query is "SELECT * FROM $object->table_name;"
         * @param $db   DB The database connection
         * @param $object   Object(mixed) The instance of a class with desired data to be queried. For example: new Usuario($data)
         * @return Array    An associative array with the result of the query
         */
        public static function getObjects($db, $object){
            $class = get_class($object);
            $table = $class::$definition["table"];
            return $db->query("SELECT * FROM $table")->fetchAll();
        }
    
        /**
         * Return a query with the matched objects with conditions in a table. The executed query is "SELECT * FROM $object->table_name;"
         * @param $db   DB The database connection
         * @param $object   Object(mixed) The instance of a class with desired data to be queried. For example: new Usuario($data)
         * @return Array    An associative array with the result of the query
         */
        public static function getObject($db, $object){
            $class = get_class($object);
            $table = $class::$definition["table"];
            $primary = $class::$definition["primary"];
            $id = $object->data[$primary];
            return $db->query("SELECT * FROM $table WHERE $primary = $id ")->fetchAll();
        }

        /**
         * Return a query with all objects in a table. The executed query is "SELECT * FROM $object->table_name;"
         * @param $db   DB The database connection
         * @param $object   Object(mixed) The instance of a class with desired data to be queried. For example: new Usuario($data)
         * @return Array    An associative array with the result of the query
         */
        public static function getObjectsByAttributes($db, $object){
            $class = get_class($object);
            $table = $class::$definition["table"];

            $query_attributes = createStringSeparatedByString(array_keys($object->data), ",");
            $conditions = createStringKeyEqualsValue($object->data,'AND');

            return $db->query("SELECT $query_attributes FROM $table WHERE $conditions")->fetchAll();
        }

        /**
         * Delete an object of the object table with the specified object id
         * @param $db   DB The database connection
         * @param $object   Object(mixed) The instance of a class with desired data to be queried. For example: new Usuario($data)
         * @return          Boolean     true if the delete operation success, otherwise returns false
         */
        public static function deleteObjectById($db, $object){
            $class = get_class($object);
            $table = $class::$definition["table"];
            $primary = $class::$definition['primary'];
            $id = $object->data[$primary];
            return $db->query("DELETE FROM $table WHERE $primary = $id");
        }

        /**
         * Update an object based on the object id.
         */
        public static function updateObjectById($db, $object){
            $class = get_class($object);
            $table = $class::$definition["table"];
            $primary = $class::$definition['primary'];
            $id = $object->data[$primary];
            unset($object->data[$primary]);
            $update_string = createStringKeyEqualsValue($object->data, ',');
            return $db->query("UPDATE $table SET $update_string WHERE $primary = $id");
        }

        public static function insertObject($db, $object){
            $class = get_class($object);
            $table = $class::$definition["table"];
            $values = createStringSeparatedByComasWithQuotes($object->data);
            $columns = createStringSeparatedByComas( array_keys($object->data) );
            //echo "INSERT INTO $table($columns) VALUES ($values)";
            return $db->query("INSERT INTO $table($columns) VALUES ($values)")->affectedRows();
        }
    }

    /** 
     * Returns a string in the form: "attr1 $intermediate_string attr2 $intermidiate_string attr3 $intermediate_string ... $intermediate_string attrn"
     * For example: if $intermediate_string = ',' this function returns "attr1 , attr2 , attr3 , ... , attrn"
     * @param $attrs    Array           The array of attributes
     * @return $string  String          The formated string 
    */
    function createStringSeparatedByString($array, $intermediate_string){
        //Execute function with all elements of array except the last one

        $sliced_array = array_slice($array, 0, count($array)-1);

        $string = array_reduce($sliced_array, function($carry, $item){
            $carry .= $item;
            return $carry;
        });

        //Add the last element to the stirng
        $string.= $array[count($array)-1];
        
        return $string;
    }

    /**
     * This function creates a string separated by comas. This string is used to specify the columns to insert information
     */
    function createStringSeparatedByComas($array){
        $sliced_array = array_slice($array, 0, count($array)-1);

        $string = array_reduce($sliced_array, function($carry, $item){
            $carry .= $item.',';
            return $carry;
        });
        $string.= end($array);
        return $string;
    }

    function createStringSeparatedByComasWithQuotes($array){
        $sliced_array = array_slice($array, 0, count($array)-1);

        $string = array_reduce($sliced_array, function($carry, $item){
            if(gettype($item) == 'string') $carry.="'";
            $carry .= $item;
            if(gettype($item) == 'string') $carry.="'";
            $carry.=',';
            return $carry;
        });
        $last = end($array);
        if(gettype($last) == 'string') $string.="'";
        $string.= $last;
        if(gettype($last) == 'string') $string.="'";
        return $string;
    }



    /**
     * Returns a string in the form " attr1 = value1 $intermediate_string attr2 = 'value2' "
     * @param $attrs    Array           The array of attributes
     * @param $intermediate_string  String  A string to put between two different array values, 
     *        for example: If $intermediate_string = "AND" this function will return: 
     *        " attr1 = value1 AND attr2 = 'value2' "
     * @return $string  String          The formated string 
     */
    function createStringKeyEqualsValue($attrs,$intermediate_string){
        $string = '';
        $sliced_array = array_slice($attrs, 0, count($attrs)-1);

        $string_helper = array(&$string, &$intermediate_string);

        array_walk($sliced_array , function($value, $key) use(&$string_helper){
            $string_helper[0] .= "$key = ";
            //Put quotes if value type is string
            if( gettype($value) == 'string' ){
                $string_helper[0] .= "'";
            }
            $string_helper[0] .= $value;
            //Put quotes if value type is string
            if( gettype($value) == 'string' ){
                $string_helper[0] .= "'";
            }
            $string_helper[0] .= " $string_helper[1] ";
        });
        //Get last element of array
        $last_value = end($attrs);
        
        $string.= key( $attrs ) . ' = ';

        //Put quotes if value type is string
        if( gettype($last_value) == 'string' ){
            $string.= "'";
        }

        //Add last value to string
        $string.= $last_value;

        //Put quotes if value type is string
        if( gettype($last_value) == 'string' ){
            $string.= "'";
        }

        return $string;
    }

}

?>