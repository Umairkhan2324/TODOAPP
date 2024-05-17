import  TodoTable from "./components/TodoTable";

const Home = () => {
  return (
    <div className="flex flex-col container mx-auto mt-8 px-5 py-5 justify-between text-center relative">
      <h1 className="text-4xl font-bold mb-4 align-center justify-between text-center">Todo List</h1>
      <TodoTable />
    </div>
  );
};

export default Home;
