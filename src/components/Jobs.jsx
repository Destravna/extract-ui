/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';


const Jobs = () => {

  const [data, setData] = useState([]);

  const getJobs = async() => {
    const data = await axios({
      method : "GET",
      url : "http://localhost:4000/api/get-all-jobs"
    });
    console.log(data.data);
    setData(data.data)
  }

  useEffect(()=>{
    getJobs();
  }, [])

  return (
    <div  className="container mt-5">
      <h2>Extracts Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Extract ID</th>
            <th>Extract Name</th>
            <th>Extract Status</th>
            <th>file link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.jobId}>
              <td>{item.jobId}</td>
              <td>{item.extractId}</td>
              <td>{item.extractName}</td>
              <td>{item.extractStatus}</td>
              <td><a href={item.file} target="blank">{item.file}</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Jobs