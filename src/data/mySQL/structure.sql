-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tu_tienda_web
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tu_tienda_web
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tu_tienda_web` DEFAULT CHARACTER SET utf8 ;
USE `tu_tienda_web` ;

-- -----------------------------------------------------
-- Table `tu_tienda_web`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NULL,
  `price` MEDIUMINT UNSIGNED NOT NULL,
  `transaction_cost_percent` DECIMAL(3,1) UNSIGNED NOT NULL,
  `web_sections` SMALLINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`products` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `type` ENUM('tienda_web', 'pagina_web') NOT NULL,
  `title_banner` VARCHAR(100) NULL DEFAULT NULL,
  `subtitle_banner` VARCHAR(100) NULL DEFAULT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `hash_id` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NULL DEFAULT NULL,
  `role` ENUM('admin', 'user') NULL DEFAULT 'user',
  `product_id` BIGINT UNSIGNED NULL,
  `category_id` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `hash_id_UNIQUE` (`hash_id` ASC),
  INDEX `category_user_idx` (`category_id` ASC),
  INDEX `product_user_idx` (`product_id` ASC),
  CONSTRAINT `category_user`
    FOREIGN KEY (`category_id`)
    REFERENCES `tu_tienda_web`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_user`
    FOREIGN KEY (`product_id`)
    REFERENCES `tu_tienda_web`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`sections` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `products_section_1_idx` (`product_id` ASC),
  CONSTRAINT `products_sections`
    FOREIGN KEY (`product_id`)
    REFERENCES `tu_tienda_web`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`benefits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`benefits` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`benefit_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`benefit_category` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `benefit_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `benefit_pivot_category_idx` (`benefit_id` ASC),
  INDEX `category_pivot_benefit_idx` (`category_id` ASC),
  CONSTRAINT `benefit_pivot_category`
    FOREIGN KEY (`benefit_id`)
    REFERENCES `tu_tienda_web`.`benefits` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_pivot_benefit`
    FOREIGN KEY (`category_id`)
    REFERENCES `tu_tienda_web`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`carts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `users_carts_idx` (`user_id` ASC),
  INDEX `products_carts_idx` (`product_id` ASC),
  INDEX `category_carts_idx` (`category_id` ASC),
  CONSTRAINT `users_carts`
    FOREIGN KEY (`user_id`)
    REFERENCES `tu_tienda_web`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `products_carts`
    FOREIGN KEY (`product_id`)
    REFERENCES `tu_tienda_web`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_carts`
    FOREIGN KEY (`category_id`)
    REFERENCES `tu_tienda_web`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`contents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`contents` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `section_id` BIGINT UNSIGNED NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sections_icons_idx` (`section_id` ASC),
  CONSTRAINT `sections_icons00`
    FOREIGN KEY (`section_id`)
    REFERENCES `tu_tienda_web`.`sections` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tu_tienda_web`.`category_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tu_tienda_web`.`category_product` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  INDEX `category_pivot_product_idx` (`category_id` ASC),
  INDEX `product_pivot_category_idx` (`product_id` ASC),
  CONSTRAINT `category_pivot_product`
    FOREIGN KEY (`category_id`)
    REFERENCES `tu_tienda_web`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_pivot_category`
    FOREIGN KEY (`product_id`)
    REFERENCES `tu_tienda_web`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
