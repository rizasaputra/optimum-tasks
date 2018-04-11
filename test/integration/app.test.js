const assert = require('chai').assert
const app = require('../../app')

describe('App test', () => {
  it('should combine all tasks when no time overlap at all', async () => {
    result = await app.run('./test/testFiles/noCollision.csv')

    assert.isArray(result.optimumTasks)
    assert.equal(result.optimumTasks.length, 5)
    assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
      'Task A',
      'Task B',
      'Task C',
      'Task D',
      'Task E'
    ])
    assert.equal(result.highScore, 1500)
  })

  it('should combine all tasks in random order when no time overlap at all', async () => {
    result = await app.run('./test/testFiles/randomOrder.csv')

    assert.isArray(result.optimumTasks)
    assert.equal(result.optimumTasks.length, 5)
    assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
      'Task A',
      'Task B',
      'Task C',
      'Task D',
      'Task E'
    ])
    assert.equal(result.highScore, 1500)
  })

  it('should get task with highest score when all time overlap', async () => {
    result = await app.run('./test/testFiles/allCollision.csv')

    assert.isArray(result.optimumTasks)
    assert.equal(result.optimumTasks.length, 1)
    assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
      'Task E'
    ])
    assert.equal(result.highScore, 500)
  })

  it('should get a task with highest score if it is higher than combination of all other tasks', async () => {
    result = await app.run('./test/testFiles/singleStrong.csv')
    assert.isArray(result.optimumTasks)
    assert.equal(result.optimumTasks.length, 1)
    assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
      'Task A'
    ])
    assert.equal(result.highScore, 1500)
  })

  it('should get combination of tasks with highest score', async () => {
    result = await app.run('./test/testFiles/unionStrong.csv')
    assert.isArray(result.optimumTasks)
    assert.equal(result.optimumTasks.length, 3)
    assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
      'Task D',
      'Task B',
      'Task C'
    ])
    assert.equal(result.highScore, 1200)
  })
})
