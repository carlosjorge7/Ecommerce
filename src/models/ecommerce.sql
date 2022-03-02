CREATE DATABASE `ecommerce`;

USE `ecommerce`;

-- Tabla para la administracion del resto de tablas
create table `usuarios`(
    `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(25),
    `contrasena` varchar(100),
    primary key(`idUsuario`)
)

create table `categorias`(
    `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100),
    `descripcion` varchar(200),
    primary key(`idCategoria`)
)

create table `productos`(
    `idProducto` int(11) not null AUTO_INCREMENT,
    `sku` varchar(200),
    `nombre` varchar(100),
    `descripcion` varchar(100),
    `precio` decimal(4, 2),
    `stock` int(11),
    `imagen` text,
    `createdAt` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    `idCategoria` int(11),
    primary key(`idProducto`),
    KEY `fk_categoria_idx` (`idCategoria`),
    CONSTRAINT `fk_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON UPDATE CASCADE
)

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100),
  `apellidos` varchar(100),
  `direccion` varchar(200),
  `telefono` varchar(20),
  `ciudad` varchar(100),
  `codigoPostal` varchar(20),
  `email` varchar(50),
  `contrasena` varchar(60),
  PRIMARY KEY (`idCliente`)
) 

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `fechaPedido` date,
  `idCliente` int(11),
  PRIMARY KEY (`idPedido`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`)
)

CREATE TABLE `lineasDePedido` (
  `idLineaDePedido` int(11) NOT NULL AUTO_INCREMENT,
  `idPedido` int(11),
  `idProducto` int(11),
  `cantidad` int(11),
  `precioUnitario` decimal(10,3),
  PRIMARY KEY (`idLineaDePedido`),
  KEY `idPedido` (`idPedido`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `lineasDePedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`),
  CONSTRAINT `lineasDePedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
)