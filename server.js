const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
require("dotenv").config()
const { router, routerRange } = require('./routes/workoutRouter')
const app = express()

mongoose.connect(`mongodb+srv://nathan:password1234@cluster0.dfgvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(()=> {
    console.log('my database is running')
}).catch((err)=> {
    console.log(err)
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use('/', router);
app.use('/', routerRange);

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'))
})

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/stats.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})
