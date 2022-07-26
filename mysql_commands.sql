-- Creating database
CREATE SCHEMA `assignment_nodejs` ;

-- Creating table with schema model
CREATE TABLE `assignment_nodejs`.`customer_data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

-- Interting one row
INSERT INTO `assignment_nodejs`.`customer_data` (`name`, `email`, `phone`) VALUES ('Venkatesh P', 'venky@gmail.com', '8085465889');
