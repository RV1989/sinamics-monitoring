import React from "react";
import styled from "styled-components";

const Body = styled.div`
  height: 30px;
  width: 25px;
  background-color: #2a3d4a;
  margin-left: auto;
  margin-right: 0;
`;

const BodyEmpty = styled.div`
  height: 30px;
  width: 25px;
  background-color: #fff;
  margin-left: auto;
  margin-right: 0;
`;
const CardActive = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: auto;
  background-color: var(--green);
  opacity: 0.7;
  z-index: 99;
`;

export default function MemoryCard({ memoryCard }) {
  const activeCard = () => {
    return memoryCard.memoryCardActivated ? <CardActive /> : <div></div>;
  };
  if (memoryCard) {
    if (memoryCard.memoryCardInserted) {
      return <Body inserted={true}>{activeCard()}</Body>;
    }
  }

  return <BodyEmpty />;
}
