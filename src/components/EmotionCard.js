import styled from "styled-components";

const EmotionCard = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <Wrapper
      onClick={() => onClick(emotion_id)}
      isSelected={isSelected}
      emotionId={emotion_id}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </Wrapper>
  );
};

export default EmotionCard;

const Wrapper = styled.div`
  cursor: pointer;

  border-radius: 5px;
  padding: 20px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > img {
    width: 50%;
    margin-bottom: 10px;
  }

  & > span {
    font-size: 18px;
  }

  background-color: ${(props) => {
    if (!props.isSelected) {
      return "#ececec";
    } else {
      switch (props.emotionId) {
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
    }
  }};
  color: ${(props) => {
    if (props.isSelected) {
      return "#fff";
    } else {
      return "#000";
    }
  }};
`;
