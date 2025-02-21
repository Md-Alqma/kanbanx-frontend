import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import useBoardStore from "@/store/boardStore";
import useListStore from "@/store/listStore";
import { Input } from "@/components/ui/input";

export const BoardPage = () => {
  const [title, setTitle] = useState("");
  const { singleBoard, loading, board } = useBoardStore();
  const { addList, fetchLists, lists } = useListStore();
  const { boardId } = useParams();

  useEffect(() => {
    if (boardId) {
      fetchLists(boardId);
    }
  }, [boardId]);

  const handleAddList = async () => {
    if (title.trim()) {
      await addList(boardId, title);
      singleBoard(boardId);
      setTitle("");
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h1 className="text-2xl font-bold mb-4">{board?.title}</h1>
      )}

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          className="border p-2 rounded"
          placeholder="List title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleAddList}>Add List</Button>
      </div>

      <div className="flex gap-4">
        {lists?.map((list) => (
          <List key={list._id} list={list} />
        ))}
      </div>
    </div>
  );
};
