"use client";
import { useState } from 'react';

interface TodoItem {
  id: number;
  title: string;
  status: 'pending' | 'completed';
}

const TodoTable = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo: TodoItem = {
      id: Date.now(),
      title: inputValue,
      status: 'pending',
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' } : todo
      )
    );
  };
  
  const handleEditTodo = (id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleKeyDown = (id: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditId(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter todo..."
        className="rounded-md bg-colour-blue-200 p-2 mb-4 m-auto justify-between text-center hover:bg-blue-200 m-4"
      />
      <button onClick={handleAddTodo} className="bg-blue-500 text-white justify-between px-4 py-2 m-4 rounded-md hover:bg-green-500">
        Add Todo
      </button>
      <table className="rounded-lg justify-between w-full mt-4 table-auto m-2">
        <thead>
          <tr className="rounded-lg bg-gray-200 shadow-lg m-1">
            <th className="rounded-lg px-4 py-2">Todo</th>
            <th className="rounded-lg px-4 py-2">Status</th>
            <th className="rounded-lg px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td className="shadow-lg rounded-md px-4 py-2">
              {editId === todo.id ? (
                  <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(todo.id, e)}
                    onBlur={() => setEditId(null)}
                    className="shadow-lg rounded-md px-4 py-2"
                  />
                ) : (
                  <span>{todo.title}</span>
                )}
              </td>
              <td className="rounded-lg  px-4 py-2 shadow-lg text-center m-2">{todo.status}</td>
              <td className="rounded-lg  px-4 py-2 shadow-lg text-center text-between m-2 justify-center content-center flex flex-wrap gap-2 md:gap-4 lg:gap-6 xl:gap-8">
              {editId !== todo.id && (
                  <button onClick={() => setEditId(todo.id)} className="px-4 py-2 justify-between rounded-lg bg-yellow-500 content-center ">
                    Edit
                  </button>
                )}
                <button onClick={() => handleToggleStatus(todo.id)} className="px-4 py-2 justify-between rounded-lg bg-blue-300 content-center">
                  {todo.status === 'pending' ? 'Complete' : 'Undo'}
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)} className='px-4 py-2 rounded-lg bg-red-500'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
