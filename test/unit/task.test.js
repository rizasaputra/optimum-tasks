const moment = require('moment')
const assert = require('chai').assert
const task = require('../../task')

describe('Modify task', () => {
  describe('Sort tasks by start date', () => {
    it('sort random rows', () => {
      const randomTasks = [
        {
          startTime: moment('2018-04-11 09:00'),
          endTime: moment('2018-04-11 11:00')
        },
        {
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 08:00')
        },
        {
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 18:00')
        },
        {
          startTime: moment('2018-04-11 08:00'),
          endTime: moment('2018-04-11 10:00')
        }
      ]

      const sortedTasks = task
        .dateSort(randomTasks)
        .map(task => task.startTime.format())
      const expected = [
        moment('2018-04-11 07:00'),
        moment('2018-04-11 07:00'),
        moment('2018-04-11 08:00'),
        moment('2018-04-11 09:00')
      ].map(momentObj => momentObj.format())

      assert.sameOrderedMembers(sortedTasks, expected)
    })

    it('does not change already ordered rows', () => {
      const orderedTasks = [
        {
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 08:00')
        },
        {
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 18:00')
        },
        {
          startTime: moment('2018-04-11 08:00'),
          endTime: moment('2018-04-11 10:00')
        },
        {
          startTime: moment('2018-04-11 09:00'),
          endTime: moment('2018-04-11 11:00')
        }
      ]

      const sortedTasks = task
        .dateSort(orderedTasks)
        .map(task => task.startTime.format())
      const orderedTasksStartTime = orderedTasks.map(task =>
        task.startTime.format()
      )

      assert.sameOrderedMembers(sortedTasks, orderedTasksStartTime)
    })
  })

  describe('find optimum tasks', () => {
    it('return empty task if passed nothing', () => {
      const result = task.optimumTasksSubset()

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 0)
      assert.equal(result.highScore, 0)
    })

    it('return empty task if passed empty tasks list', () => {
      const result = task.optimumTasksSubset([], 0)

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 0)
      assert.equal(result.highScore, 0)
    })

    it('return the task if passed single task', () => {
      const tasks = [
        {
          name: 'Task A',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 04:00'),
          score: 100
        }
      ]
      const result = task.optimumTasksSubset(tasks, 100)

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 1)
      assert.equal(result.optimumTasks[0].name, 'Task A')
      assert.equal(result.highScore, 100)
    })

    it('return all tasks and total tasks score if no time collision', () => {
      const tasks = [
        {
          name: 'Task A',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 04:00'),
          score: 100
        },
        {
          name: 'Task B',
          startTime: moment('2018-04-11 05:00'),
          endTime: moment('2018-04-11 06:00'),
          score: 200
        },
        {
          name: 'Task C',
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 08:00'),
          score: 300
        },
        {
          name: 'Task D',
          startTime: moment('2018-04-11 09:00'),
          endTime: moment('2018-04-11 10:00'),
          score: 400
        }
      ]
      const result = task.optimumTasksSubset(tasks, 1000)

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 4)
      assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
        'Task A',
        'Task B',
        'Task C',
        'Task D'
      ])
      assert.equal(result.highScore, 1000)
    })

    it('return task with highest score if the all tasks time are collided', () => {
      const tasks = [
        {
          name: 'Task A',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 04:00'),
          score: 100
        },
        {
          name: 'Task B',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 06:00'),
          score: 200
        },
        {
          name: 'Task C',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 08:00'),
          score: 500
        },
        {
          name: 'Task D',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 10:00'),
          score: 400
        }
      ]
      const result = task.optimumTasksSubset(tasks, 1200)

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 1)
      assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
        'Task C'
      ])
      assert.equal(result.highScore, 500)
    })

    it('exclude task with lower score that listed first in time overlap case', () => {
      const tasks = [
        {
          name: 'Task A',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 04:00'),
          score: 100
        },
        {
          name: 'Task B',
          startTime: moment('2018-04-11 05:00'),
          endTime: moment('2018-04-11 06:00'),
          score: 200
        },
        {
          name: 'Task C',
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 08:00'),
          score: 300
        },
        {
          name: 'Task D',
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 10:00'),
          score: 400
        }
      ]
      const result = task.optimumTasksSubset(tasks, 1000)

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 3)
      assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
        'Task A',
        'Task B',
        'Task D'
      ])
      assert.equal(result.highScore, 700)
    })

    it('exclude task with lower score that listed later in time overlap case', () => {
      const tasks = [
        {
          name: 'Task A',
          startTime: moment('2018-04-11 03:00'),
          endTime: moment('2018-04-11 04:00'),
          score: 100
        },
        {
          name: 'Task B',
          startTime: moment('2018-04-11 05:00'),
          endTime: moment('2018-04-11 06:00'),
          score: 200
        },
        {
          name: 'Task C',
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 08:00'),
          score: 400
        },
        {
          name: 'Task D',
          startTime: moment('2018-04-11 07:00'),
          endTime: moment('2018-04-11 10:00'),
          score: 300
        }
      ]
      const result = task.optimumTasksSubset(tasks, 1000)

      assert.isArray(result.optimumTasks)
      assert.equal(result.optimumTasks.length, 3)
      assert.sameOrderedMembers(result.optimumTasks.map(task => task.name), [
        'Task A',
        'Task B',
        'Task C'
      ])
      assert.equal(result.highScore, 700)
    })
  })
})
