import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, categoryState, IToDo, toDoState } from '../atoms';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const pickedCategory = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text: text, id: id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <>
      <li key={id}>
        <span>{text}</span>
        {categories.map((thisCategory) => {
          if (thisCategory.category !== pickedCategory) {
            return (
              <button
                key={thisCategory.category}
                name={thisCategory.category}
                onClick={onClick}
              >
                {thisCategory.category}
              </button>
            );
          }
          return null;
        })}
      </li>
    </>
  );
}

export default ToDo;
