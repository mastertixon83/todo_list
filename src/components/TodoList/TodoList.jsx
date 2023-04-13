import React, { useEffect, useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrash,
  faPenToSquare,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./TodoList.module.css";

const TodoList = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState(todo)
  const [selectedOption, setSelectedOption] = useState('all');

  useEffect( () => {
    setFiltered(todo)

  }, [todo])

    const todoFilter = () => {
        let status = event.target.value

        setSelectedOption(status);

        if (status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo = [...todo].filter(item => (status === "true" ? item.status === true: item.status === false));
            setFiltered(newTodo)
        }
        
        
    }

  const deleteTodo = (id) => {
    let newTodo = [...todo].filter((item) => item.id != id);
    setTodo(newTodo);
  };

  const statusTodo = (id) => {
    let newTodo = [...todo].filter((item) => {
      if (item.id == id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newTodo);
  };

  const editTodo = (id, title) => {
    setEdit(id);
    setValue(title);
  };

  const saveTodo = (id) => {
    let newTodo = [...todo].map((item) => {
      if (item.id == id) {
        item.title = value;
      }
      return item;
    });
    setTodo(newTodo);

    setEdit(null);
  };

  return (
    <div>
    <div style={{marginTop: 10}}>
        <label>
      <input style={{cursor: "pointer"}} type="radio" name="radio" value="all"
      checked={selectedOption === 'all' ? true : false}
      onChange={todoFilter} />
      <span style={{marginLeft: 10, cursor: "pointer"}}>Все</span>
      </label>

        <label>
      <input  type="radio" name="radio" value="true"
      checked={selectedOption === "true" ? true : false}
      onChange={todoFilter} style={{marginLeft: 10, cursor: "pointer"}}/>
      <span style={{marginLeft: 10, cursor: "pointer"}}>Открытые</span>
      </label>

        <label>
      <input  type="radio" name="radio" value="false"
      checked={selectedOption === "false" ? true : false}
      onChange={todoFilter} style={{marginLeft: 10, cursor: "pointer"}}/>
      <span style={{marginLeft: 10, cursor: "pointer"}}>Закрытые</span>
      </label>
   </div>
        


      {filtered.map((item) => (
        <div key={item.id} className={classes.listItems}>
          {edit == item.id ? (
            <div>
              <MyInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></MyInput>
            </div>
          ) : (
            <div
              style={{ textDecoration: item.status ? "none" : "line-through" }}
            >
              {item.title}
            </div>
          )}

          {edit == item.id ? (
            <div>
              <MyButton onClick={() => saveTodo(item.id)}>
                <FontAwesomeIcon icon={faSave} />
              </MyButton>
            </div>
          ) : (
            <div>
              <MyButton onClick={() => deleteTodo(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </MyButton>
              <MyButton onClick={() => editTodo(item.id, item.title)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </MyButton>
              <MyButton onClick={() => statusTodo(item.id)}>
                {item.status ? (
                  <FontAwesomeIcon icon={faLockOpen} />
                ) : (
                  <FontAwesomeIcon icon={faLock} />
                )}
              </MyButton>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
