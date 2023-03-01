CREATE TABLE `integra`.`cob_atribuicao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NULL,
  `adesao_id` INT NULL,
  `login` VARCHAR(45) NULL,
  `operador_id` INT NULL,
  `operador_atribuiu` INT NULL,
  `status` VARCHAR(45) NULL,
  `agendado` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

  
CREATE TABLE `integra`.`cob_cobrancas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `atribuicao_id` INT NULL,
  `operador_id` INT NULL,
  `comentario` VARCHAR(255) NULL,
  `data_cobranca` DATE NULL,
  `criado` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


  

  ///////////////////////////////////////////////////////////////
