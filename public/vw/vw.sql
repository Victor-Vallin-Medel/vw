-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2019 a las 01:58:03
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `automovil`
--

CREATE TABLE `automovil` (
  `idautomovil` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `num_serie` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `usuario_idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `automovil`
--

INSERT INTO `automovil` (`idautomovil`, `nombre`, `num_serie`, `version`, `modelo`, `usuario_idusuario`) VALUES
(1, 'Jetta', '12345FHJK5678LK', 'Live', '2017', 2),
(2, 'Passat', '6789034SFGHJK45', 'R-Line', '2019', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `idcitas` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `confirmacion` varchar(1) DEFAULT NULL,
  `usuario_idusuario` int(11) NOT NULL,
  `automovil_idautomovil` int(11) NOT NULL,
  `automovil_usuario_idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`idcitas`, `fecha`, `confirmacion`, `usuario_idusuario`, `automovil_idautomovil`, `automovil_usuario_idusuario`) VALUES
(1, '2019-11-23 03:11:00', '0', 1, 2, 1),
(2, '2019-11-29 04:12:00', '0', 2, 1, 2),
(3, '2019-11-28 13:30:00', '1', 3, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas_has_states`
--

CREATE TABLE `citas_has_states` (
  `citas_idcitas` int(11) NOT NULL,
  `states_idstates` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `citas_has_states`
--

INSERT INTO `citas_has_states` (`citas_idcitas`, `states_idstates`) VALUES
(1, 5),
(2, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_diagnostico`
--

CREATE TABLE `documento_diagnostico` (
  `idDocumento_diagnostico` int(11) NOT NULL,
  `observaciones` varchar(450) DEFAULT NULL,
  `sugerencias` varchar(450) DEFAULT NULL,
  `hojaRecepcion_idhojaRecepcion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `documento_diagnostico`
--

INSERT INTO `documento_diagnostico` (`idDocumento_diagnostico`, `observaciones`, `sugerencias`, `hojaRecepcion_idhojaRecepcion`) VALUES
(1, 'Las balatas se estan cristalizando ', 'La cristalizacion se puede solucionar con un procedimiento de lima muy sencillo o cambiandolo por completo', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hojarecepcion`
--

CREATE TABLE `hojarecepcion` (
  `idhojaRecepcion` int(11) NOT NULL,
  `video` tinytext,
  `aviso_privacidad` tinytext,
  `observaciones` varchar(450) DEFAULT NULL,
  `usuario_idusuario` int(11) NOT NULL,
  `automovil_idautomovil` int(11) NOT NULL,
  `citas_idcitas` int(11) NOT NULL,
  `reparaciones_idreparaciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hojarecepcion`
--

INSERT INTO `hojarecepcion` (`idhojaRecepcion`, `video`, `aviso_privacidad`, `observaciones`, `usuario_idusuario`, `automovil_idautomovil`, `citas_idcitas`, `reparaciones_idreparaciones`) VALUES
(1, NULL, NULL, 'Revisar si las balatas estan en buenas condiciones, de igual manera la calidad de las llantas dar una valoracion', 1, 2, 1, 1),
(2, NULL, NULL, 'Revisar el nivel de aceita de trasmision y direccion', 2, 1, 2, 2),
(3, NULL, NULL, 'Sin observaciones', 3, 1, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hojarecepcion_has_states`
--

CREATE TABLE `hojarecepcion_has_states` (
  `hojaRecepcion_idhojaRecepcion` int(11) NOT NULL,
  `states_idstates` int(11) NOT NULL,
  `idCitas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hojarecepcion_has_states`
--

INSERT INTO `hojarecepcion_has_states` (`hojaRecepcion_idhojaRecepcion`, `states_idstates`, `idCitas`) VALUES
(3, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refacciones_accesorios`
--

CREATE TABLE `refacciones_accesorios` (
  `idrefacciones_accesorios` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `existencia` int(11) DEFAULT NULL,
  `disponible` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `refacciones_accesorios`
--

INSERT INTO `refacciones_accesorios` (`idrefacciones_accesorios`, `nombre`, `precio`, `existencia`, `disponible`) VALUES
(1, 'Kit Servicio mayor', 800, 50, '1'),
(2, 'Kit servicio basico', 200, 40, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparaciones`
--

CREATE TABLE `reparaciones` (
  `idreparaciones` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `precio_aprox` double DEFAULT NULL,
  `recomendaciones` varchar(450) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reparaciones`
--

INSERT INTO `reparaciones` (`idreparaciones`, `nombre`, `precio_aprox`, `recomendaciones`) VALUES
(1, 'Servicio basico', 1500.25, 'Se recomienda hacer este servicio cada 5 mil kilometros dado el aceite utilizado'),
(2, 'Servicio mayor', 3000.5, 'Se recomienda hacer este servicio cada 15 mil kilometros dado el aceite utilizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparaciones_has_refacciones_accesorios`
--

CREATE TABLE `reparaciones_has_refacciones_accesorios` (
  `reparaciones_idreparaciones` int(11) NOT NULL,
  `refacciones_accesorios_idrefacciones_accesorios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reparaciones_has_refacciones_accesorios`
--

INSERT INTO `reparaciones_has_refacciones_accesorios` (`reparaciones_idreparaciones`, `refacciones_accesorios_idrefacciones_accesorios`) VALUES
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `states`
--

CREATE TABLE `states` (
  `idstates` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `states`
--

INSERT INTO `states` (`idstates`, `nombre`) VALUES
(1, 'recepcion'),
(2, 'lavando'),
(3, 'reparacion'),
(4, 'espera asignacion mecanico'),
(5, 'espera confirmacion cita'),
(6, 'cita confirmada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apPat` varchar(45) DEFAULT NULL,
  `apMat` varchar(45) DEFAULT NULL,
  `calle` varchar(45) DEFAULT NULL,
  `colonia` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `activo` varchar(1) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `rol` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombre`, `apPat`, `apMat`, `calle`, `colonia`, `ciudad`, `activo`, `cp`, `rol`, `usuario`, `password`) VALUES
(1, 'Victor Hugo', 'Vallin', 'Medel', 'Zaragoza #75', 'Centro', 'Teocaltiche', '1', '47200', 'cliente', 'victor.vallin', '1234'),
(2, 'Omar ', 'Salazar', 'Salazar', 'Rio eufrates', 'Colinas del rio', 'Aguascalientes', '0', '309810', 'cliente', 'omar.salazar', '1234'),
(3, 'Mario', 'Gonzalez', 'Santoyo', 'Mision de San Juan', 'mision de Santa fe', 'Aguascalientes', '1', '20230', 'cliente', 'mario.gonzalez', '1234'),
(4, 'Carlos Daniel', 'Molina', 'Vargas', 'Vivero del retiro', 'Casa Blanca', 'Aguascalientes', '1', '309020', 'asesor', 'carlos.molina', '1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `automovil`
--
ALTER TABLE `automovil`
  ADD PRIMARY KEY (`idautomovil`,`usuario_idusuario`),
  ADD KEY `fk_automovil_usuario_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`idcitas`,`usuario_idusuario`,`automovil_idautomovil`,`automovil_usuario_idusuario`),
  ADD KEY `fk_citas_usuario1_idx` (`usuario_idusuario`),
  ADD KEY `fk_citas_automovil1_idx` (`automovil_idautomovil`,`automovil_usuario_idusuario`);

--
-- Indices de la tabla `citas_has_states`
--
ALTER TABLE `citas_has_states`
  ADD PRIMARY KEY (`citas_idcitas`,`states_idstates`),
  ADD KEY `fk_citas_has_states_states1_idx` (`states_idstates`),
  ADD KEY `fk_citas_has_states_citas1_idx` (`citas_idcitas`);

--
-- Indices de la tabla `documento_diagnostico`
--
ALTER TABLE `documento_diagnostico`
  ADD PRIMARY KEY (`idDocumento_diagnostico`,`hojaRecepcion_idhojaRecepcion`),
  ADD KEY `fk_documento_diagnostico_hojaRecepcion1_idx` (`hojaRecepcion_idhojaRecepcion`);

--
-- Indices de la tabla `hojarecepcion`
--
ALTER TABLE `hojarecepcion`
  ADD PRIMARY KEY (`idhojaRecepcion`,`usuario_idusuario`,`automovil_idautomovil`,`citas_idcitas`,`reparaciones_idreparaciones`),
  ADD KEY `fk_hojaRecepcion_usuario1_idx` (`usuario_idusuario`),
  ADD KEY `fk_hojaRecepcion_automovil1_idx` (`automovil_idautomovil`),
  ADD KEY `fk_hojaRecepcion_citas1_idx` (`citas_idcitas`),
  ADD KEY `fk_hojaRecepcion_reparaciones1_idx` (`reparaciones_idreparaciones`);

--
-- Indices de la tabla `hojarecepcion_has_states`
--
ALTER TABLE `hojarecepcion_has_states`
  ADD PRIMARY KEY (`hojaRecepcion_idhojaRecepcion`,`states_idstates`),
  ADD KEY `fk_hojaRecepcion_has_states_states1_idx` (`states_idstates`),
  ADD KEY `fk_hojaRecepcion_has_states_hojaRecepcion1_idx` (`hojaRecepcion_idhojaRecepcion`);

--
-- Indices de la tabla `refacciones_accesorios`
--
ALTER TABLE `refacciones_accesorios`
  ADD PRIMARY KEY (`idrefacciones_accesorios`);

--
-- Indices de la tabla `reparaciones`
--
ALTER TABLE `reparaciones`
  ADD PRIMARY KEY (`idreparaciones`);

--
-- Indices de la tabla `reparaciones_has_refacciones_accesorios`
--
ALTER TABLE `reparaciones_has_refacciones_accesorios`
  ADD PRIMARY KEY (`reparaciones_idreparaciones`,`refacciones_accesorios_idrefacciones_accesorios`),
  ADD KEY `fk_reparaciones_has_refacciones_accesorios_refacciones_acce_idx` (`refacciones_accesorios_idrefacciones_accesorios`),
  ADD KEY `fk_reparaciones_has_refacciones_accesorios_reparaciones1_idx` (`reparaciones_idreparaciones`);

--
-- Indices de la tabla `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`idstates`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `automovil`
--
ALTER TABLE `automovil`
  MODIFY `idautomovil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `idcitas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `documento_diagnostico`
--
ALTER TABLE `documento_diagnostico`
  MODIFY `idDocumento_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hojarecepcion`
--
ALTER TABLE `hojarecepcion`
  MODIFY `idhojaRecepcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `refacciones_accesorios`
--
ALTER TABLE `refacciones_accesorios`
  MODIFY `idrefacciones_accesorios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reparaciones`
--
ALTER TABLE `reparaciones`
  MODIFY `idreparaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `states`
--
ALTER TABLE `states`
  MODIFY `idstates` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `automovil`
--
ALTER TABLE `automovil`
  ADD CONSTRAINT `fk_automovil_usuario` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_citas_automovil1` FOREIGN KEY (`automovil_idautomovil`,`automovil_usuario_idusuario`) REFERENCES `automovil` (`idautomovil`, `usuario_idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citas_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `citas_has_states`
--
ALTER TABLE `citas_has_states`
  ADD CONSTRAINT `fk_citas_has_states_citas1` FOREIGN KEY (`citas_idcitas`) REFERENCES `citas` (`idcitas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citas_has_states_states1` FOREIGN KEY (`states_idstates`) REFERENCES `states` (`idstates`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documento_diagnostico`
--
ALTER TABLE `documento_diagnostico`
  ADD CONSTRAINT `fk_documento_diagnostico_hojaRecepcion1` FOREIGN KEY (`hojaRecepcion_idhojaRecepcion`) REFERENCES `hojarecepcion` (`idhojaRecepcion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `hojarecepcion`
--
ALTER TABLE `hojarecepcion`
  ADD CONSTRAINT `fk_hojaRecepcion_automovil1` FOREIGN KEY (`automovil_idautomovil`) REFERENCES `automovil` (`idautomovil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hojaRecepcion_citas1` FOREIGN KEY (`citas_idcitas`) REFERENCES `citas` (`idcitas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hojaRecepcion_reparaciones1` FOREIGN KEY (`reparaciones_idreparaciones`) REFERENCES `reparaciones` (`idreparaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hojaRecepcion_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `hojarecepcion_has_states`
--
ALTER TABLE `hojarecepcion_has_states`
  ADD CONSTRAINT `fk_hojaRecepcion_has_states_hojaRecepcion1` FOREIGN KEY (`hojaRecepcion_idhojaRecepcion`) REFERENCES `hojarecepcion` (`idhojaRecepcion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_hojaRecepcion_has_states_states1` FOREIGN KEY (`states_idstates`) REFERENCES `states` (`idstates`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reparaciones_has_refacciones_accesorios`
--
ALTER TABLE `reparaciones_has_refacciones_accesorios`
  ADD CONSTRAINT `fk_reparaciones_has_refacciones_accesorios_refacciones_acceso1` FOREIGN KEY (`refacciones_accesorios_idrefacciones_accesorios`) REFERENCES `refacciones_accesorios` (`idrefacciones_accesorios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reparaciones_has_refacciones_accesorios_reparaciones1` FOREIGN KEY (`reparaciones_idreparaciones`) REFERENCES `reparaciones` (`idreparaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
