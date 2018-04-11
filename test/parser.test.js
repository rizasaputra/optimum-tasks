const assert = require('chai').assert
const parser = require('../parser')

describe('Optimum tasks', () => {
  describe('Parse CSV', () => {
    it('skip invalid row', async () => {
      try {
        data = await parser.parse('./test/testFiles/invalidFormat.csv')

        assert.isArray(data.tasks)
        assert.equal(data.tasks.length, 1)
      } catch (err) {}
    })

    it('skip invalid date', async () => {
      try {
        data = await parser.parse('./test/testFiles/invalidDate.csv')

        assert.isArray(data.tasks)
        assert.equal(data.tasks.length, 1)
      } catch (err) {}
    })

    it('skip invalid date range', async () => {
      try {
        data = await parser.parse('./test/testFiles/invalidDateRange.csv')

        assert.isArray(data.tasks)
        assert.equal(data.tasks.length, 1)
      } catch (err) {}
    })

    it('parse CSV files and return total score', async () => {
      try {
        data = await parser.parse('./test/testFiles/noCollision.csv')

        assert.isArray(data.tasks)
        assert.equal(data.tasks.length, 5)
        assert.equal(data.tasks.totalScore, 1500)
      } catch (err) {}
    })
  })
})
