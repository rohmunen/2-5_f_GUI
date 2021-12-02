const pool = require('../index')

module.exports.managerCreateTask_get = async (req, res) => {
    res.render('create_task', {role: pool.roles[pool.current],   MSG: ''})
    }

module.exports.managerCreateTask = async (req, res) => {
    let queryString = ''
    if (req.body.task_serial_number == '' || req.body.task_contract_number == ''){
        queryString = 'SELECT managerCreateTask(\'' + req.body.task_name + '\',\'' + req.body.task_executor + '\',\'' + req.body.task_expires + '\',\'' + req.body.task_priority + '\',\'' + req.body.task_client_id + '\')'
    } else {
        queryString = 'SELECT managerCreateTask(\'' + req.body.task_name + '\',\'' + req.body.task_executor + '\',\'' + req.body.task_expires + '\',\'' + req.body.task_priority + '\',\'' + req.body.task_client_id + '\',\'' + req.body.task_contract_number + '\',\'' + req.body.task_serial_number + '\')'
    }
    pool.userPool[pool.current].query(queryString, (err, result) => {
        if (err) {
            res.redirect('/')
            return console.error('Error executing query', err.stack)
        } else {
            res.send('ok')
        }
    })}

module.exports.checkTasks = async(req,res) => {
    if (pool.roles[pool.current] === 'admin' || pool.roles[pool.current] === 'manager'){
        pool.userPool[pool.current].query('SELECT managerCheckTasks()', (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.render('tasks', {tasks: result.rows, role: pool.roles[pool.current], username: pool.names[pool.current]})
            })
    } else {
        pool.userPool[pool.current].query('SELECT checkTasks()', (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.render('tasks', {tasks: result.rows, role: pool.roles[pool.current], username: pool.names[pool.current]})
            })
    }
}

module.exports.done = async (req, res) => {
    let id = req.originalUrl.split(':')[1]
    pool.userPool[pool.current].query('SELECT markasdone(' + id + ')', (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.redirect('/tasks')
})}

module.exports.notdone = async (req, res) => {
    let id = req.originalUrl.split(':')[1]
    pool.userPool[pool.current].query('SELECT markasnotdone(' + id + ')', (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.redirect('/tasks')
})}

module.exports.delete = async (req, res) => {
    let id = req.originalUrl.split(':')[1]
    pool.userPool[pool.current].query('SELECT deletetask(' + id + ')', (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.redirect('/tasks')
})}