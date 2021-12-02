const jwt = require('jsonwebtoken')
const pool = require('../index')

const requireAuth = (req, res, next) => {
    const token = req.cookies.id
    console.log(pool.users)
    if (pool.users.includes(token)) {
        pool.current = pool.users.indexOf(token)
        console.log('CUUUUUUUUUREEEENT', pool.roles[pool.current])
        next();
    } else {
        res.redirect('/connect')
    }
}

module.exports = { requireAuth }