import styled from "styled-components";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "No.1 Diary",
    date: 1647560205926,
  },
  {
    id: 2,
    emotion: 2,
    content: "No.2 Diary",
    date: 1647560205925,
  },
  {
    id: 3,
    emotion: 3,
    content: "No.3 Diary",
    date: 1647560205924,
  },
  {
    id: 4,
    emotion: 4,
    content: "No.4 Diary",
    date: 1647560205923,
  },
  {
    id: 5,
    emotion: 5,
    content: "No.5 Diary",
    date: 1647560205922,
  },
  {
    id: 6,
    emotion: 5,
    content: "No.6 Diary",
    date: 1650560205921,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <AppWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </AppWrapper>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

const AppWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Yeon+Sung&display=swap");

  font-family: "Nanum Pen Script", cursive;
  font-family: "Yeon Sung", cursive;

  @media screen and (min-width: 650px) {
    width: 640px;
  }
  @media screen and (max-width: 650px) {
    width: 90vw;
  }

  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
`;
