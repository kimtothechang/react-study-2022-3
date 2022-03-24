import styled from "styled-components";
import React from "react";

const Header = React.memo(({ headText, leftChild, rightChild }) => {
  return (
    <MyHeader>
      <SrOnly>일기장</SrOnly>
      <LeftBtn>{leftChild}</LeftBtn>
      <Title>{headText}</Title>
      <RightBtn>{rightChild}</RightBtn>
    </MyHeader>
  );
});

export default Header;

const MyHeader = styled.header`
  padding: 20px 0px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;

  & > div {
    display: flex;
  }
`;

const Title = styled.div`
  width: 50%;
  font-size: 25px;
  justify-content: center;
  font-family: "Nanum Pen Script";
`;

const LeftBtn = styled.div`
  width: 25%;
  justify-content: start;

  & > button {
    font-family: "Nanum Pen Script";
  }
`;

const RightBtn = styled.div`
  width: 25%;
  justify-content: end;

  & > button {
    font-family: "Nanum Pen Script";
  }
`;

const SrOnly = styled.h1`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  clip: rect(0, 0, 0, 0);
`;
