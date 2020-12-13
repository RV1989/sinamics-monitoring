import React from "react";
import styled from "styled-components";

const Body = styled.div`
  height: 30px;
  width: 25px;
  background-color:#2a3d4a}

  margin-left: auto;
  margin-right: 0;
`;

const BodyEmpty = styled.div`
  height: 30px;
  width: 25px;
  background-color:#FFF}

  margin-left: auto;
  margin-right: 0;
`;

export default function MemoryCard({ memoryCard }) {
  if (memoryCard) {
    if (memoryCard.memoryCardInserted) {
      return <Body inserted={true} />;
    }
  }

  return <BodyEmpty />;
}
