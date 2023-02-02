import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface RouteState {
  name: string;
}

function Coin() {
  //   const { coinId } = useParams<'coinId'>();
  // v6부터는 useParams 사용시 타입이 string 혹은 undefined
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location.state as RouteState;
  console.log(state);
  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading..'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
