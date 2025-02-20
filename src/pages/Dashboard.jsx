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
    <main className="flex items-start mt-10">
      <div className="flex flex-col gap-4 p-8 border border-gray-300 min-h-full">
        <h3 className="text-2xl font-black">Boards</h3>
        <Button className="bg-green-500" onClick={addBoard}>
          Add Board
        </Button>

        {boards?.map((board) => (
          <Board key={board._id} title={board.title} />
        ))}
      </div>
      <div className="flex-1 p-8 text-center">
        <h3 className="text-2xl font-black">Your Board</h3>
      </div>
    </main>
  );
};

export default Dashboard;
