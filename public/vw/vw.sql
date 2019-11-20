-- MySQL dump 10.17  Distrib 10.3.15-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mydb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mydb`;

--
-- Table structure for table `automovil`
--

DROP TABLE IF EXISTS `automovil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `automovil` (
  `idAutomovil` int(11) NOT NULL AUTO_INCREMENT,
  `num_serie` varchar(45) NOT NULL,
  `version` varchar(45) NOT NULL,
  `modelo` varchar(45) NOT NULL,
  `Usuario_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idAutomovil`,`Usuario_idUsuario`),
  KEY `fk_Automovil_Cliente_idx` (`Usuario_idUsuario`),
  CONSTRAINT `fk_Automovil_Cliente` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automovil`
--

LOCK TABLES `automovil` WRITE;
/*!40000 ALTER TABLE `automovil` DISABLE KEYS */;
/*!40000 ALTER TABLE `automovil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citas` (
  `idCitas` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `confirmacion` varchar(1) NOT NULL,
  `Usuario_idUsuario` int(11) NOT NULL,
  `Automovil_idAutomovil` int(11) NOT NULL,
  PRIMARY KEY (`idCitas`,`Usuario_idUsuario`,`Automovil_idAutomovil`),
  KEY `fk_Citas_Cliente1_idx` (`Usuario_idUsuario`),
  KEY `fk_Citas_Automovil1_idx` (`Automovil_idAutomovil`),
  CONSTRAINT `fk_Citas_Automovil1` FOREIGN KEY (`Automovil_idAutomovil`) REFERENCES `automovil` (`idAutomovil`),
  CONSTRAINT `fk_Citas_Cliente1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas_has_states`
--

DROP TABLE IF EXISTS `citas_has_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citas_has_states` (
  `Citas_idCitas` int(11) NOT NULL,
  `states_idstates` int(11) NOT NULL,
  PRIMARY KEY (`Citas_idCitas`,`states_idstates`),
  KEY `fk_Citas_has_states_states1_idx` (`states_idstates`),
  KEY `fk_Citas_has_states_Citas1_idx` (`Citas_idCitas`),
  CONSTRAINT `fk_Citas_has_states_Citas1` FOREIGN KEY (`Citas_idCitas`) REFERENCES `citas` (`idCitas`),
  CONSTRAINT `fk_Citas_has_states_states1` FOREIGN KEY (`states_idstates`) REFERENCES `states` (`idstates`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas_has_states`
--

