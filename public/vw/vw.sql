-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 30, 2019 at 12:53 PM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vw`
--
CREATE DATABASE IF NOT EXISTS `vw` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `vw`;

-- --------------------------------------------------------

--
-- Table structure for table `automovil`
--

CREATE TABLE IF NOT EXISTS `automovil` (
  `idautomovil` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `modelo` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idautomovil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `automovil`:
--

--
-- Dumping data for table `automovil`
--

INSERT INTO `automovil` (`idautomovil`, `nombre`, `version`, `modelo`) VALUES
(1, 'Vento', 'Startline', '2019'),
(2, 'Vento', 'Comfortline', '2019'),
(3, 'Polo', 'Startline', '2019'),
(4, 'Polo', 'Design & Sound', '2019');

-- --------------------------------------------------------

--
-- Table structure for table `citas`
--

CREATE TABLE IF NOT EXISTS `citas` (
  `idcitas` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `confirmacion` varchar(1) DEFAULT NULL,
  `automovil_idautomovil` int(11) NOT NULL,
  `usuario_idusuario` int(11) NOT NULL,
  PRIMARY KEY (`idcitas`,`automovil_idautomovil`,`usuario_idusuario`),
  KEY `fk_citas_automovil1_idx` (`automovil_idautomovil`),
  KEY `fk_citas_usuario1_idx` (`usuario_idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `citas`:
--   `automovil_idautomovil`
--       `automovil` -> `idautomovil`
--   `usuario_idusuario`
--       `usuario` -> `idusuario`
--

-- --------------------------------------------------------

--
-- Table structure for table `ciudades`
--

