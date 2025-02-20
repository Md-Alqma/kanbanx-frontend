import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-10 p-16">
        <h1 className="text-4xl font-black">KanbanX</h1>
        <Button>Get Started</Button>
      </div>
    </>
  );
}

export default App;
