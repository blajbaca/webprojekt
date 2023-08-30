CREATE TABLE `webprojekt`.`workouts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `muscleGroup` VARCHAR(100),
  `imageSource` VARCHAR(100),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB COMMENT 'Table to store exercises';