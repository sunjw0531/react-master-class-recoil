import { categoriesState } from '../atoms';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
interface INewCategory {
  newCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<INewCategory>();
  const setCategories = useSetRecoilState(categoriesState);
  const onSubmit = ({ newCategory }: INewCategory) => {
    setCategories((prev) => [{ category: newCategory }, ...prev]);
    setValue('newCategory', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('newCategory')}
          placeholder="Add Category what you want"
        />
        <AddBtn>Add</AddBtn>
      </form>
    </>
  );
}

export default CreateCategory;

const AddBtn = styled.button`
  background-color: tomato;
  border-color: yellow;
`;
