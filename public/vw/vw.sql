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
-- Table structure for table `automovil`
--

DROP TABLE IF EXISTS `automovil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automovil` (
  `idautomovil` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `modelo` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idautomovil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automovil`
--

LOCK TABLES `automovil` WRITE;
/*!40000 ALTER TABLE `automovil` DISABLE KEYS */;
INSERT INTO `automovil` VALUES (1,'Vento','Startline','2019'),(2,'Vento','Comfortline','2019'),(3,'Polo','Startline','2019'),(4,'Polo','Design & Sound','2019');
/*!40000 ALTER TABLE `automovil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citas` (
  `idcitas` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `confirmacion` varchar(1) DEFAULT NULL,
  `usuario_idusuario` int(11) NOT NULL,
  `numserie` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcitas`,`usuario_idusuario`),
  KEY `fk_citas_usuario1_idx` (`usuario_idusuario`),
  KEY `fk_citas_numserie1_idx` (`numserie`),
  CONSTRAINT `fk_citas_numserie1` FOREIGN KEY (`numserie`) REFERENCES `usuario_has_automovil` (`numserie`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_citas_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,'2019-12-12 00:00:00','1',6,NULL),(2,'2019-01-01 00:00:00','0',6,NULL),(3,'2019-10-12 00:00:00','0',6,NULL),(4,'2019-11-12 00:00:00','0',6,NULL),(5,'1998-02-01 00:00:00','1',6,NULL),(6,'1998-02-01 00:00:00','1',6,NULL),(7,'1998-02-01 00:00:00','1',6,NULL),(8,'2019-12-10 10:00:00','0',25,'123456789'),(9,'2019-12-01 10:00:00','0',25,'123456789'),(10,'2019-12-01 10:00:00','0',25,'123456789');
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
-- Temporary table structure for view `citas_completas`
--

