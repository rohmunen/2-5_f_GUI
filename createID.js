const pool = require('./index')

const alph = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!'
module.exports.createid = () => {
    let userId = ''
    for (var i = 0; i < 64; i++) {
        userId = userId + alph.charAt(Math.floor(Math.random() * alph.length))
    }
    while(pool.users.includes(userId)){
    userId = ''
        for (var i = 0; i < 64; i++) {
            userId = userId + alph.charAt(Math.floor(Math.random() * alph.length))
        }
    }
    return userId
}