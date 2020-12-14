import moment from "moment";
import React from "react";
import styled from "styled-components";
import MemoryCard from "./MemoryCard";

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: -20px -20px 0px 0px rgba(255, 255, 255, 0.3);
  margin: 30px;
  padding: 15px;
  ratio: 1.618;
  @media print {
    
    min-height: 12cm;
    padding: 0;
    margin 0;
    margin-top:5cm;
  }
`;
const DriveName = styled.h2`
  text-align: center;
  padding: 0;
  margin: 0;
`;
const DriveIp = styled.h2`
  font-size: 0.85rem;
  text-align: center;
  padding: 0;
  opacity: 0.5;
  margin: 0;
`;

const DriveStatus = styled.h2`
  font-size: 0.7rem;
  text-align: center;
  padding: 0;
  opacity: 0.5;
  margin: 0.3em;
`;

const CardHeader = styled.div`
  margin-bottom: 2em;
  text-align: left;
`;
const Parameter = styled.li`
  font-weight: normal;
  text-align: justify;
  margin: 0.3em;
`;
const Ul = styled.ul`
  list-style-type: none;
`;

const ConnectionStatus = styled.hr`
  height: 5px;
  border: 0;
  background-color: var(${(props) => (props.connected ? "--green" : "--red")});
  opacity: 0.5;
  margin: 0.7em;
`;
const Time = styled.p`
  float: left;
  font-size: 0.85rem;
  text-align: left;
  padding: 0;
  opacity: 0.5;
  margin: 0.5em;
`;

export default function Drive({ drive }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <Time>{moment(drive.lastUpdated).fromNow()}</Time>
          <MemoryCard
            memoryCard={
              drive.parameters.filter(
                (x) => x.name === "r9401 memory card inserted"
              )?.[0]?.formattedValue
            }
          />
          <DriveName>{drive.name}</DriveName>
          <DriveIp>{drive.ip}</DriveIp>

          <DriveStatus>
            {
              drive.parameters.filter(
                (x) => x.name === `r2 driveOperationDisplay`
              )?.[0]?.formattedValue
            }
          </DriveStatus>
          <ConnectionStatus connected={drive.available} />
        </CardHeader>

        <Ul>
          {drive.parameters
            .filter(
              (x) =>
                x.name !== `r2 driveOperationDisplay` &&
                x.name !== "r9401 memory card inserted"
            )
            .map((para, index) => {
              return (
                <Parameter key={index}>
                  {" "}
                  {`${para.prettyText}: ${para.formattedValue.toFixed(2)} ${
                    para.unit ? para.unit : ""
                  }`}
                </Parameter>
              );
            })}
        </Ul>
      </Card>
    </div>
  );
}