LOCK TABLES `citas_has_states` WRITE;
/*!40000 ALTER TABLE `citas_has_states` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas_has_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documento_diagnostico`
--

DROP TABLE IF EXISTS `documento_diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documento_diagnostico` (
  `idDocumento_Diagnostico` int(11) NOT NULL AUTO_INCREMENT,
  `observaciones` json DEFAULT NULL,
  `sugerencias` json DEFAULT NULL,
  `Hoja_Recepcion_idHoja_Recepcion` int(11) NOT NULL,
  PRIMARY KEY (`idDocumento_Diagnostico`,`Hoja_Recepcion_idHoja_Recepcion`),
  KEY `fk_Documento_Diagnostico_Hoja_Recepcion1_idx` (`Hoja_Recepcion_idHoja_Recepcion`),
  CONSTRAINT `fk_Documento_Diagnostico_Hoja_Recepcion1` FOREIGN KEY (`Hoja_Recepcion_idHoja_Recepcion`) REFERENCES `hoja_recepcion` (`idHoja_Recepcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento_diagnostico`
--

LOCK TABLES `documento_diagnostico` WRITE;
/*!40000 ALTER TABLE `documento_diagnostico` DISABLE KEYS */;
/*!40000 ALTER TABLE `documento_diagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoja_recepcion`
--

DROP TABLE IF EXISTS `hoja_recepcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hoja_recepcion` (
  `idHoja_Recepcion` int(11) NOT NULL AUTO_INCREMENT,
  `video` tinytext,
  `aviso_privacidad` tinytext NOT NULL,
  `observaciones` json DEFAULT NULL,
  `Reparaciones_idReparaciones` int(11) NOT NULL,
  `Usuario_idUsuario` int(11) NOT NULL,
  `Automovil_idAutomovil` int(11) NOT NULL,
  `Citas_idCitas` int(11) NOT NULL,
  PRIMARY KEY (`idHoja_Recepcion`,`Reparaciones_idReparaciones`,`Usuario_idUsuario`,`Automovil_idAutomovil`,`Citas_idCitas`),
  KEY `fk_Hoja_Recepcion_Reparaciones1_idx` (`Reparaciones_idReparaciones`),
  KEY `fk_Hoja_Recepcion_Automovil1_idx` (`Automovil_idAutomovil`),
  KEY `fk_Hoja_Recepcion_Citas1_idx` (`Citas_idCitas`),
  CONSTRAINT `fk_Hoja_Recepcion_Automovil1` FOREIGN KEY (`Automovil_idAutomovil`) REFERENCES `automovil` (`idAutomovil`),
  CONSTRAINT `fk_Hoja_Recepcion_Citas1` FOREIGN KEY (`Citas_idCitas`) REFERENCES `citas` (`idCitas`),
  CONSTRAINT `fk_Hoja_Recepcion_Reparaciones1` FOREIGN KEY (`Reparaciones_idReparaciones`) REFERENCES `reparaciones` (`idReparaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoja_recepcion`
--

LOCK TABLES `hoja_recepcion` WRITE;
/*!40000 ALTER TABLE `hoja_recepcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoja_recepcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoja_recepcion_has_states`
--

DROP TABLE IF EXISTS `hoja_recepcion_has_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hoja_recepcion_has_states` (
  `Hoja_Recepcion_idHoja_Recepcion` int(11) NOT NULL,
  `states_idstates` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`Hoja_Recepcion_idHoja_Recepcion`,`states_idstates`,`idUsuario`),
  KEY `fk_Hoja_Recepcion_has_states_states1_idx` (`states_idstates`),
  KEY `fk_Hoja_Recepcion_has_states_Hoja_Recepcion1_idx` (`Hoja_Recepcion_idHoja_Recepcion`),
  CONSTRAINT `fk_Hoja_Recepcion_has_states_Hoja_Recepcion1` FOREIGN KEY (`Hoja_Recepcion_idHoja_Recepcion`) REFERENCES `hoja_recepcion` (`idHoja_Recepcion`),
  CONSTRAINT `fk_Hoja_Recepcion_has_states_states1` FOREIGN KEY (`states_idstates`) REFERENCES `states` (`idstates`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoja_recepcion_has_states`
--

LOCK TABLES `hoja_recepcion_has_states` WRITE;
/*!40000 ALTER TABLE `hoja_recepcion_has_states` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoja_recepcion_has_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refacciones_accesorios`
--

DROP TABLE IF EXISTS `refacciones_accesorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refacciones_accesorios` (
  `idRefacciones_accesorios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` double NOT NULL,
  `cantidad` int(11) NOT NULL,
  `disponible` varchar(1) NOT NULL,
  PRIMARY KEY (`idRefacciones_accesorios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refacciones_accesorios`
--

LOCK TABLES `refacciones_accesorios` WRITE;
/*!40000 ALTER TABLE `refacciones_accesorios` DISABLE KEYS */;
/*!40000 ALTER TABLE `refacciones_accesorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparaciones`
--

DROP TABLE IF EXISTS `reparaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reparaciones` (
  `idReparaciones` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio_aprox` double DEFAULT NULL,
  `recomendaciones` json DEFAULT NULL,
  PRIMARY KEY (`idReparaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparaciones`
--

LOCK TABLES `reparaciones` WRITE;
/*!40000 ALTER TABLE `reparaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `reparaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparaciones_has_refacciones_accesorios`
--

DROP TABLE IF EXISTS `reparaciones_has_refacciones_accesorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reparaciones_has_refacciones_accesorios` (
  `Reparaciones_idReparaciones` int(11) NOT NULL,
  `Refacciones_accesorios_idRefacciones_accesorios` int(11) NOT NULL,
  PRIMARY KEY (`Reparaciones_idReparaciones`,`Refacciones_accesorios_idRefacciones_accesorios`),
  KEY `fk_Reparaciones_has_Refacciones_accesorios_Refacciones_acce_idx` (`Refacciones_accesorios_idRefacciones_accesorios`),
  KEY `fk_Reparaciones_has_Refacciones_accesorios_Reparaciones1_idx` (`Reparaciones_idReparaciones`),
  CONSTRAINT `fk_Reparaciones_has_Refacciones_accesorios_Refacciones_acceso1` FOREIGN KEY (`Refacciones_accesorios_idRefacciones_accesorios`) REFERENCES `refacciones_accesorios` (`idRefacciones_accesorios`),
  CONSTRAINT `fk_Reparaciones_has_Refacciones_accesorios_Reparaciones1` FOREIGN KEY (`Reparaciones_idReparaciones`) REFERENCES `reparaciones` (`idReparaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparaciones_has_refacciones_accesorios`
--

LOCK TABLES `reparaciones_has_refacciones_accesorios` WRITE;
/*!40000 ALTER TABLE `reparaciones_has_refacciones_accesorios` DISABLE KEYS */;
/*!40000 ALTER TABLE `reparaciones_has_refacciones_accesorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `idstates` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idstates`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apPat` varchar(45) NOT NULL,
  `apMat` varchar(45) NOT NULL,
  `calle` varchar(45) DEFAULT NULL,
  `colonia` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `activo` varchar(1) NOT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `rol` varchar(45) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-18 17:30:40
