const pactum = require('pactum');
const Joi = require('joi');
const { baseUrl } = require('../pactum.config');

describe('Produtos - GraphQL API', () => {
  const spec = pactum.spec();

  it('Adicionar produto (mock)', async () => {
    const query = `
      mutation {
        addProduct(input: { name: "Notebook", price: 3500 }) {
          id
          name
          price
        }
      }
    `;

    await spec
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200)
      .expectJsonMatch('data.addProduct', {
        id: pactum.matcher.like('1'),
        name: 'Notebook',
        price: pactum.matcher.like(3500)
      });
  });

  it('Editar produto (mock)', async () => {
    const query = `
      mutation {
        editProduct(id: "1", input: { name: "Notebook Gamer", price: 5000 }) {
          id
          name
          price
        }
      }
    `;
    await spec
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200);
  });

  it('Excluir produto (mock)', async () => {
    const query = `
      mutation {
        deleteProduct(id: "1")
      }
    `;
    await spec
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200);
  });

  it('Contrato - addProduct', async () => {
    const schema = Joi.object({
      data: Joi.object({
        addProduct: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          price: Joi.number().required()
        }).required()
      }).required()
    });

    const query = `
      mutation {
        addProduct(input: { name: "Celular", price: 2000 }) {
          id
          name
          price
        }
      }
    `;

    const res = await pactum
      .spec()
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200);

    const { error } = schema.validate(res.json, { allowUnknown: true });
    expect(error).toBeUndefined();
  });

});