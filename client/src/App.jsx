import { useEffect, useState } from "react";

import axios from "axios";
import './App.css';



function App() {

  const [students, setStudents] = useState([]);

  const getAllStudents = async () => {
    await axios.get("http://localhost:8000/students").then
    ((res) => {
      setStudents(res.data);
    });
  };

  
  useEffect(()=> {
    getAllStudents();
  },[]);

  return (
    <>
    <div>
        <div className="container">
          <h3>CRUD Application with React.js Frontend and Node.js backend</h3>
          <div className="input-search">
            <input type="search" placeholder="Search text here"/>
            <button className='btn green'>Add Record</button>
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
            {students && 
            students.map((students,index)=>{
              return (
                <tr key={students.id}>
                  <td>{index + 1}</td>
                  <td>{students.name}</td>
                  <td>{students.age}</td>
                  <td>{students.city}</td>
                  <td>
                    <table className="btn green">Edit</table>
                  </td>
                  <td>
                    <table className="btn red">Delete</table>
                  </td>
                </tr>
              )
            })}
           
          </tbody>
          </table>
        </div>
    </div>
    </>
  )
}

export default App
