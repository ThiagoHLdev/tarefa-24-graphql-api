# Tarefa 24 - GraphQL API com PactumJS

Exercício do módulo 24: Automação de API utilizando **GraphQL + PactumJS + Joi + Jest**. filecite41†M24 - Exercicio.pdf

## ⚙️ Stack
- Node.js + Jest
- PactumJS (requisições & matchers)
- Joi (validação de contrato)
- Allure Reports

## ▶️ Como rodar
1. Instale dependências:
   ```bash
   npm install
   ```

2. Execute os testes:
   ```bash
   npm test
   ```

3. Gerar relatório Allure:
   ```bash
   npm run report:allure
   ```

## 📁 Estrutura
```
tests/
 ├─ categories.test.js   # add/edit/delete category + contrato
 └─ products.test.js     # add/edit/delete product + contrato
pactum.config.js         # baseUrl GraphQL
jest.config.js           # Jest + Allure
package.json
```

## ✅ Cenários
- Categorias: addCategory, editCategory, deleteCategory (+ contrato)
- Produtos: addProduct, editProduct, deleteProduct (+ contrato)

## 🔗 Entrega
Subir este projeto em um novo repositório público (ex: **tarefa-24-graphql-api**) e usar a branch `main`.