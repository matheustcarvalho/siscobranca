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
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `integra`.`cob_cobrancas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `atribuicao_id` INT NULL,
  `operador_id` INT NULL,
  `comentario` VARCHAR(255) NULL,
  `data_cobranca` DATE NULL,
  `criado` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

INSERT INTO parametros (operacao, atributo, valor) VALUES ('sistema-cobranca', 'periodo-cobranca', '6')

/ / / / / / / / / /

select

  `ade`.`id` AS `id`,
  `ade`.`login` AS `login`,
  `ade`.`dia_vencimento` AS `dia_vencimento`,
(
    case
      when (`ade`.`status_login` = 'A') then 'Ativo'
      when (`ade`.`status_login` = 'P') then 'Inadimplente'
      when (`ade`.`status_login` = 'I') then 'Inativo'
      when (`ade`.`status_login` = 'D') then 'Desativar'
      when (`ade`.`status_login` = 'S') then 'Suspenso'
      when (`ade`.`status_login` = 'T') then 'Liberação temporária'
      when (`ade`.`status_login` = 'B') then 'Bloqueado'
      when (`ade`.`status_login` = 'C') then 'Cancelado'
      when (`ade`.`status_login` = 'LC') then 'Liberação confiança'
      when (`ade`.`status_login` = 'PB') then 'Parcialmente bloqueado'
    end
  ) AS `status_login`,
  round(
    avg(
      if(
        (
          (`bol`.`status` = 'R')
          and (`bol`.`data_pagamento` > `bol`.`dataVencimento`)
        ),
        if(
          (
            (
              to_days(
                if(
                  (dayname(`bol`.`data_pagamento`) = 'Tuesday'),
(`bol`.`data_pagamento` - interval 3 day),
                  `bol`.`data_pagamento`
                )
              ) - to_days(`bol`.`dataVencimento`)
            ) > 0
          ),
(
            to_days(
              if(
                (dayname(`bol`.`data_pagamento`) = 'Tuesday'),
(`bol`.`data_pagamento` - interval 3 day),
                `bol`.`data_pagamento`
              )
            ) - to_days(`bol`.`dataVencimento`)
          ),
          NULL
        ),
        NULL
      )
    ),
    0
  ) AS `Atrasa_dias`,
  count(
    if(
      (
        (`bol`.`data_pagamento` <> '0000-00-00')
        and (
          `bol`.`dataVencimento` < if(
            (dayname(`bol`.`data_pagamento`) = 'Tuesday'),
(`bol`.`data_pagamento` - interval 3 day),
            `bol`.`data_pagamento`
          )
        )
      ),
      `bol`.`dataVencimento`,
      NULL
    )
  ) AS `pagou_atrasado`,
  count(if((`bol`.`status` <> 'C'), `bol`.`id`, NULL)) AS `faturas_geradas`,
  `cli`.`nome` AS `nome`,
  `cli`.`id` AS `id_cliente`,
  count(if((`bol`.`status` = 'A'), `bol`.`id`, NULL)) AS `boletos_vencidos`,
  upper(`enc`.`cidade`) AS `cidade`
from
  (
    (
      (
        (
          `adesao` `ade`
          join `clientes` `cli` on((`cli`.`id` = `ade`.`cliente`))
        )
        join `endereco_cli` `enc` on((`enc`.`id` = `ade`.`endereco`))
      )
      join `servicos` `ser` on(
        (
          (`ser`.`id` = `ade`.`plano`)
          and (not((lower(`ser`.`nome`) like '%livre%')))
        )
      )
    )
    left join `view_adesoes_boletos` `bol` on(
      (
        (`bol`.`login` = `ade`.`login`)
        and (`bol`.`tipo_cobranca` = 'P')
        and (
          `bol`.`dataVencimento` between (curdate() - interval 1 year)
          and curdate()
        )
      )
    )
  )
where
  (
    (`cli`.`corporativo` = 'N')
    and (`ade`.`status` = 'A')
    and (`ade`.`status_login` in ('P', 'B', 'T', 'LC', 'PB'))
  )
group by
  `ade`.`login`
order by
  `ade`.`login`