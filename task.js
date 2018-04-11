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
  }
}
