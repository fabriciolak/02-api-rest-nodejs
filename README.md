# Personal Finance Manager Backend

Construído utilizando fastify, knex e sqlite como banco de dados. Esta é uma aplicação que você pode utilizar para adicionar e obter um resumo das suas finanças.

## Instalar e executar o projeto

Executar a aplicação em sua máquina local é uma tarefa extremamente simples.

### Dependências globais

Você precisa ter o node como dependência instalada:

- Node.js LTS v18 (ou qualquer versão superior)

### Dependências locais

Instale as dependências locais do projeto:

```bash
npm install
```

### Executar o projeto

Para executar o projeto localmente, basta utilizar o comando abaixo:

```bash
npm run dev
```

### Executar os testes

Os testes no projeto ajudam a certificar que tudo está passando como esperado.

```bash
npm test
```

# RF (Requisitos funcionais)

- [ x ] O usuário deve poder criar uma nova transação;
- [ x ] O usuário deve poder obter um resumo da sua conta;
- [ x ] O usuário deve poder listar todas transações que já ocorreram;
- [ x ] O usuário deve poder visualizar uma transação única;

# RN (Regras de negócio)

- [ x ] A transação pode ser do tipo crédito que somará ao valor total, ou débito que irá subtrair;
- [ x ] Deve ser possível identificar o usuário entre as requisições;
- [ x ] O usuário só pode visualizar transações o qual ele criou;