DROP TABLE IF EXISTS `citas_completas`;
/*!50001 DROP VIEW IF EXISTS `citas_completas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `citas_completas` AS SELECT 
 1 AS `idusuario`,
 1 AS `usuario_nombre`,
 1 AS `usuario_apPat`,
 1 AS `usuario_apMat`,
 1 AS `idcitas`,
 1 AS `fecha`,
 1 AS `confirmacion`,
 1 AS `idhojaRecepcion`,
 1 AS `observaciones`,
 1 AS `states_idstates`,
 1 AS `numserie`,
 1 AS `idautomovil`,
 1 AS `automovil_nombre`,
 1 AS `automovil_version`,
 1 AS `automovil_modelo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciudades` (
  `idciudades` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idciudades`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Aguascalientes');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direcciones` (
  `iddirecciones` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(45) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `colonia` varchar(45) DEFAULT NULL,
  `ciudades_idciudades` int(11) NOT NULL,
  PRIMARY KEY (`iddirecciones`,`ciudades_idciudades`),
  KEY `fk_direcciones_ciudades_idx` (`ciudades_idciudades`),
  CONSTRAINT `fk_direcciones_ciudades` FOREIGN KEY (`ciudades_idciudades`) REFERENCES `ciudades` (`idciudades`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,'Granjenito 114','20240','Barrio Del Encino',1),(2,'Paseo del Olivar 123','34832','Negrolandia',1),(3,'Paseo del Olivar 123','34832','Negrolandia',1),(4,'Paseo del Olivar 123','34832','Negrolandia',1),(5,'Paseo del Olivar 123','34832','Negrolandia',1),(6,'Paseo del Olivar 123','34832','Negrolandia',1),(7,'Paseo del Olivar 123','34832','Negrolandia',1),(8,'Paseo del Olivar 123','34832','Negrolandia',1),(9,'Paseo del Olivar 123','34832','Negrolandia',1),(10,'Paseo del Olivar 123','34832','Negrolandia',1),(11,'Paseo del Olivar 123','34832','Negrolandia',1),(12,'Paseo del Olivar 123','34832','Negrolandia',1),(13,'calle nueva alv','34832','Negrolandia',1),(14,'Paseo del Olivar Poniente 207','20164','Nueva Alameda',1),(15,'Paseo del Olivar Poniente 207','20164','Nueva Alameda',1),(16,'Paseo del Olivar Poniente 207','20164','Nueva Alameda',1),(17,'Paseo del Olivar Poniente 207','20164','Nueva Alameda',1),(18,'Paseo del Olivar Poniente 207','20164','Nueva Alameda',1),(19,'Paseo del Olivar Poniente 207','20164','Nueva Alameda',1);
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hojaRecepcion`
--

DROP TABLE IF EXISTS `hojaRecepcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hojaRecepcion` (
  `idhojaRecepcion` int(11) NOT NULL AUTO_INCREMENT,
  `observaciones` json DEFAULT NULL,
  `citas_idcitas` int(11) NOT NULL,
  `states_idstates` int(11) DEFAULT NULL,
  PRIMARY KEY (`idhojaRecepcion`,`citas_idcitas`),
  KEY `fk_hojaRecepcion_1_idx` (`citas_idcitas`),
  KEY `fk_hojaRecepcion_2_idx` (`states_idstates`),
  CONSTRAINT `fk_hojaRecepcion_1` FOREIGN KEY (`citas_idcitas`) REFERENCES `citas` (`idcitas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hojaRecepcion_2` FOREIGN KEY (`states_idstates`) REFERENCES `states` (`idstates`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hojaRecepcion`
--

LOCK TABLES `hojaRecepcion` WRITE;
/*!40000 ALTER TABLE `hojaRecepcion` DISABLE KEYS */;
INSERT INTO `hojaRecepcion` VALUES (1,'{\"observaciones\": [\"holaaa\", \"observacion2\"]}',1,1),(2,'{\"observaciones\": [\"holaaa\", \"observacion2\"]}',1,2),(4,'{\"observaciones\": [\"holaaa\", \"observacion2\"]}',1,1),(8,NULL,10,1);
/*!40000 ALTER TABLE `hojaRecepcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hojaRecepcion_has_reparaciones`
--

DROP TABLE IF EXISTS `hojaRecepcion_has_reparaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hojaRecepcion_has_reparaciones` (
  `hojaRecepcion_idhojaRecepcion` int(11) NOT NULL,
  `reparaciones_idreparaciones` int(11) NOT NULL,
  PRIMARY KEY (`hojaRecepcion_idhojaRecepcion`,`reparaciones_idreparaciones`),
  KEY `fk_hojaRecepcion_has_reparaciones_reparaciones1_idx` (`reparaciones_idreparaciones`),
  KEY `fk_hojaRecepcion_has_reparaciones_hojaRecepcion1_idx` (`hojaRecepcion_idhojaRecepcion`),
  CONSTRAINT `fk_hojaRecepcion_has_reparaciones_hojaRecepcion1` FOREIGN KEY (`hojaRecepcion_idhojaRecepcion`) REFERENCES `hojaRecepcion` (`idhojaRecepcion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hojaRecepcion_has_reparaciones_reparaciones1` FOREIGN KEY (`reparaciones_idreparaciones`) REFERENCES `reparaciones` (`idreparaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hojaRecepcion_has_reparaciones`
--

LOCK TABLES `hojaRecepcion_has_reparaciones` WRITE;
/*!40000 ALTER TABLE `hojaRecepcion_has_reparaciones` DISABLE KEYS */;
INSERT INTO `hojaRecepcion_has_reparaciones` VALUES (1,1),(2,1),(1,2);
/*!40000 ALTER TABLE `hojaRecepcion_has_reparaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refacciones`
--

DROP TABLE IF EXISTS `refacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refacciones` (
  `idrefacciones` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `existencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`idrefacciones`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refacciones`
--

LOCK TABLES `refacciones` WRITE;
/*!40000 ALTER TABLE `refacciones` DISABLE KEYS */;
INSERT INTO `refacciones` VALUES (1,'Kit de servicio',300.5,2),(2,'Amortiguadores',1290,4);
/*!40000 ALTER TABLE `refacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparaciones`
--

DROP TABLE IF EXISTS `reparaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reparaciones` (
  `idreparaciones` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` json DEFAULT NULL,
  `precio` double DEFAULT NULL,
  PRIMARY KEY (`idreparaciones`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparaciones`
--

LOCK TABLES `reparaciones` WRITE;
/*!40000 ALTER TABLE `reparaciones` DISABLE KEYS */;
INSERT INTO `reparaciones` VALUES (1,'{\"nombre\": \"Servicio\", \"descripcion\": \"Cambio de aceite, etc\"}',1234.23),(2,'{\"nombre\": \"Ajuste de suspensión\", \"descripcion\": \"Cambio de amortiguadores alv, etc\"}',6543.33);
/*!40000 ALTER TABLE `reparaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparaciones_has_refacciones`
--

DROP TABLE IF EXISTS `reparaciones_has_refacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reparaciones_has_refacciones` (
  `reparaciones_idreparaciones` int(11) NOT NULL,
  `refacciones_idrefacciones` int(11) NOT NULL,
  PRIMARY KEY (`reparaciones_idreparaciones`,`refacciones_idrefacciones`),
  KEY `fk_reparaciones_has_refacciones_refacciones1_idx` (`refacciones_idrefacciones`),
  KEY `fk_reparaciones_has_refacciones_reparaciones1_idx` (`reparaciones_idreparaciones`),
  CONSTRAINT `fk_reparaciones_has_refacciones_refacciones1` FOREIGN KEY (`refacciones_idrefacciones`) REFERENCES `refacciones` (`idrefacciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reparaciones_has_refacciones_reparaciones1` FOREIGN KEY (`reparaciones_idreparaciones`) REFERENCES `reparaciones` (`idreparaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparaciones_has_refacciones`
--

LOCK TABLES `reparaciones_has_refacciones` WRITE;
/*!40000 ALTER TABLE `reparaciones_has_refacciones` DISABLE KEYS */;
INSERT INTO `reparaciones_has_refacciones` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `reparaciones_has_refacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `reparaciones_refacciones`
--

DROP TABLE IF EXISTS `reparaciones_refacciones`;
/*!50001 DROP VIEW IF EXISTS `reparaciones_refacciones`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `reparaciones_refacciones` AS SELECT 
 1 AS `reparaciones_idreparaciones`,
 1 AS `refacciones_idrefacciones`,
 1 AS `reparaciones_nombre`,
 1 AS `reparaciones_descripcion`,
 1 AS `reparaciones_precio`,
 1 AS `refacciones_nombre`,
 1 AS `refacciones_precio`,
 1 AS `refacciones_existencia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `reparaciones_view`
