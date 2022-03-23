import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DiaryStateContext } from "../App";

import Button from "../components/Button";
import Header from "../components/Header";

import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <Loading>로딩 중입니다.</Loading>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <DiaryMain>
        <Header
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <Button
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <DiarySection>
          <H4>오늘의 감정</H4>
          <ImgWrapper bg={data.emotion}>
            <img src={curEmotionData.emotion_img} />
            <p>{curEmotionData.emotion_descript}</p>
          </ImgWrapper>
          <ContentWrapper>
            <H4>오늘의 일기</H4>
            <ContentBox>
              <Content>{data.content}</Content>
            </ContentBox>
          </ContentWrapper>
        </DiarySection>
      </DiaryMain>
    );
  }
};

export default Diary;

const Loading = styled.div``;

const DiaryMain = styled.main`
  font-family: "Nanum Pen Script";
`;

const DiarySection = styled.section`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const H4 = styled.h4`
  font-size: 22px;
  font-weight: bold;
`;

const ImgWrapper = styled.div`
  background-color: #ececec;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  & > p {
    font-size: 25px;
    color: white;
  }

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
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Content = styled.p`
  padding: 20px;
  text-align: left;
  font-size: 20px;
  font-family: "Yeon SUng";
  line-height: 1.5;
`;
