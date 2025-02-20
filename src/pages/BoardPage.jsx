import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import useBoardStore from "@/store/boardStore";
import useListStore from "@/store/listStore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const BoardPage = () => {
  const { boardId } = useParams();
  const { singleBoard, loading, board } = useBoardStore();
  const { addList } = useListStore();

  useEffect(() => {
    if (boardId) {
      singleBoard(boardId);
    }
  }, [boardId]);

  const handleList = async (boardId) => {
    const title = prompt("Enter List Title");
    if (title) {
      await addList(boardId, title);
      singleBoard(boardId);
    }
  };
  if (loading) return <p>Loading...</p>;

  if (!board) return <p>No Board Found</p>;
  return (
    <div className="flex flex-col justify-center p-12 flex-nowrap">
      <h3 className="text-2xl font-black text-center">{board.title}</h3>
      {board.lists ? (
        <div className="flex mt-10 overflow-x-auto whitespace-nowrap hide-scrollbar gap-16">
          {board.lists.map((list) => (
            <List
              title={list.title}
              listId={list._id}
              boardId={boardId}
              className="w-full border border-black"
              key={list._id}
            >
              {list.title}
            </List>
          ))}
          <Button onClick={() => handleList(board._id)}>Add List</Button>
        </div>
      ) : (
        <p>No lists available</p>
      )}
    </div>
  );
};
