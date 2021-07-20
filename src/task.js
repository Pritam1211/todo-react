import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DisplayList from './displaylist';

const Task = ({user, logout}) => {
    const [todos, setTodos] = useState(user.tasks || []);
    const [editTodo, setEditTodo] = useState(null);
    const [todo, setTodo] = useState('');

    useEffect(()=>{
        editTodo===null ? setTodo('') : setTodo(editTodo.title);
    }, [editTodo]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users'));
        for( var i=0; i< users.length; i++){
            if(users[i].name === user.name){
                users[i].tasks = todos;
                break;
            }
        }
        localStorage.setItem('users', JSON.stringify(users));
      }, [todos]);

    const handleTodo = event =>{
        setTodo(event.target.value);
    }

    const handleAdd = () => {
        if(!editTodo){
            setTodos([...todos, {id: uuidv4(), title: todo, completed: false}]);
            setTodo("");
          } else {
            for( var i=0; i< todos.length; i++){
                if(todos[i].id === editTodo.id){
                    todos[i].title = todo;
                    break;
                }
            }
            setTodos(todos);
            setEditTodo(null);
        }  
    }

    return (
        <div className='login'>
            <div className='header'>
                <h1>Todo App</h1>
                <button className="button-delete task-button" style={{position: 'absolute', right: '36%'}} onClick={logout} >
                    <i className='fa fa-sign-out'/>
                </button>
            </div>
            <div>
                <input
                    placeholder = 'What to Add'
                    className = 'task-input' 
                    type = 'text'
                    value =  {todo}
                    onChange = {handleTodo}
                />
                <button className='button-add' onClick={handleAdd} > 
                    { editTodo ? 'OK' : 'ADD' }
                </button>
            </div>
            <div>
                <DisplayList todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
            </div>
        </div>
    )

};

export default Task;