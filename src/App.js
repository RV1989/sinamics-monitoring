import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Drive from "./drive";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const H1 = styled.h1`
  color: white;
  text-align: center;
`;

const App = () => {
  const [drives, setDrives] = useState([]);
  const getDrives = async () => {
    try {
      const d = await axios.get("api");
      //console.log(d.data);
      setDrives(d.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDrives();
    const interval = setInterval(() => getDrives(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <H1>Siemens Drives info</H1>
      <br />
      <Grid>
        {drives.map((drive) => (
          <Drive key={drive.id} drive={drive} />
        ))}
      </Grid>
    </div>
  );
};

export default App;
