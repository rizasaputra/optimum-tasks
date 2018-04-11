const app = require('./app')

app.run().then(result => {
  console.log(
    `Found optimum tasks subset has high score with high score ${
      result.highScore
    }`
  )

  result.optimumTasks.forEach(task => {
    console.log(
      `${
        task.name
      } from ${task.startTime.format()} to ${task.endTime.format()} with score ${
        task.score
      }`
    )
  })
})
