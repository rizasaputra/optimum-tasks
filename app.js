const parser = require('./parser')

parser
  .parse('tasks.csv')
  .then(tasks => {
    console.log(tasks)
  })
  .catch(err => console.error(err))
