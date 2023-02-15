import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export enum Categories {
  // 'name' 만 선언하면 그 값은 숫자값 형태로 됨.
  // 따라서 Categories.'TO_DO' 형태는 0으로 인식됨.
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
  effects_UNSTABLE: [persistAtom],
});

interface ICategories {
  category: string;
}

export const categoriesState = atom<ICategories[]>({
  key: 'categories',
  default: [{ category: 'TO_DO' }, { category: 'DOING' }, { category: 'DONE' }],
  effects_UNSTABLE: [persistAtom],
});
