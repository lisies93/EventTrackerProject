-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema expensesdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `expensesdb` ;

-- -----------------------------------------------------
-- Schema expensesdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `expensesdb` DEFAULT CHARACTER SET utf8 ;
USE `expensesdb` ;

-- -----------------------------------------------------
-- Table `payment_method`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `payment_method` ;

CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expense`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expense` ;

CREATE TABLE IF NOT EXISTS `expense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(500) NULL,
  `amount` DOUBLE(15,2) NOT NULL,
  `created_date` DATE NOT NULL,
  `active` TINYINT NULL,
  `payment_method_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_expense_payment_method_idx` (`payment_method_id` ASC),
  INDEX `fk_expense_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_expense_payment_method`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `payment_method` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_expense_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `payment_method`
-- -----------------------------------------------------
START TRANSACTION;
USE `expensesdb`;
INSERT INTO `payment_method` (`id`, `name`, `type`) VALUES (1, 'Bank of America', 'debit');
INSERT INTO `payment_method` (`id`, `name`, `type`) VALUES (2, 'Capital One', 'credit');
INSERT INTO `payment_method` (`id`, `name`, `type`) VALUES (3, 'Paypal', 'debit');
INSERT INTO `payment_method` (`id`, `name`, `type`) VALUES (4, 'Amex', 'credit');

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `expensesdb`;
INSERT INTO `category` (`id`, `name`) VALUES (1, 'ads');
INSERT INTO `category` (`id`, `name`) VALUES (2, 'supplier');
INSERT INTO `category` (`id`, `name`) VALUES (3, 'merchant account');
INSERT INTO `category` (`id`, `name`) VALUES (4, 'store mantainance');
INSERT INTO `category` (`id`, `name`) VALUES (5, 'employees');

COMMIT;


-- -----------------------------------------------------
-- Data for table `expense`
-- -----------------------------------------------------
START TRANSACTION;
USE `expensesdb`;
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (1, 'facebook ads', NULL, 900, '2021-04-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (2, 'supplier', 'march 21 orders', 1400, '2021-04-01', 1, 2, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (3, 'Pinterest ', NULL, 1245, '2021-03-30', 1, 2, 1);

COMMIT;

