const bcrypt = require('bcrypt')
const db = require('../db')
const pool = require('../index')
const id = require('../createID')


module.exports.connect_get = async (req,res) => {
    res.render('auth', {role: pool.roles[pool.current]})
}

module.exports.connect = async (req,res) => {
    let hash
    const authPool = await db.connectDB('auth', 'auth').then((value) => {
        return value
    })
    hash = await authPool.query('SELECT getHash(\'' + req.body.username+'\');').then(res =>{
        authPool.release()
        return res.rows[0].gethash
    }).catch(e => {
        console.error(e.stack)
    })
    const validPassword = await bcrypt.compare(req.body.password, hash).catch(e => console.error(e.stack));
    if (validPassword) {
        userPool = await db.connectDB(req.body.username, req.body.password).then((value)=> {
            return value
        })
        pool.userPool.push(userPool)
        const userID = id.createid()
        const role = await userPool.query('SELECT whoami();').then(res => {
            return res.rows[0].whoami.split(',')[1].split(')')[0]
        })
        pool.users.push(userID)
        pool.roles.push(role)
        pool.names.push(req.body.username)
        pool.current = pool.users.length
        res.cookie('id', userID, {httpOnly: true})
        res.render('home', {role: role})
    } else {
        res.send('PASSWORD NOT VALID')
    }
}

module.exports.logout = async (req, res) => {
    console.log(pool.userPool[pool.current])
    pool.userPool[pool.current].release()
    pool.userPool.splice(pool.current, 1)
    pool.users.splice(pool.current, 1)
    pool.roles.splice(pool.current, 1)
    pool.names.splice(pool.current, 1)
    pool.current = -1
    res.redirect('/')
}

module.exports.registerEmployee_get = async (req, res) => {
    res.render('register', {MSG:'', role: pool.roles[pool.current]})
}

module.exports.registerEmployee = async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    hashed = await bcrypt.hash(req.body.password, salt);
    pool.userPool[pool.current].query('SELECT createEmployee(\'' + req.body.username+'\','+
     '\'' + req.body.position+'\','+ '\'' + req.body.password + '\',' + 
     '\'' +hashed +'\');', (err, result) => {
        if (err) {
          res.render('register', {MSG: 'Something went wrong', role: pool.roles[pool.current]})
          return console.error('Error executing query', err.stack)
        }
        res.send('ok')
      })
}