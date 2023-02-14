import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text: text, id: id, category: name };
      return oldToDos;
    });
  };
  return (
    <>
      <li>
        <span>{text}</span>
        {category !== 'TO_DO' && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category !== 'DOING' && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== 'DONE' && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </>
  );
}

export default ToDo;
