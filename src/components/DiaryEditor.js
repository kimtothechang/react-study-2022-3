import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import Header from "./Header";
import Button from "./Button";
import EmotionCard from "./EmotionCard";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date, 10))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <Section>
      <Div>
        <Header
          headText={isEdit ? "일기 수정하기 " : "새 일기 쓰기"}
          leftChild={
            <Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
        />
        <DateWrapper>
          <H4>오늘은 언제인가요?</H4>
          <DateInput
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </DateWrapper>
      </Div>
      <Div>
        <H4>오늘의 감정</H4>
        <EmotionWrapper>
          {emotionList.map((it) => (
            <EmotionCard
              key={it.emotion_id}
              {...it}
              onClick={handleClickEmotion}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </EmotionWrapper>
      </Div>
      <Div>
        <H4>오늘의 일기</H4>
        <TextArea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={"오늘은 어떤 하루였나요"}
        ></TextArea>
      </Div>
      <Div>
        <ControlWrapper>
          <Button text={"취소하기"} onClick={() => navigate(-1)} />
          <Button
            text={"작성완료"}
            type={"positive"}
            onClick={() => handleSubmit()}
          />
        </ControlWrapper>
      </Div>
    </Section>
  );
};

export default DiaryEditor;

const Section = styled.section``;

const Div = styled.div`
  margin-bottom: 40px;
`;

const H4 = styled.h4`
  font-size: 22px;
  font-weight: bold;
  margin: 20px 0px;
`;

const DateWrapper = styled.section``;

const DateInput = styled.input`
  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding: 10px 20px 10px 20px;
  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 20px;
`;

// Emotion
const EmotionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
`;

// Text
const TextArea = styled.textarea`
  font-family: "Nanum Pen Script";
  font-size: 20px;

  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  resize: vertical;

  border: none;
  border-radius: 5px;
  background-color: #ececec;

  padding: 20px;
`;

// Control
const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
