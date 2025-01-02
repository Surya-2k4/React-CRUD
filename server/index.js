const express = require("express");
const students = require("./sample.json");
const cors = require("cors");

const app = express();
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

app.listen(port,(err)=> {
    console.log(`App is running in port ${port}`);
});