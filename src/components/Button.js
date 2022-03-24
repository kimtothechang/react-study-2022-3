import styled from "styled-components";
import React from "react";

const Button = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <MyButton onClick={onClick} type={type}>
      {text}
    </MyButton>
  );
};

Button.defaultProps = {
  type: "default",
};

export default React.memo(Button);

const MyButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding: 10px 20px 10px 20px;

  font-size: 18px;

  white-space: nowrap;
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");
  font-family: "Nanum Pen Script";

  background-color: ${(props) => {
    switch (props.type) {
      case "positive":
        return "green";
      case "negative":
        return "#fd565f";
      default:
        return "#ececec";
    }
  }};

  color: ${(props) => {
    switch (props.type) {
      case "positive":
        return "white";
      case "negative":
        return "white";
      default:
        return "black";
    }
  }};
`;
