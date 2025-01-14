const express = require("express");
const students = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json()); //setting middleware for handling data's
const port = 8000;
app.use(
    cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
}
));


//Display All Students
app.get("/students",(req,res)=> {
    return res.json(students);
});

//Delete Student detail

app.delete("/students/:id",(req,res) => {
    let id = Number(req.params.id);
    let filteredUsers = students.filter((students)=> students.id != id )
    fs.writeFile("./sample.json",JSON.stringify
        (filteredUsers),(err,data)=>{
        return res.json(filteredUsers);
    });
});

// //add New Student

// app.post("/students",(req,res)=>{
//     let {name,age,city} = req.body;
//     if(!name || !age || !city){
//             res.status(400).send({message : " All Fields Required"});
//     }
//     let id = Date.now();
//     students.push({id,name,age,city});

//     fs.writeFile("./sample.json",JSON.stringify
//         (students),(err,data)=>{
//         return res.json(students);
//     });

// });


// //Update Student

// app.patch("/students/:id",(req,res)=>{
//     let id = Number(req.params.id);
//     let {name,age,city} = req.body;
//     if(!name || !age || !city){
//             res.status(400).send({message : " All Fields Required"});
//     }
//     let index=students.findIndex((students)=> students.id==id);

//     students.splice(index,1,{...req.body});

//     fs.writeFile("./sample.json",JSON.stringify(students),
//     (err,data)=>{
//         return res.json({message: "Student detail updates sucess"});
//     });

// });

// Updated POST /students
app.post("/students", (req, res) => {
    let { name, age, city } = req.body;
    if (!name || !age || !city) {
        return res.status(400).send({ message: "All Fields Required" });
    }
    let id = Date.now();
    students.push({ id, name, age, city });

    fs.writeFile("./sample.json", JSON.stringify(students), (err) => {
        if (err) {
            return res.status(500).send({ message: "Error saving data" });
        }
        return res.json(students);
    });
});

// Updated PATCH /students/:id
app.patch("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let { name, age, city } = req.body;

    if (!name || !age || !city) {
        return res.status(400).send({ message: "All Fields Required" });
    }

    let index = students.findIndex((student) => student.id === id);
    if (index === -1) {
        return res.status(404).send({ message: "Student not found" });
    }

    students[index] = { ...students[index], name, age, city };

    fs.writeFile("./sample.json", JSON.stringify(students), (err) => {
        if (err) {
            return res.status(500).send({ message: "Error saving data" });
        }
        return res.json(students);
    });
});


app.listen(port,(err)=> {
    console.log(`App is running in port ${port}`);
});