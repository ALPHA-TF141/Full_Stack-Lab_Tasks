const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "studentdb"
})

db.connect(err => {
    if(err) throw err
    console.log("MySQL Connected")
})

app.post("/addStudent", (req,res)=>{

const {name,email,dob,department,phone} = req.body

const sql = "INSERT INTO students(name,email,dob,department,phone) VALUES (?,?,?,?,?)"

db.query(sql,[name,email,dob,department,phone],(err,result)=>{
    if(err) throw err
    res.send("Student Added")
})

})

app.get("/students",(req,res)=>{

db.query("SELECT * FROM students",(err,result)=>{
    if(err) throw err
    res.json(result)
})

})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})