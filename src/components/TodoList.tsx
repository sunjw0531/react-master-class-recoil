import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState, categoryState, toDoSelector } from '../atoms';
import CreateCategory from './CreateCategory';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const categories = useRecoilValue(categoriesState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((category) => {
          return (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          );
        })}
      </select>
      <CreateCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default TodoList;
