import axios from "axios";
import {Table} from 'react-bootstrap';
import '../styles/Data.css';

import { useState, useEffect } from "react";
const apiurl = "https://7je6jjr9ka.execute-api.us-east-1.amazonaws.com/Beta/";

async function getPlantData(): Promise<any[]> {
    try {
      const response = await axios.get(apiurl);
      console.log("Success");
      const data = JSON.parse (response.data.body);
      console.log( data);
      return data;
    } catch (error) {
      console.log("Error", error);
      return [];
    }
  }
  
  function DataContent() {
    const [data, setData] = useState<any[]>([]);
  
    useEffect(() => {
      getPlantData().then(setData);
    }, []);
  
    return (
      <Table className="myTable" striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Light Value</th>
            <th>Soil Value</th>
            <th>Temp Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.TimeStamp}</td>
              <td>{item.lightValue}</td>
              <td>{item.soilValue}</td>
              <td>{item.tempValue}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

export default DataContent;
