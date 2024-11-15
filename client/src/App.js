import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ENDPOINT + '/todos')
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    const addTodo = () => {
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/todos', { task: newTask })
            .then(response => setTodos([...todos, response.data]))
            .then(() => setNewTask(''))
            .catch(error => console.error(error));
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
