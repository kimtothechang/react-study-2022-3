import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import Button from "./Button";

const DiaryCard = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <Article>
      <ImgWrapper bg={emotion} onClick={goDetail}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </ImgWrapper>
      <ContentWrapper onClick={goDetail}>
        <CreatedAt>{strDate}</CreatedAt>
        <Preview>{content.slice(0, 25)}</Preview>
      </ContentWrapper>
      <EditBtnWrapper>
        <Button text={"수정하기"} onClick={goEdit} />
      </EditBtnWrapper>
    </Article>
  );
};

export default React.memo(DiaryCard);

const Article = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e2e2;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;

  background-color: ${(props) => {
    switch (props.bg) {
      case 1: {
        return "#64c964";
      }
      case 2: {
        return "#9dd772";
      }
      case 3: {
        return "#fece17";
      }
      case 4: {
        return "#fe8446";
      }
      case 5: {
        return "#fe565f";
      }
    }
  }};

  & > img {
    width: 50%;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
`;

const CreatedAt = styled.p`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
`;

const Preview = styled.p`
  font-size: 18px;
`;

const EditBtnWrapper = styled.div`
  min-width: 70px;
`;
