const pool = require('../index')

module.exports.createReport = async (req,res) => {
  pool.userPool[pool.current].query('SELECT * FROM generateReport(\'' + req.body.username+'\',' + 
  '\'' + req.body.start_date + '\',' + '\'' + req.body.end_date 
  +'\') as x(kind TEXT, count INT);', (err, result) => {
    if (err) {
      res.render('report', {report: result.rows,MSG: 'Something went wrong', role: pool.roles[pool.current]})
      return console.error('Error executing query', err.stack)
    }
    res.render('report', {report: result.rows,role: pool.roles[pool.current], MSG: 'report created'})
  })
    pool.userPool[pool.current].query('SELECT createReport(\'' + req.body.username+'\','+ '\'' 
    + req.body.start_date + '\','+ '\'' + req.body.end_date +'\');', (err, result) => {
      if (err) {
        res.render('report', {MSG: 'Something went wrong', role: pool.roles[pool.current]})
        return console.error('Error executing query', err.stack)
      }
      res.render('report', {report: [], role: pool.roles[pool.current], MSG: 'report created'})
    })
  }
  
  module.exports.createReport_get = async (req, res) => {
    res.render('report', {report: [], role: pool.roles[pool.current], MSG: ''})
  }