--

DROP TABLE IF EXISTS `reparaciones_view`;
/*!50001 DROP VIEW IF EXISTS `reparaciones_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `reparaciones_view` AS SELECT 
 1 AS `idreparaciones`,
 1 AS `nombre`,
 1 AS `descripcion`,
 1 AS `precio`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `idroles` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idroles`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Cliente'),(3,'Mecanico'),(4,'Aseador'),(5,'Mecanico'),(6,'Aseador'),(7,'Mecanico'),(8,'Aseador'),(9,'Mecanico'),(10,'Aseador'),(11,'Mecanico'),(12,'Aseador'),(13,'Mecanico'),(14,'Aseador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `idstates` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idstates`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Espera de llegada'),(2,'Recepción'),(5,'Reparación'),(7,'Lavando'),(8,'Terminado');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apPat` varchar(45) DEFAULT NULL,
  `apMat` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `direcciones_iddirecciones` int(11) NOT NULL,
  `roles_idroles` int(11) NOT NULL,
  PRIMARY KEY (`idusuario`,`direcciones_iddirecciones`,`roles_idroles`,`email`),
  UNIQUE KEY `usuario_UNIQUE` (`email`),
  KEY `fk_usuario_direcciones1_idx` (`direcciones_iddirecciones`),
  KEY `fk_usuario_roles1_idx` (`roles_idroles`),
  CONSTRAINT `fk_usuario_direcciones1` FOREIGN KEY (`direcciones_iddirecciones`) REFERENCES `direcciones` (`iddirecciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_roles1` FOREIGN KEY (`roles_idroles`) REFERENCES `roles` (`idroles`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,'AAAAasds','asdzxc','zxcxc','omarsalazar','b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79',1,1),(4,'Carlos Daniel','Molina','Vargas','danielmv','b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79',1,1),(5,'Mario','Gonzalez','Santoyo','mario','b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79',1,1),(6,'Victor','Vallin','Medel','victorelguapo','b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79',1,2),(17,'Omar','Prueba','2','omarcin','$2y$10$oS6oGT8m5/FHb0vaM3eiqev.9AcKGgKzVT0vSt4W4bK/CtSTc/KOu',1,2),(25,'Molinita','Prueba','2','ajaaa@asd.com','$2y$10$g.hElhRMfvY/T9FuDFR6eurp4LBfDrvayWp9g2tRGmGDdedDB3uCa',13,2),(27,'Daniel','Molina','','molina@gmail.com','$2y$10$NmTpNkKrMIqZl8vLj3gAs.uZVmwSErPnKm/qiJImlw53DKUGgcglS',14,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_has_automovil`
--

DROP TABLE IF EXISTS `usuario_has_automovil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_has_automovil` (
  `usuario_idusuario` int(11) NOT NULL,
  `automovil_idautomovil` int(11) NOT NULL,
  `numserie` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`usuario_idusuario`,`automovil_idautomovil`),
  UNIQUE KEY `numserie_UNIQUE` (`numserie`),
  KEY `fk_usuario_has_automovil_automovil1_idx` (`automovil_idautomovil`),
  KEY `fk_usuario_has_automovil_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_usuario_has_automovil_automovil1` FOREIGN KEY (`automovil_idautomovil`) REFERENCES `automovil` (`idautomovil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_automovil_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_has_automovil`
--

LOCK TABLES `usuario_has_automovil` WRITE;
/*!40000 ALTER TABLE `usuario_has_automovil` DISABLE KEYS */;
INSERT INTO `usuario_has_automovil` VALUES (25,4,'123456789'),(3,1,'234235'),(3,3,'23443');
/*!40000 ALTER TABLE `usuario_has_automovil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'vw'
--

--
-- Dumping routines for database 'vw'
--

--
-- Final view structure for view `citas_completas`
--

/*!50001 DROP VIEW IF EXISTS `citas_completas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `citas_completas` AS select `u`.`idusuario` AS `idusuario`,`u`.`nombre` AS `usuario_nombre`,`u`.`apPat` AS `usuario_apPat`,`u`.`apMat` AS `usuario_apMat`,`c`.`idcitas` AS `idcitas`,`c`.`fecha` AS `fecha`,`c`.`confirmacion` AS `confirmacion`,`h`.`idhojaRecepcion` AS `idhojaRecepcion`,`h`.`observaciones` AS `observaciones`,`h`.`states_idstates` AS `states_idstates`,`ua`.`numserie` AS `numserie`,`a`.`idautomovil` AS `idautomovil`,`a`.`nombre` AS `automovil_nombre`,`a`.`version` AS `automovil_version`,`a`.`modelo` AS `automovil_modelo` from ((((`usuario` `u` join `automovil` `a`) join `citas` `c`) join `hojaRecepcion` `h`) join `usuario_has_automovil` `ua`) where ((`c`.`idcitas` = `h`.`citas_idcitas`) and (`c`.`usuario_idusuario` = `u`.`idusuario`) and (`c`.`numserie` = `ua`.`numserie`) and (`ua`.`automovil_idautomovil` = `a`.`idautomovil`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `reparaciones_refacciones`
--

/*!50001 DROP VIEW IF EXISTS `reparaciones_refacciones`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `reparaciones_refacciones` AS select `rr`.`reparaciones_idreparaciones` AS `reparaciones_idreparaciones`,`rr`.`refacciones_idrefacciones` AS `refacciones_idrefacciones`,json_unquote(json_extract(`rp`.`descripcion`,'$.nombre')) AS `reparaciones_nombre`,json_unquote(json_extract(`rp`.`descripcion`,'$.descripcion')) AS `reparaciones_descripcion`,`rp`.`precio` AS `reparaciones_precio`,`r`.`nombre` AS `refacciones_nombre`,`r`.`precio` AS `refacciones_precio`,`r`.`existencia` AS `refacciones_existencia` from ((`reparaciones_has_refacciones` `rr` join `reparaciones` `rp`) join `refacciones` `r`) where ((`rr`.`refacciones_idrefacciones` = `r`.`idrefacciones`) and (`rr`.`reparaciones_idreparaciones` = `rp`.`idreparaciones`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `reparaciones_view`
--

/*!50001 DROP VIEW IF EXISTS `reparaciones_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `reparaciones_view` AS select `rp`.`idreparaciones` AS `idreparaciones`,json_unquote(json_extract(`rp`.`descripcion`,'$.nombre')) AS `nombre`,json_unquote(json_extract(`rp`.`descripcion`,'$.descripcion')) AS `descripcion`,`rp`.`precio` AS `precio` from `reparaciones` `rp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-02 21:18:11
