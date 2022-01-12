-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `dni_nie` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `active` TINYINT NULL,
  `deleted` TINYINT NULL,
  `registrationCode` VARCHAR(45) NULL,
  `RecoverCode` VARCHAR(45) NULL,
  `createdAt` TIMESTAMP NULL,
  `modifiedAt` TIMESTAMP NULL,
  `telefono` VARCHAR(45) NULL,
  `bio` VARCHAR(45) NULL,
  `cp` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`empresas` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`direcciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ciudad` VARCHAR(45) NULL,
  `calle` VARCHAR(45) NULL,
  `numero` INT NULL,
  `cp` VARCHAR(45) NULL,
  `long` VARCHAR(45) NULL,
  `lat` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tipologias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipologias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`activadades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`activadades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `empresa_id` INT NOT NULL,
  `direccion_id` INT NULL,
  `capacidad` INT NOT NULL,
  `precio` DECIMAL NULL,
  `fecha` DATE NULL,
  `hora` TIME NULL,
  `createdAt` TIMESTAMP NULL,
  `modifiedAt` TIMESTAMP NULL,
  `nombre` VARCHAR(45) NULL,
  `tipologia_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_activadades_1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_activadades_2_idx` (`empresa_id` ASC) VISIBLE,
  INDEX `fk_activadades_3_idx` (`direccion_id` ASC) VISIBLE,
  INDEX `fk_activadades_4_idx` (`tipologia_id` ASC) VISIBLE,
  CONSTRAINT `fk_activadades_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activadades_2`
    FOREIGN KEY (`empresa_id`)
    REFERENCES `mydb`.`empresas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activadades_3`
    FOREIGN KEY (`direccion_id`)
    REFERENCES `mydb`.`direcciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activadades_4`
    FOREIGN KEY (`tipologia_id`)
    REFERENCES `mydb`.`tipologias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tipodescripcion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipodescripcion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`imagines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`imagines` (
  `id` INT NOT NULL,
  `path` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`descripciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`descripciones` (
  `id` INT NOT NULL,
  `texto` VARCHAR(45) NOT NULL,
  `tipodescripcion_id` INT NULL,
  `imagen_id` INT NULL,
  `actividad_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_descripciones_1_idx` (`tipodescripcion_id` ASC) VISIBLE,
  INDEX `fk_descripciones_2_idx` (`imagen_id` ASC) VISIBLE,
  INDEX `fk_descripciones_3_idx` (`actividad_id` ASC) VISIBLE,
  CONSTRAINT `fk_descripciones_1`
    FOREIGN KEY (`tipodescripcion_id`)
    REFERENCES `mydb`.`tipodescripcion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_descripciones_2`
    FOREIGN KEY (`imagen_id`)
    REFERENCES `mydb`.`imagines` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_descripciones_3`
    FOREIGN KEY (`actividad_id`)
    REFERENCES `mydb`.`activadades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`valoraciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`valoraciones` (
  `id` INT NOT NULL,
  `actividad_id` INT NULL,
  `voto` TINYINT NULL,
  `comentario` VARCHAR(45) NULL,
  `createdAt` TIMESTAMP NULL,
  `usuario_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_valoraciones_1_idx` (`actividad_id` ASC) VISIBLE,
  INDEX `fk_valoraciones_2_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_valoraciones_1`
    FOREIGN KEY (`actividad_id`)
    REFERENCES `mydb`.`activadades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_valoraciones_2`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reservas` (
  `id` INT NOT NULL,
  `actividad_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `createdAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reservas_2_idx` (`actividad_id` ASC) VISIBLE,
  INDEX `fk_reservas_3_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservas_2`
    FOREIGN KEY (`actividad_id`)
    REFERENCES `mydb`.`activadades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_3`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
