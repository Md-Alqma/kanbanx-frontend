import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import boardApi from "@/api/boardApi";
import { setBoards } from "@/redux/features/boardSlice";
import { BookIcon, BriefcaseIcon, DeleteIcon, TrashIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Kanban from "@/components/common/Kanban";
let timer;
const timeout = 500;
const Board = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lists, setLists] = useState([]);
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boards = useSelector((state) => state.board.value);
  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getSingleBoard(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setLists(res.lists);
      } catch (error) {
        console.error(error);
      }
    };
    getBoard();
  }, [boardId]);

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    dispatch(setBoards(temp));

    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoard(boardId, { title: newTitle });
      } catch (error) {
        console.error(error);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoard(boardId, { description: newDescription });
      } catch (error) {
        console.error(error);
      }
    }, timeout);
  };

  const deleteBoard = async () => {
    try {
      await boardApi.deleteBoard(boardId);

      const newList = boards.filter((e) => e.id !== boardId);
      if (newList.length === 0) {
        navigate("/boards");
      } else {
        navigate(`/boards/${newList[0].id}`);
      }
      dispatch(setBoards(newList));
    } catch (error) {}
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <BookIcon />
        <button>
          <TrashIcon />
        </button>
        {console.log(boardId)}
      </div>
      <div className="px-12 py-2">
        <div>
          <BriefcaseIcon />
          <Input
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            className="w-full text-3xl font-bold border"
          />
          <Textarea
            value={description}
            onChange={updateDescription}
            placeholder="Add a description"
            variant="outline"
          />
        </div>
        <div>
          <Kanban data={lists} boardId={boardId} />
        </div>
      </div>
    </>
  );
};

export default Board;
