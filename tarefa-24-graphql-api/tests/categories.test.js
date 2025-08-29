const pactum = require('pactum');
const Joi = require('joi');
const { baseUrl } = require('../pactum.config');

describe('Categorias - GraphQL API', () => {
  const spec = pactum.spec();

  it('Adicionar categoria (mock)', async () => {
    const query = `
      mutation {
        addCategory(input: { name: "Eletrônicos" }) {
          id
          name
        }
      }
    `;

    await spec
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200)
      .expectJsonMatch('data.addCategory', {
        id: pactum.matcher.like('1'),
        name: 'Eletrônicos'
      });
  });

  it('Editar categoria (mock)', async () => {
    const query = `
      mutation {
        editCategory(id: "1", input: { name: "Eletrônicos e Gadgets" }) {
          id
          name
        }
      }
    `;
    await spec
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200);
  });

  it('Excluir categoria (mock)', async () => {
    const query = `
      mutation {
        deleteCategory(id: "1")
      }
    `;
    await spec
      .post(baseUrl)
      .withGraphQL(query)
      .expectStatus(200);
  });

  it('Contrato - addCategory', async () => {
    const schema = Joi.object({
      data: Joi.object({
        addCategory: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required()
        }).required()
      }).required()
    });

    const query = `
      mutation {
        addCategory(input: { name: "Livros" }) {
          id
          name
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