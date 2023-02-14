import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import Todo from './ToDo';

function TodoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
