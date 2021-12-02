const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const auth = require('./controller/authController')
const authcheck = require('./middleware/authMiddleware')
const client = require('./controller/clientController')
const report = require('./controller/reportController')
const task = require('./controller/taskController')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs')
app.set('views')

module.exports.userPool = [] 
module.exports.users = []
module.exports.names = []
module.exports.roles = []
module.exports.current = -1

app.get('/', async (req,res)=>{
    res.render('home', {role: this.roles[this.current]})
})
app.get('/done/:id', authcheck.requireAuth, task.done)
app.get('/notdone/:id', authcheck.requireAuth, task.notdone)
app.get('/delete/:id', authcheck.requireAuth, task.delete)
app.get('/createtask', authcheck.requireAuth, task.managerCreateTask_get)
app.post('/createTask', authcheck.requireAuth, task.managerCreateTask)
app.get('/tasks', authcheck.requireAuth, task.checkTasks)
app.get('/logout', authcheck.requireAuth, auth.logout)
app.get('/connect', auth.connect_get)
app.post('/connect', auth.connect)
app.get('/register', authcheck.requireAuth, auth.registerEmployee_get)
app.post('/register', authcheck.requireAuth, auth.registerEmployee)
app.get('/report', authcheck.requireAuth, report.createReport_get)
app.post('/report', authcheck.requireAuth, report.createReport)
app.get('/client', authcheck.requireAuth, client.client_get)
app.post('/client', authcheck.requireAuth, client.findClient)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log("server is listening"))

