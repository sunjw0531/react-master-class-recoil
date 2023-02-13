import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                const obj = {
                  x: new Date(price.time_close * 1000).toISOString(),
                  y: [price.open, price.high, price.low, price.close],
                };
                return obj;
              }) as [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: { show: false },
            },
            xaxis: {
              type: 'datetime',
              labels: {
                show: false,
              },
            },
            yaxis: {
              tooltip: {
                enabled: false,
              },
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
