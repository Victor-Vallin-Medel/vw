CREATE DATABASE  IF NOT EXISTS `vw` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `vw`;
-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: vw
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `automovil`
--

LOCK TABLES `automovil` WRITE;
/*!40000 ALTER TABLE `automovil` DISABLE KEYS */;
INSERT INTO `automovil` VALUES (1,'Polo','Comfortline','2012'),(2,'Polo','Economica','2018'),(3,'Vento','Comfortline','2019'),(4,'Vento','Economica','2010');
/*!40000 ALTER TABLE `automovil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,'2019-12-10 00:00:00','0',2,'23423'),(2,'2019-12-09 00:00:00','0',2,'45234'),(3,'2019-01-02 00:00:00','1',2,'23423');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER crearHoja AFTER INSERT ON citas FOR EACH ROW INSERT INTO hojaRecepcion (citas_idcitas, states_idstates) VALUES (NEW.idcitas, 1) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Aguascalientes');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,'Granjenito #114','20240','Barrio del Encino',1),(2,'Colón #204','20240','Barrio de la estación',1),(3,'Paseo del Oliver #732','23423','Santa Anita',1),(4,'Alba','238947','ajsdh',1);
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hojaRecepcion`
--

LOCK TABLES `hojaRecepcion` WRITE;
/*!40000 ALTER TABLE `hojaRecepcion` DISABLE KEYS */;
INSERT INTO `hojaRecepcion` VALUES (1,NULL,1,1),(2,NULL,2,1),(3,NULL,3,1);
/*!40000 ALTER TABLE `hojaRecepcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `hojaRecepcion_has_reparaciones`
--

LOCK TABLES `hojaRecepcion_has_reparaciones` WRITE;
/*!40000 ALTER TABLE `hojaRecepcion_has_reparaciones` DISABLE KEYS */;
INSERT INTO `hojaRecepcion_has_reparaciones` VALUES (1,1),(3,1),(1,2),(2,2);
/*!40000 ALTER TABLE `hojaRecepcion_has_reparaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `refacciones`
--

LOCK TABLES `refacciones` WRITE;
/*!40000 ALTER TABLE `refacciones` DISABLE KEYS */;
INSERT INTO `refacciones` VALUES (1,'Kit de servicio',50,14),(2,'Llanta',800,24);
/*!40000 ALTER TABLE `refacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reparaciones`
--

LOCK TABLES `reparaciones` WRITE;
/*!40000 ALTER TABLE `reparaciones` DISABLE KEYS */;
INSERT INTO `reparaciones` VALUES (1,'{\"nombre\": \"Servicio\", \"descripcion\": \"Servicio completo cambio de aceite y todo\"}',499.99),(2,'{\"nombre\": \"Cambio de llantas\", \"descripcion\": \"Cambio de las 4 llantas\"}',2999.99);
/*!40000 ALTER TABLE `reparaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reparaciones_has_refacciones`
--

LOCK TABLES `reparaciones_has_refacciones` WRITE;
/*!40000 ALTER TABLE `reparaciones_has_refacciones` DISABLE KEYS */;
INSERT INTO `reparaciones_has_refacciones` VALUES (1,1,'1'),(2,2,'4');
/*!40000 ALTER TABLE `reparaciones_has_refacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Cliente'),(3,'Mecánico'),(4,'Aseador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'En espera de llegada'),(2,'Recepción'),(3,'En espera de refacciones'),(4,'Reparación'),(5,'Lavando'),(6,'Terminado');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Daniel','Molina','','molina@gmail.com','$2y$10$NmTpNkKrMIqZl8vLj3gAs.uZVmwSErPnKm/qiJImlw53DKUGgcglS',1,1),(2,'Omar','Salazar','','omar@gmail.com','$2y$10$i7KeuvuUoP5TXXdXHl5o4O1ypIcCDEgAjZAcrjlaDCHh1ptrJXt1m',2,2),(3,'Mario','Gonzalez','','mario@gmail.com','$2y$10$iRb37Yprk.dnhy7x8b2rd.7ohrEF/WO2hPK678gsbFghLbX2bsAie',3,3),(4,'Victor','Vallin','','victor@gmail.com','$2y$10$2wuc3ONqCa1N1MZhRqHs8u4zvbP3dq1kpVaXaSXeeJRYDIuNzH0P.',4,4);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuario_has_automovil`
--

LOCK TABLES `usuario_has_automovil` WRITE;
/*!40000 ALTER TABLE `usuario_has_automovil` DISABLE KEYS */;
INSERT INTO `usuario_has_automovil` VALUES (2,1,'23423'),(2,4,'45234');
/*!40000 ALTER TABLE `usuario_has_automovil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'vw'
--

--
-- Dumping routines for database 'vw'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-04 17:32:26
