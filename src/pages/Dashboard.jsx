import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoardStore from "@/store/boardStore";
import { Board } from "@/components/Board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const { fetchBoards, createBoard, boards, loading } = useBoardStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async () => {
    if (title.trim()) {
      await createBoard(title);
      fetchBoards();
      setTitle("");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Dashboard</h1>
      <div className="flex flex-col gap-2 mb-4">
        <Input
          type="text"
          className="border p-2 rounded"
          placeholder="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleCreateBoard}>Add Board</Button>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grd grid-cols-4 gap-4">
        {boards.map((board) => (
          <div
            key={board._id}
            className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/boards/${board._id}`)}
          >
            {board.title ? board.title : "Untitled"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
