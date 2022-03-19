import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "./Button";
import DiaryCard from "./DiaryCard";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </Select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion, 10) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <Section>
      <MenuWrapper>
        <SortWrapper>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </SortWrapper>
        <NewBtnWrapper>
          <Button
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </NewBtnWrapper>
      </MenuWrapper>
      {getProcessedDiaryList().map((it) => (
        <DiaryCard key={it.id} {...it} />
      ))}
    </Section>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

const Section = styled.section``;

const Select = styled.select`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const SortWrapper = styled.div``;

const NewBtnWrapper = styled.div`
  flex-grow: 1;

  & > button {
    width: 100%;
  }
`;
