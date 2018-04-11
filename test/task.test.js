const moment = require('moment')
const assert = require('chai').assert
const task = require('../task')

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

      sortedTasks = task
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

      sortedTasks = task
        .dateSort(orderedTasks)
        .map(task => task.startTime.format())
      orderedTasksStartTime = orderedTasks.map(task => task.startTime.format())

      assert.sameOrderedMembers(sortedTasks, orderedTasksStartTime)
    })
  })
})
