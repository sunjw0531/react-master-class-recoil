import styled, { keyframes } from 'styled-components';

function App() {
  return (
    <Wrapper>
      <Box>
        <TextTag>%%%%</TextTag>
      </Box>
      <TextTag>!!!!</TextTag>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vh;
  justify-content: center;
  align-items: center;
`;

const rotateAni = keyframes`
  0%{
    transform:rotate(0deg);
    border-radius : 0px;
  }
  50%{
    border-radius : 100px;
  }
  100%{
    transform : rotate(360deg);
    border-radius : 0px;
  }
`;

const TextTag = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  display: flex;
  background-color: tomato;
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
  animation: ${rotateAni} 1s linear infinite;
  ${TextTag}:hover {
    font-size: 90px;
  }
`;
