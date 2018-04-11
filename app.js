const parser = require('./parser')
const task = require('./task')

module.exports = {
  run (path = 'tasks.csv') {
    return parser
      .parse(path)
      .then(({ tasks, totalScore }) => {
        const sortedTasks = task.dateSort(tasks)
        const result = task.optimumTasksSubset(sortedTasks, totalScore)

        // console.log(result)
        return result
      })
      .catch(err => console.error(err))
  }
}
