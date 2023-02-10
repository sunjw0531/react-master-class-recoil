import { fetchCoinTickers } from '../api';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useState } from 'react';

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}
interface IMode {
  mode: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(['price', coinId], () =>
    fetchCoinTickers(coinId)
  );
  const [mode, setMode] = useState<string>('mode1');

  return (
    <>
      <ModeSelector>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setMode(e.target.value)
          }
        >
          <option value="mode1">Show Price history</option>
          <option value="mode2">Show More</option>
        </select>
      </ModeSelector>
      <Container>
        {mode === 'mode1' ? (
          <>
            <CoinPriceList>
              <p>Price : {data?.quotes.USD.price}</p>
              <li>
                Changes in 15 M : {data?.quotes.USD.percent_change_15m}
                {Math.sign(data?.quotes.USD.percent_change_15m!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 30 M: {data?.quotes.USD.percent_change_30m}
                {Math.sign(data?.quotes.USD.percent_change_30m!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 1 Hours : {data?.quotes.USD.percent_change_1h}
                {Math.sign(data?.quotes.USD.percent_change_1h!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 6 Hours : {data?.quotes.USD.percent_change_6h}
                {Math.sign(data?.quotes.USD.percent_change_6h!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 12 Hours : {data?.quotes.USD.percent_change_12h}
                {Math.sign(data?.quotes.USD.percent_change_12h!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
            </CoinPriceList>
            <CoinPriceList>
              <p>Last Updated : {data?.last_updated}</p>
              <li>
                Changes in 24 Hours : {data?.quotes.USD.percent_change_24h}
                {Math.sign(data?.quotes.USD.percent_change_24h!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 7 Day : {data?.quotes.USD.percent_change_7d}
                {Math.sign(data?.quotes.USD.percent_change_7d!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 30 Day : {data?.quotes.USD.percent_change_30d}
                {Math.sign(data?.quotes.USD.percent_change_30d!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 24H : {data?.quotes.USD.percent_change_24h}
                {Math.sign(data?.quotes.USD.percent_change_24h!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
              <li>
                Changes in 1H : {data?.quotes.USD.percent_change_1h}
                {Math.sign(data?.quotes.USD.percent_change_1h!) === -1
                  ? '🔻'
                  : '🔼'}
              </li>
            </CoinPriceList>
          </>
        ) : (
          <CoinInfo>
            <li>ATH Price : {data?.quotes.USD.ath_price}</li>
            <li>ATH Date : {data?.quotes.USD.ath_date}</li>
            <li>
              Compare ATH and Now : {data?.quotes.USD.percent_from_price_ath}
              {Math.sign(data?.quotes.USD.percent_from_price_ath!) === -1
                ? '🔻'
                : '🔼'}
            </li>
            <li>Trade volume in 24 H : {data?.quotes.USD.volume_24h}</li>
            <li>Market Capitalization : {data?.quotes.USD.market_cap}</li>
          </CoinInfo>
        )}
      </Container>
    </>
  );
}
export default Price;

const ModeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

const CoinPriceList = styled.ul`
  li {
    margin-top: 15px;
  }
  p {
    color: ${(props) => props.theme.accentColor};
    margin: 15px 0 40px 0;
  }
`;

const CoinInfo = styled(CoinPriceList)``;
