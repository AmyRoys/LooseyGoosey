import axios from "axios";

import { useState, useEffect } from "react";
const apiurl = "https://7je6jjr9ka.execute-api.us-east-1.amazonaws.com/Beta/";

interface PlantData {
  soilMoisture: number;
  lightIntensity: number;
  temperature: number;
}

async function getPlantData(): Promise<PlantData[]> {
  try {
    const response = await axios.get(apiurl);
    console.log("Success");
    return response.data;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}

function DataContent() {
  const [plantData, setPlantData] = useState<PlantData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlantData();
      setPlantData(data);
    };
    fetchData();
  }, []);

  const data = plantData.map((plant) => ({
    soilMoisture: plant.soilMoisture,
    lightIntensity: plant.lightIntensity,
    temperature: plant.temperature,
  }));
  console.log("data:", data);
  return (
    <table className="table">
      <thead>
        <tr>
          <th> Time Stamp</th>
          <th> Soil Moisture</th>
          <th> Light Intensity</th>
          <th> Temperature</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.soilMoisture}</td>
            <td>{item.lightIntensity}</td>
            <td>{item.temperature}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataContent;