CREATE TABLE IF NOT EXISTS `ciudades` (
  `idciudades` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idciudades`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `ciudades`:
--

--
-- Dumping data for table `ciudades`
--

INSERT INTO `ciudades` (`idciudades`, `nombre`) VALUES
(1, 'Aguascalientes');

-- --------------------------------------------------------

--
-- Table structure for table `direcciones`
--

CREATE TABLE IF NOT EXISTS `direcciones` (
  `iddirecciones` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(45) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `colonia` varchar(45) DEFAULT NULL,
  `ciudades_idciudades` int(11) NOT NULL,
  PRIMARY KEY (`iddirecciones`,`ciudades_idciudades`),
  KEY `fk_direcciones_ciudades_idx` (`ciudades_idciudades`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `direcciones`:
--   `ciudades_idciudades`
--       `ciudades` -> `idciudades`
--

--
-- Dumping data for table `direcciones`
--

INSERT INTO `direcciones` (`iddirecciones`, `calle`, `cp`, `colonia`, `ciudades_idciudades`) VALUES
(1, 'Granjenito 114', '20240', 'Barrio Del Encino', 1);

-- --------------------------------------------------------

--
-- Table structure for table `hojaRecepcion`
--

CREATE TABLE IF NOT EXISTS `hojaRecepcion` (
  `idhojaRecepcion` int(11) NOT NULL AUTO_INCREMENT,
  `observaciones` json DEFAULT NULL,
  `fotosAuto` json DEFAULT NULL,
  `citas_idcitas` int(11) NOT NULL,
  PRIMARY KEY (`idhojaRecepcion`,`citas_idcitas`),
  KEY `fk_hojaRecepcion_citas1_idx` (`citas_idcitas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `hojaRecepcion`:
--   `citas_idcitas`
--       `citas` -> `idcitas`
--

-- --------------------------------------------------------

--
-- Table structure for table `hojaRecepcion_has_reparaciones`
--

CREATE TABLE IF NOT EXISTS `hojaRecepcion_has_reparaciones` (
  `hojaRecepcion_idhojaRecepcion` int(11) NOT NULL,
  `reparaciones_idreparaciones` int(11) NOT NULL,
  PRIMARY KEY (`hojaRecepcion_idhojaRecepcion`,`reparaciones_idreparaciones`),
  KEY `fk_hojaRecepcion_has_reparaciones_reparaciones1_idx` (`reparaciones_idreparaciones`),
  KEY `fk_hojaRecepcion_has_reparaciones_hojaRecepcion1_idx` (`hojaRecepcion_idhojaRecepcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `hojaRecepcion_has_reparaciones`:
--   `hojaRecepcion_idhojaRecepcion`
--       `hojaRecepcion` -> `idhojaRecepcion`
--   `reparaciones_idreparaciones`
--       `reparaciones` -> `idreparaciones`
--

-- --------------------------------------------------------

--
-- Table structure for table `hojaRecepcion_has_states`
--

CREATE TABLE IF NOT EXISTS `hojaRecepcion_has_states` (
  `hojaRecepcion_idhojaRecepcion` int(11) NOT NULL,
  `states_idstates` int(11) NOT NULL,
  PRIMARY KEY (`hojaRecepcion_idhojaRecepcion`,`states_idstates`),
  KEY `fk_hojaRecepcion_has_states_states1_idx` (`states_idstates`),
  KEY `fk_hojaRecepcion_has_states_hojaRecepcion1_idx` (`hojaRecepcion_idhojaRecepcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `hojaRecepcion_has_states`:
--   `hojaRecepcion_idhojaRecepcion`
--       `hojaRecepcion` -> `idhojaRecepcion`
--   `states_idstates`
--       `states` -> `idstates`
--

-- --------------------------------------------------------

--
-- Table structure for table `refacciones`
--

CREATE TABLE IF NOT EXISTS `refacciones` (
  `idrefacciones` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `existencia` int(11) DEFAULT NULL,
  PRIMARY KEY (`idrefacciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `refacciones`:
--

-- --------------------------------------------------------

--
-- Table structure for table `reparaciones`
--

CREATE TABLE IF NOT EXISTS `reparaciones` (
  `idreparaciones` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` json DEFAULT NULL,
  `precio` double DEFAULT NULL,
  PRIMARY KEY (`idreparaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `reparaciones`:
--

-- --------------------------------------------------------

--
-- Table structure for table `reparaciones_has_refacciones`
--

CREATE TABLE IF NOT EXISTS `reparaciones_has_refacciones` (
  `reparaciones_idreparaciones` int(11) NOT NULL,
  `refacciones_idrefacciones` int(11) NOT NULL,
  PRIMARY KEY (`reparaciones_idreparaciones`,`refacciones_idrefacciones`),
  KEY `fk_reparaciones_has_refacciones_refacciones1_idx` (`refacciones_idrefacciones`),
  KEY `fk_reparaciones_has_refacciones_reparaciones1_idx` (`reparaciones_idreparaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `reparaciones_has_refacciones`:
--   `refacciones_idrefacciones`
--       `refacciones` -> `idrefacciones`
--   `reparaciones_idreparaciones`
--       `reparaciones` -> `idreparaciones`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `idroles` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idroles`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `roles`:
--

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idroles`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Cliente');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE IF NOT EXISTS `states` (
  `idstates` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idstates`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `states`:
--

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apPat` varchar(45) DEFAULT NULL,
  `apMat` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `direcciones_iddirecciones` int(11) NOT NULL,
  `roles_idroles` int(11) NOT NULL,
  PRIMARY KEY (`idusuario`,`direcciones_iddirecciones`,`roles_idroles`),
  KEY `fk_usuario_direcciones1_idx` (`direcciones_iddirecciones`),
  KEY `fk_usuario_roles1_idx` (`roles_idroles`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `usuario`:
--   `direcciones_iddirecciones`
--       `direcciones` -> `iddirecciones`
--   `roles_idroles`
--       `roles` -> `idroles`
--

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombre`, `apPat`, `apMat`, `usuario`, `password`, `direcciones_iddirecciones`, `roles_idroles`) VALUES
(3, 'Omar', 'Salazar', 'Salazar', 'omarsalazar', 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79', 1, 1),
(4, 'Carlos Daniel', 'Molina', 'Vargas', 'danielmv', 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79', 1, 1),
(5, 'Mario', 'Gonzalez', 'Santoyo', 'mario', 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79', 1, 2),
(6, 'Victor', 'Vallin', 'Medel', 'victorelguapo', 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79', 1, 2),
(7, 'aaaa', 'Vallin', 'Medel', 'victorelguapo', 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `usuario_has_automovil`
--

CREATE TABLE IF NOT EXISTS `usuario_has_automovil` (
  `usuario_idusuario` int(11) NOT NULL,
  `automovil_idautomovil` int(11) NOT NULL,
  `numserie` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`usuario_idusuario`,`automovil_idautomovil`),
  KEY `fk_usuario_has_automovil_automovil1_idx` (`automovil_idautomovil`),
  KEY `fk_usuario_has_automovil_usuario1_idx` (`usuario_idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONS FOR TABLE `usuario_has_automovil`:
--   `automovil_idautomovil`
--       `automovil` -> `idautomovil`
--   `usuario_idusuario`
--       `usuario` -> `idusuario`
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_citas_automovil1` FOREIGN KEY (`automovil_idautomovil`) REFERENCES `automovil` (`idautomovil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citas_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `fk_direcciones_ciudades` FOREIGN KEY (`ciudades_idciudades`) REFERENCES `ciudades` (`idciudades`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `hojaRecepcion`
--
ALTER TABLE `hojaRecepcion`
  ADD CONSTRAINT `fk_hojaRecepcion_citas1` FOREIGN KEY (`citas_idcitas`) REFERENCES `citas` (`idcitas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `hojaRecepcion_has_reparaciones`
--
ALTER TABLE `hojaRecepcion_has_reparaciones`
  ADD CONSTRAINT `fk_hojaRecepcion_has_reparaciones_hojaRecepcion1` FOREIGN KEY (`hojaRecepcion_idhojaRecepcion`) REFERENCES `hojaRecepcion` (`idhojaRecepcion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hojaRecepcion_has_reparaciones_reparaciones1` FOREIGN KEY (`reparaciones_idreparaciones`) REFERENCES `reparaciones` (`idreparaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `hojaRecepcion_has_states`
--
ALTER TABLE `hojaRecepcion_has_states`
  ADD CONSTRAINT `fk_hojaRecepcion_has_states_hojaRecepcion1` FOREIGN KEY (`hojaRecepcion_idhojaRecepcion`) REFERENCES `hojaRecepcion` (`idhojaRecepcion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hojaRecepcion_has_states_states1` FOREIGN KEY (`states_idstates`) REFERENCES `states` (`idstates`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reparaciones_has_refacciones`
--
ALTER TABLE `reparaciones_has_refacciones`
  ADD CONSTRAINT `fk_reparaciones_has_refacciones_refacciones1` FOREIGN KEY (`refacciones_idrefacciones`) REFERENCES `refacciones` (`idrefacciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reparaciones_has_refacciones_reparaciones1` FOREIGN KEY (`reparaciones_idreparaciones`) REFERENCES `reparaciones` (`idreparaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_direcciones1` FOREIGN KEY (`direcciones_iddirecciones`) REFERENCES `direcciones` (`iddirecciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_roles1` FOREIGN KEY (`roles_idroles`) REFERENCES `roles` (`idroles`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usuario_has_automovil`
--
ALTER TABLE `usuario_has_automovil`
  ADD CONSTRAINT `fk_usuario_has_automovil_automovil1` FOREIGN KEY (`automovil_idautomovil`) REFERENCES `automovil` (`idautomovil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_has_automovil_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
