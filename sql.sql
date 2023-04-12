SELECT 
    ade.id AS id,
    ade.login AS login,
    ade.dia_vencimento AS dia_vencimento,
    operador.nome as nome,
    (CASE
        WHEN (ade.status_login = 'A') THEN 'Ativo'
        WHEN (ade.status_login = 'P') THEN 'Inadimplente'
        WHEN (ade.status_login = 'I') THEN 'Inativo'
        WHEN (ade.status_login = 'D') THEN 'Desativar'
        WHEN (ade.status_login = 'S') THEN 'Suspenso'
        WHEN (ade.status_login = 'T') THEN 'Liberação temporária'
        WHEN (ade.status_login = 'B') THEN 'Bloqueado'
        WHEN (ade.status_login = 'C') THEN 'Cancelado'
        WHEN (ade.status_login = 'LC') THEN 'Liberação confiança'
        WHEN (ade.status_login = 'PB') THEN 'Parcialmente bloqueado'
    END) AS status_login,
    ROUND(AVG(IF((bol.status = 'R') AND (bol.data_pagamento > bol.dataVencimento),
        IF((TO_DAYS(IF((DAYNAME(bol.data_pagamento) = 'Tuesday'), (bol.data_pagamento - INTERVAL 3 DAY), bol.data_pagamento)) - TO_DAYS(bol.dataVencimento)) > 0,
            TO_DAYS(IF((DAYNAME(bol.data_pagamento) = 'Tuesday'), (bol.data_pagamento - INTERVAL 3 DAY), bol.data_pagamento)) - TO_DAYS(bol.dataVencimento),
            NULL),
        NULL)), 0) AS Atrasa_dias,
    COUNT(IF((bol.data_pagamento <> '0000-00-00') AND (bol.dataVencimento < IF((DAYNAME(bol.data_pagamento) = 'Tuesday'), (bol.data_pagamento - INTERVAL 3 DAY), bol.data_pagamento)), bol.dataVencimento, NULL)) AS pagou_atrasado,
    COUNT(IF((bol.status <> 'C'), bol.id, NULL)) AS faturas_geradas,
    cli.nome AS nome,
    cli.id AS id_cliente,
    COUNT(IF((bol.status = 'A'), bol.id, NULL)) AS boletos_vencidos,
    UPPER(enc.cidade) AS cidade,
    atd.vendedor AS vendedor
FROM (
    (adesao ade
    JOIN clientes cli ON cli.id = ade.cliente)
    JOIN endereco_cli enc ON enc.id = ade.endereco)
    JOIN servicos ser ON ser.id = ade.plano AND NOT(LOWER(ser.nome) LIKE '%livre%')
    LEFT JOIN (
        SELECT cliente, vendedor
        FROM atendimentos
        GROUP BY cliente
    ) atd ON atd.cliente = ade.cliente
    LEFT JOIN operador ON (operador.id = atd.vendedor)
           join `view_adesoes_boletos` `bol` on(
            (
                (`bol`.`login` = `ade`.`login`)
                and (`bol`.`tipo_cobranca` = 'P')
                and (
                    `bol`.`dataVencimento` between (curdate() - interval 1 year)
                    and curdate()
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

    ////////////////////

    SELECT 
        `ade_ina`.`id` AS `id`,
        `ade_ina`.`login` AS `login`,
        `ade_ina`.`status_login` AS `status_login`,
        `ade_ina`.`dia_vencimento` AS `dia_vencimento`,
        `ade_ina`.`protocolo` AS `protocolo`,
        `ade_ina`.`nome` AS `nome`,
        `ade_ina`.`id_cliente` AS `id_cliente`,
        `ade_ina`.`solicitacao` AS `solicitacao`,
        `ade_ina`.`boletos_vencidos` AS `boletos_vencidos`,
        `ade_ina`.`cidade` AS `cidade`,
        (ISNULL(`ade_ina`.`protocolo`)
            AND (`cob`.`id` IS NOT NULL)) AS `tentativas`
    FROM
        ((
                SELECT 
        `ade`.`id` AS `id`,
        `ade`.`login` AS `login`,
        `ade`.`dia_vencimento` AS `dia_vencimento`,
        `ade`.`status_login` AS `statuslogin`,
        (CASE
            WHEN (`ade`.`status_login` IN ('T' , 'PB')) THEN 'B'
            WHEN (`ade`.`status_login` = 'LC') THEN 'P'
            ELSE `ade`.`status_login`
        END) AS `status_login`,
        `ate`.`protocolo` AS `protocolo`,
        `cli`.`nome` AS `nome`,
        `cli`.`id` AS `id_cliente`,
        `sol`.`titulo` AS `solicitacao`,
        (TIMESTAMPDIFF(MONTH,
            MIN(`bol`.`dataVencimento`),
            CURDATE()) + 1) AS `boletos_vencidos`,
        UPPER(`enc`.`cidade`) AS `cidade`
    FROM
        ((((((`adesao` `ade`
        JOIN `clientes` `cli` ON ((`cli`.`id` = `ade`.`cliente`)))
        JOIN `endereco_cli` `enc` ON ((`enc`.`id` = `ade`.`endereco`)))
        JOIN `servicos` `ser` ON ((`ser`.`id` = `ade`.`plano`)))
        JOIN `view_adesoes_boletos` `bol` ON (((`bol`.`login` = `ade`.`login`)
            AND (`bol`.`dataVencimento` < CURDATE())
            AND (`bol`.`status` = 'A'))))
        LEFT JOIN `atendimentos` `ate` ON (((`ate`.`login` = `ade`.`login`)
            AND (`ate`.`situacao` <> 'EC')
            AND (`ate`.`solicitacao_id` IN (51 , 106)))))
        LEFT JOIN `solicitacao` `sol` ON ((`sol`.`id` = `ate`.`solicitacao_id`)))
    WHERE
        ((`cli`.`corporativo` = 'N')
            AND (NOT ((LOWER(`ser`.`nome`) LIKE '%livre%')))
            AND (`ade`.`status` = 'A')
            AND (`ade`.`status_login` IN ('P' , 'B', 'T', 'LC', 'PB')))
    GROUP BY `ade`.`login`
        ) ade_ina
        LEFT JOIN `cobrancas_operador` `cob` ON (((`cob`.`id_cliente` = `ade_ina`.`id_cliente`)
            AND (`cob`.`status_cobranca` = 'N')
            AND (TIMESTAMPDIFF(MONTH, DATE_FORMAT(`cob`.`data_contato`, '%Y-%m-%d'), CURDATE()) <= `ade_ina`.`boletos_vencidos`))))
    GROUP BY `ade_ina`.`login`





