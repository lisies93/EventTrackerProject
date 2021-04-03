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
INSERT INTO `category` (`id`, `name`) VALUES (7, 'dispute/refunds');
INSERT INTO `category` (`id`, `name`) VALUES (8, 'loans/credit cards');
INSERT INTO `category` (`id`, `name`) VALUES (9, 'bussiness travel');

COMMIT;


-- -----------------------------------------------------
-- Data for table `expense`
-- -----------------------------------------------------
START TRANSACTION;
USE `expensesdb`;
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (1, 'Pizap', '', 5.99, '2020-01-02', 1, 3, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (2, 'Aliexpress', '', 13.88, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (3, 'Aliexpress', '', 27.47, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (4, 'Aliexpress', '', 26.31, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (5, 'supplier', '', 240.5, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (6, 'adspy', '', 15, '2020-01-02', 1, 3, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (7, 'aliexpress', '', 4.23, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (8, 'aliexpress', '', 12.64, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (9, 'ebay', '', 7.88, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (10, 'aliexpress', '', 7.77, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (11, 'aliexpress', '', 7.55, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (12, 'Toll Free Forwarding', 'bussiness phone number', 4.88, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (13, 'facebook', '', 904.1, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (14, 'paypal transaction', '', 250.05, '2020-01-02', 1, 1, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (15, 'shopify dispute', '', 40.74, '2020-01-02', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (16, 'adobe', '', 10.81, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (17, 'USPS PO box', '', 74, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (18, 'stripe', '', 64.24, '2020-01-02', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (19, 'toll free forwarding', '', 9, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (20, 'facebook', '', 221.1, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (21, 'stamps.com', 'labels', 10, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (22, 'facebook', '', 36.36, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (23, 'capital one payment', 'karen card', 25, '2020-01-02', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (24, 'capital one payment', 'elmer bass pro card', 93, '2020-01-02', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (25, 'shopify refund', '', 44.88, '2020-01-02', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (26, 'shopify capital', '', 7.36, '2020-01-02', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (27, 'facebook', '', 80.57, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (28, 'shopify refunds', '', 28.71, '2020-01-02', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (29, 'shopify capital', '', 12.43, '2020-01-02', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (30, 'shopify domain', '', 14, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (31, 'facebook', '', 75, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (32, 'facebook', '', 25, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (33, 'facebook', '', 25, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (34, 'intercart', '', 49, '2020-01-02', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (35, 'facebook', '', 75, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (36, 'facebook', '', 35, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (37, 'facebook', '', 272.97, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (38, 'facebook', '', 5.49, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (39, 'facebook', '', 4.68, '2020-01-02', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (40, 'payment bank of america', 'credit card payment', 67.64, '2020-01-02', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (41, 'shopify refund', '', 43.22, '2020-01-02', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (42, 'stripe dispute', '', 16.61, '2020-01-02', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (43, 'shopify capital', '', 6.6, '2020-01-02', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (44, 'aliexpress', '', 15.5, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (45, 'aliexpress', '', 5.5, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (46, 'aliexpress', '', 6.99, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (47, 'aliexpress', '', 7.09, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (48, 'aliexpress', '', 8.24, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (49, 'aliexpress', '', 8.09, '2020-01-02', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (50, 'flight to miami', 'business meeting', 228.39, '2020-01-12', 1, 1, 9);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (51, 'facebook', '', 37.33, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (52, 'facebook', '', 50, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (53, 'facebook', '', 75, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (54, 'shopify capital', '', 12.25, '2020-01-12', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (55, 'shopify capital', '', 6.3, '2020-01-12', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (56, 'mask US supply', 'inventory', 400, '2020-01-12', 1, 1, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (57, 'facebook', '', 125, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (58, 'shopify capital', '', 4.89, '2020-01-12', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (59, 'facebook', '', 175, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (60, 'shopify capital', '', 31.36, '2020-01-12', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (61, 'facebook', '', 767.95, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (62, 'shopify capital', '', 36.63, '2020-01-12', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (63, 'facebook', '', 250, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (64, 'facebook', '', 646.46, '2020-01-12', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (65, 'inventory', '', 67.1, '2020-01-12', 1, 1, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (66, 'inventory', '', 5.8, '2020-01-12', 1, 1, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (67, 'inventory', '', 117, '2020-01-12', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (68, 'aliexpress', '', 8.34, '2020-01-12', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (69, 'aliexpress', '', 5.97, '2020-01-12', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (70, 'inventory', '', 66.2, '2020-01-12', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (71, 'inventory', '', 334.4, '2020-01-19', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (72, 'Dare facebook acc', '', 258.2, '2020-01-19', 1, 3, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (73, 'facebook', '', 400, '2020-01-19', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (74, 'dare fb acc', '', 41.8, '2020-01-19', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (75, 'inventory', '', 26.47, '2020-01-19', 1, 1, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (76, 'shopify capital', '', 40.76, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (77, 'shopify domain', '', 14, '2020-01-19', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (78, 'shopify capital', '', 31.05, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (79, 'shopify capital', '', 30.74, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (80, 'shopify capital', '', 24.05, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (81, 'shopify capital', '', 15.8, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (82, 'replacement credit card', '', 10, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (83, 'shopify capital', '', 1.69, '2020-01-19', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (84, 'fiverr', 'logo', 27, '2020-01-19', 1, 3, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (85, 'inventory', '', 112.2, '2020-01-19', 1, 3, 2);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (86, 'shopify capital', '', 2.09, '2020-01-26', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (87, 'capital one payment', '', 125, '2020-01-26', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (88, 'shopify store', '', 195.54, '2020-01-26', 1, 1, 4);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (89, 'facebook', '', 25, '2020-01-26', 1, 1, 1);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (90, 'stripe', '', 14.88, '2020-01-26', 1, 1, 7);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (91, 'shopify capital', '', 5.21, '2020-01-26', 1, 1, 8);
INSERT INTO `expense` (`id`, `name`, `description`, `amount`, `created_date`, `active`, `payment_method_id`, `category_id`) VALUES (92, 'NORD VPN', '', 11.95, '2020-01-26', 1, 3, 4);

COMMIT;

