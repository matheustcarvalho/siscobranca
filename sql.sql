CREATE TABLE `integra`.`cob_operadores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `login` VARCHAR(45) NULL,
  `grupo` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

  
CREATE TABLE `integra`.`cob_cobrancas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `adesao_id` INT NULL,
  `cliente_id` INT NULL,
  `login` VARCHAR(45) NULL,
  `operador_id` INT NULL,
  `numero_cobranca` INT NULL,
  PRIMARY KEY (`id`));


  CREATE TABLE `integra`.`cob_atribuicao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NULL,
  `adesao_id` INT NULL,
  `login` VARCHAR(45) NULL,
  `operador_id` INT NULL,
  PRIMARY KEY (`id`));

  ///////////////////////////////////////////////////////////////

CREATE TABLE cob_operadores (
id int PRIMARY KEY,
nome VARCHAR(50)
);

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `integra`@`10.0.1.27` 
    SQL SECURITY DEFINER
VIEW `view_sistema_de_cobranca` AS
    SELECT 
        `sistema`.`id` AS `id`,
        `sistema`.`login` AS `login`,
        `sistema`.`status_login` AS `status_login`,
        `sistema`.`dia_vencimento` AS `dia_vencimento`,
        `sistema`.`protocolo` AS `protocolo`,
        (CASE
            WHEN (`sistema`.`pagou_atrasado` = 0) THEN 'Primeiro atraso'
            WHEN (`sistema`.`pagou_atrasado` = 1) THEN 'Segundo atraso'
            WHEN
                ((`sistema`.`pagou_atrasado` > 1)
                    AND (`sistema`.`pagou_atrasado` < 5))
            THEN
                'Atrasou entre 2 e 4 vezes'
            WHEN (`sistema`.`pagou_atrasado` >= 5) THEN 'Atrasa com frequência'
        END) AS classificacao,
        ROUND(AVG(IF((bol.data_pagamento > bol.dataVencimento),
                    (TO_DAYS((bol.data_pagamento - INTERVAL 3 DAY)) - TO_DAYS(bol.dataVencimento)),
                    NULL)),
                0) AS Atrasa_dias,
        sistema.pagou_atrasado AS pagou_atrasado,
        sistema.faturas_geradas AS faturas_geradas,
        sistema.nome AS nome,
        sistema.id_cliente AS id_cliente,
        sistema.solicitacao AS solicitacao,
        sistema.boletos_vencidos AS boletos_vencidos,
        sistema.cidade AS cidade
    FROM
        (view_cobranca_sistema sistema
        JOIN view_adesoes_boletos bol ON ((bol.login = sistema.login)))
    GROUP BY sistema.login


    CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `integra`@`10.0.1.27` 
    SQL SECURITY DEFINER
VIEW `view_cobranca_sistema` AS
    SELECT 
        `ade_ina`.`id` AS `id`,
        `ade_ina`.`login` AS `login`,
        `ade_ina`.`status_login` AS `status_login`,
        `ade_ina`.`dia_vencimento` AS `dia_vencimento`,
        `ade_ina`.`protocolo` AS `protocolo`,
        COUNT((CASE
            WHEN
                ((`bol`.`dataVencimento` < (`bol`.`data_pagamento` - INTERVAL 3 DAY))
                    AND (`bol`.`data_pagamento` <> '0000-00-00'))
            THEN
                `bol`.`dataVencimento`
        END)) AS `pagou_atrasado`,
        COUNT((CASE
            WHEN
                ((`bol`.`dataVencimento` < CURDATE())
                    AND (`bol`.`status` <> 'C'))
            THEN
                `bol`.`dataVencimento`
        END)) AS `faturas_geradas`,
        ROUND(AVG(EXTRACT(DAY FROM `bol`.`data_pagamento`)),
                0) AS `provavel_pagamento`,
        `ade_ina`.`nome` AS `nome`,
        `ade_ina`.`id_cliente` AS `id_cliente`,
        `ade_ina`.`solicitacao` AS `solicitacao`,
        `ade_ina`.`boletos_vencidos` AS `boletos_vencidos`,
        `ade_ina`.`cidade` AS `cidade`,
        (ISNULL(`ade_ina`.`protocolo`)
            AND (`cob`.`id` IS NOT NULL)) AS `tentativas`
    FROM
        ((`view_adesao_inadimplentes` `ade_ina`
        LEFT JOIN `cobrancas_operador` `cob` ON (((`cob`.`id_cliente` = `ade_ina`.`id_cliente`)
            AND (`cob`.`status_cobranca` = 'N')
            AND (TIMESTAMPDIFF(MONTH, DATE_FORMAT(`cob`.`data_contato`, '%Y-%m-%d'), CURDATE()) <= `ade_ina`.`boletos_vencidos`))))
        JOIN `view_adesoes_boletos` `bol` ON (((`bol`.`login` = `ade_ina`.`login`)
            AND (`bol`.`dataVencimento` BETWEEN (CURDATE() - INTERVAL 1 YEAR) AND CURDATE()))))
    GROUP BY `ade_ina`.`login`