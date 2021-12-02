const pool = require('../index')

module.exports.findClient = async (req, res) => {
    let queryString = ''
    if (req.body.selection == 'Find client by name') {
        queryString = 'SELECT findClientByName(\'' + req.body.value + '\');'
    } else {
        queryString = 'SELECT findClientByCity(\'' + req.body.value + '\');'
    }
    pool.userPool[pool.current].query(queryString, (err, result) => {
        if (err) {
            res.render('error', {error: err, role: pool.roles[pool.current]})
            return console.error('Error executing query', err.stack)
        } else {
            res.render('clients', {clients: result.rows, role: pool.roles[pool.current]})
        }
    })
}

module.exports.client_get = async (req, res) => {
    res.render('clients', {clients: [], role: pool.roles[pool.current]})
}