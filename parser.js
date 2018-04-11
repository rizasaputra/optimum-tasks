const csv = require('fast-csv')
const moment = require('moment')

module.exports = {
  /**
   * Parse and validate a CSV file
   * Each row must have task name, start time, end time, task weight
   * Start time and end time must be valid ISO 8601 date string, and end time must be after start time
   * Invalid rows will be skipped
   * @param {string} path
   * @returns {object} list of valid tasks and total score of all tasks
   */
  parse (path) {
    return new Promise((resolve, reject) => {
      const tasks = []
      let totalScore = 0

      csv
        .fromPath(path)
        .on('data', data => {
          if (data.length === 4) {
            const startTime = moment(data[1])
            const endTime = moment(data[2])

            if (
              startTime.isValid() &&
              endTime.isValid() &&
              startTime < endTime
            ) {
              const score = parseInt(data[3], 10)
              totalScore += score

              tasks.push({
                name: data[0],
                startTime,
                endTime,
                score
              })
            }
          }
        })
        .on('end', () => {
          console.log('done')
          resolve({
            tasks,
            totalScore
          })
        })
    })
  }
}
