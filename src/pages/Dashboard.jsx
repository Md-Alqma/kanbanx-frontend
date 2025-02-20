import React, { useEffect } from "react";
import useBoardStore from "@/store/boardStore";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { fetchBoards, createBoard, deleteBoard, boards, loading } =
    useBoardStore();

  useEffect(() => {
    fetchBoards();
  }, []);

  const addBoard = async () => {
    const title = prompt("Enter board title");
    if (title) {
      await createBoard(title);
      fetchBoards();
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <h1 className="text-3xl font-bold ">Dashboard</h1>
      <div className="p-4">
        <Button
          onClick={addBoard}
          variant="outline"
          className="bg-green-500 text-white px-4 py-2 mb-4"
        >
          Add Board
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {boards?.map((board) => (
          <div key={board._id}>
            <p>{board.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
