# Personal Finance Manager Backend

Construído utilizando fastify, knex e sqlite como banco de dados. Esta é uma aplicação que você pode utilizar para adicionar e obter um resumo das suas finanças.

# RF (Requisitos funcionais)

- [ x ] O usuário deve poder criar uma nova transação;
- [ x ] O usuário deve poder obter um resumo da sua conta;
- [ x ] O usuário deve poder listar todas transações que já ocorreram;
- [ x ] O usuário deve poder visualizar uma transação única;

# RN (Regras de negócio)

- [ x ] A transação pode ser do tipo crédito que somará ao valor total, ou débito que irá subtrair;
- [ x ] Deve ser possível identificar o usuário entre as requisições;
- [ x ] O usuário só pode visualizar transações o qual ele criou;