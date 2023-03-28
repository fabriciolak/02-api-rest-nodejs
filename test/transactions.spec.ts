import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

beforeEach(() => {
  execSync('npm run knex migrate:rollback --all')
  execSync('npm run knex migrate:latest')
})

afterAll(async () => {
  await app.close()
})

describe('/transactions', () => {
  describe('[POST] Create a new user', () => {
    it('Should be able for the user create a new transaction', async () => {
      await request(app.server)
        .post('/transactions')
        .send({
          title: 'new transaction',
          amount: 5000,
          type: 'credit',
        })
        .expect(201)
    })
  })

  describe('[GET] List all transactions', () => {
    it('Should be able to list all transactions', async () => {
      const createTransactionResponse = await request(app.server)
        .post('/transactions')
        .send({
          title: 'new transaction',
          amount: 5000,
          type: 'credit',
        })

      const cookies = createTransactionResponse.get('Set-Cookie')

      const listTransactionResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)

      expect(listTransactionResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: 'new transaction',
          amount: 5000,
        }),
      ])
    })
  })
})
