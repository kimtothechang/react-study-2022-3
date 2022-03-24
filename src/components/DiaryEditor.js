import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import Header from "./Header";
import Button from "./Button";
import EmotionCard from "./EmotionCard";
import { DiaryDispatchContext } from "../App";

import { getStringDate } from "../utils/date";
import { emotionList } from "../utils/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmotion = useCallback((emotion) => {
    console.log("use setEmotion");
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    console.log("use handleSubmit");
    console.log(content.length);
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

  const handleRemove = () => {
    console.log("use onRemove");
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  const goBack = () => {
    console.log("use goBack");
    return navigate(-1);
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date, 10))));
      setEmotion(originData.emotion);
      setContent(originData.content);
      console.log("use useEffect is Edit True");
    }
  }, [isEdit, originData]);

  return (
    <Section>
      <Header
        headText={isEdit ? "일기 수정하기 " : "새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
        rightChild={
          isEdit && (
            <Button
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <Div>
          <DateWrapper>
            <H4>오늘은 언제인가요?</H4>
            <div>
              <DateInput
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </div>
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
          <div>
            <TextArea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"오늘은 어떤 하루였나요"}
            ></TextArea>
          </div>
        </Div>
        <Div>
          <ControlWrapper>
            <Button text={"취소하기"} onClick={goBack} />
            <Button
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </ControlWrapper>
        </Div>
      </div>
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
