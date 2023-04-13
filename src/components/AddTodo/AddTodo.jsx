import React, { useState } from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import classes from './AddTodo.module.css'
// [tllkdkdjdjdnvjjdfmcjd]

const AddTodo = ({ todo, setTodo }) => {

    const [value, setValue] = useState('')
    
    const saveTodo = (e) => {
        e.preventDefault();
        if (value){
            setTodo(
                [...todo, {
                    id: uuidv4(),
                    title: value,
                    status: true,
                }]
            )
            setValue('')
        }
        else alert("Введите название задачи")
    }

  return (
    <form className={classes.form}>
      <MyInput value={value} type="text" placeholder="Введите задачу" onChange={(e) => setValue(e.target.value)}/>

      <MyButton onClick={saveTodo}><FontAwesomeIcon icon={ faPlus }/></MyButton>
    </form>
  );
};

export default AddTodo;
