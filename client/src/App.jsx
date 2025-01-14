import { useEffect, useState } from "react";

import axios from "axios";
import './App.css';



function App() {

  const [students, setStudents] = useState([]);
  const [filteredUsers, setFilterusers] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [studentData, setStudentData] = useState({name: "", age:"", city:""});

  const getAllStudents = async () => {
    await axios.get("http://localhost:8000/students").then
    ((res) => {
      setStudents(res.data);
      setFilterusers(res.data);
    });
  };

  
useEffect(()=> {
    getAllStudents();
},[]);
 
//seaarch function

const handleSearchChange=(e)=>{
  const searchText = e.target.value.toLowerCase();
  const filteredUsers = students.filter((user)=>
    user.name.toLowerCase().includes(searchText) || 
    user.city.toLowerCase().includes(searchText));
    setFilterusers(filteredUsers);
}

//Delete function

const handleDelete= async(id)=> {
  const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  if(isConfirmed){
  await axios.delete(`http://localhost:8000/students/${id}`).
    then((res)=> {
    setStudents(res.data);
    setFilterusers(res.data);
    });
  }
}

//Close Modal for closing the update || delete record div

const closeModal = ()=> 
{
  setisModalOpen(false);
  getAllStudents();
};


//Add Student Details

const handleAddRecord = ()=> {
  setStudentData({name: "", age:"", city:""});
  setisModalOpen(true);
}
const handleData = (e)=>{
  setStudentData({...studentData,[e.target.name]:e.target.value})
}

// add submit data

// const handleSubmit =async (e)=> {
//   e.preventDefault();
//   if(studentData.id){
//     await axios.patch(`http://localhost:8000/students/
//     // ${studentData.id}`,studentData).then((res) => {
//         console.log(res);
//       });
//   }else{
//   await axios.post("http://localhost:8000/students",
//     studentData).then((res) => {
//       console.log(res);
//     });
//   }
//   closeModal();
//   setStudentData({name: "", age:"", city:""});
// };

// Updated handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      if (studentData.id) {
          await axios.patch(`http://localhost:8000/students/${studentData.id}`, studentData);
      } else {
          await axios.post("http://localhost:8000/students", studentData);
      }
      closeModal();
      getAllStudents();
  } catch (error) {
      console.error("Error saving student data:", error);
  }
};



//update student functon
const handleUpdateRecord = (students) => {
  setStudentData(students);
  setisModalOpen(true);
}


return (
<>
<div>
 <div  className="container">
   <h3>CRUD Application with React.js Frontend and Node.js backend</h3>
      <div  className="input-search">
          <input  type="search" placeholder="Search text here" onChange={handleSearchChange}/>
          <button className="btn green" onClick=
          {handleAddRecord}>Add Record</button>
          </div>
          <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
         </thead>
         <tbody>
         {  
              filteredUsers && 
              filteredUsers.map((students,index)=>{
              return (
              <tr key={students.id}>
                  <td>{index + 1}</td>
                  <td>{students.name}</td>
                  <td>{students.age}</td>
                  <td>{students.city}</td>
                  <td>
                  <button className="btn green" onClick={
                    ()=>handleUpdateRecord(students)}>
                      Edit</button>
                  </td>
                  <td> 
                    <button className="btn red" onClick={
                      ()=>handleDelete(students.id)}>
                        Delete
                </button>
                </td>
              </tr>
            );
            })}     
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
             <h2>{studentData.id ? "Update Record" : "Add Record"}</h2>
             <div className="input-group"> 
              <label htmlFor="name">Full Name</label>
              <input type="text" value={studentData.name} name="name" id="name" onChange={handleData}/>
             </div>
             <div className="input-group"> 
              <label htmlFor="age">Age</label>
              <input type="number" value={studentData.age} name="age" id="age" onChange={handleData}/>
             </div>
             <div className="input-group"> 
              <label htmlFor="city">City</label>
              <input type="text" value={studentData.city} name="city" id="city" onChange={handleData}/>
             </div>
             <button className="btn green" onClick={handleSubmit}>{studentData.id ? "Update Student" : "Add Student"}</button>
            </div>
            </div>
        )}
        </div>
      </div>
    </>
  );
}

export default App;
