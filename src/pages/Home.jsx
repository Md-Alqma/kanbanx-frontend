import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import boardApi from "@/api/boardApi";
import { setBoards } from "@/redux/features/boardSlice";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateBoard = async () => {
    setLoading(true);
    try {
      const res = await boardApi.createBoard();
      dispatch(setBoards([res]));
      console.log(res);

      navigate(`/boards/${res._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button variant="outline" onClick={handleCreateBoard}>
        Click here to create your first board
      </Button>
    </div>
  );
};

export default Home;
