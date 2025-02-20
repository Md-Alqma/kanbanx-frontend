import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useBoardStore from "@/store/boardStore";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Board = ({ title, boardId }) => {
  const navigate = useNavigate();
  const handleBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };
  return (
    <Card onClick={() => handleBoard(boardId)} className="w-48 text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter className="justify-center">
        <ArrowRightIcon />
      </CardFooter>
    </Card>
  );
};
