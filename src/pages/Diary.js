import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Diary</h1>
      <p>This is for detail diary</p>
    </div>
  );
};

export default Diary;
