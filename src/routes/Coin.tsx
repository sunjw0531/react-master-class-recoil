import { useParams } from 'react-router-dom';

function Coin() {
  //   const { coinId } = useParams<'coinId'>();
  // v6부터는 useParams 사용시 타입이 string 혹은 undefined
  const { coinId } = useParams();

  return <h1>Coin : {coinId}</h1>;
}
export default Coin;
