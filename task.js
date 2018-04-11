module.exports = {
  /**
   * Sort tasks based on startTime property ascending
   * startTime must be a Moment object
   * TODO: add validation
   * @param {array} tasks
   */
  dateSort (tasks) {
    tasks.sort((previous, current) => {
      const previousTime = previous.startTime
      const currentTime = current.startTime

      if (previousTime.isBefore(currentTime)) return -1
      if (previousTime.isSame(currentTime)) return 0

      return 1
    })

    return tasks
  },

  /**
   * Find optimum tasks subset from an ordered tasks
   * @param {array} tasks
   * @param {integer} totalScore
   */
  optimumTasksSubset (tasks = [], totalScore = 0) {
    let optimumTasks = []
    let highScore = 0
    let remainingTasksMaxScore = totalScore

    while (tasks.length > 0 && remainingTasksMaxScore > highScore) {
      const baseTask = tasks.shift()

      const baseTaskCompatibles = tasks.reduce(
        (result, currentTask, idx, arr) => {
          const previousTask = idx === 0 ? baseTask : arr[idx - 1]

          // no overlap
          if (previousTask.endTime < currentTask.startTime) {
            result.score += currentTask.score
            result.nonOverlapTasks.push(currentTask)
          } else {
            if (previousTask.score < currentTask.score) {
              result.score += currentTask.score - previousTask.score
              result.nonOverlapTasks.pop()
              result.nonOverlapTasks.push(currentTask)
            }
          }

          return result
        },
        {
          score: baseTask.score,
          nonOverlapTasks: [baseTask]
        }
      )

      if (baseTaskCompatibles.score > highScore) {
        highScore = baseTaskCompatibles.score
        optimumTasks = baseTaskCompatibles.nonOverlapTasks
      }

      remainingTasksMaxScore -= baseTask.score
    }

    return { optimumTasks, highScore }
  }
}
