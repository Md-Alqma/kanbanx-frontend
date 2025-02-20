import React, { useEffect } from "react";
import useBoardStore from "@/store/boardStore";
import { Board } from "@/components/Board";
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col gap-4 justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-2">
        <h3 className="text-2xl font-black">Dashboard</h3>
        <Button>Add Board</Button>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-4 cursor-pointer">
        {boards?.map((board) => (
          <Board key={board._id} title={board.title} boardId={board._id} />
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
