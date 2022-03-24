import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `새 일기 작성`;
  }, []);
  return (
    <main>
      <DiaryEditor />
    </main>
  );
};

export default New;
