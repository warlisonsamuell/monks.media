--realizei a importação dos dois banco de dados corrigidos


--criei a tabela unica com os dados
CREATE TABLE tabela_unica AS
SELECT banco_corrigido_broken_database_1.*, banco_corrigido_broken_database_2.*
FROM banco_corrigido_broken_database_1
INNER JOIN banco_corrigido_broken_database_2 ON banco_corrigido_broken_database_1.c2 = banco_corrigido_broken_database_2.c1;

--exporte a tabela unica--
select * from tabela_unica; 
