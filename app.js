const parser = require('./parser')
const task = require('./task')

module.exports = {
  run (path = 'tasks.csv') {
    parser
      .parse(path)
      .then(({ tasks, totalScore }) => {
        const sortedTasks = task.dateSort(tasks)
        const result = task.optimumTasksSubset(sortedTasks, totalScore)

        console.log(result)
      })
      .catch(err => console.error(err))
  }
}
