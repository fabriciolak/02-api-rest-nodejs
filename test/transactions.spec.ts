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
  describe('[POST] User create a new transaction', () => {
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

  describe('[GET] List transactions', () => {
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

    it('Should be able to get a specific transaction by id', async () => {
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

      const transactionId = listTransactionResponse.body.transactions[0].id

      const getTransactionResponse = await request(app.server)
        .get(`/transactions/${transactionId}`)
        .set('Cookie', cookies)
        .expect(200)

      expect(getTransactionResponse.body.transaction).toEqual(
        expect.objectContaining({
          title: 'new transaction',
          amount: 5000,
        }),
      )
    })

    it('Should be able to get the summary', async () => {
      const createTransactionResponse = await request(app.server)
        .post('/transactions')
        .send({
          title: 'Credit transaction',
          amount: 5000,
          type: 'credit',
        })

      const cookies = createTransactionResponse.get('Set-Cookie')

      await request(app.server)
        .post('/transactions')
        .set('Cookie', cookies)
        .send({
          title: 'Debit transaction',
          amount: 2500,
          type: 'debit',
        })

      const summaryResponse = await request(app.server)
        .get('/transactions/summary')
        .set('Cookie', cookies)
        .expect(200)

      expect(summaryResponse.body.summary).toEqual({
        amount: 2500,
      })
    })
  })
})
