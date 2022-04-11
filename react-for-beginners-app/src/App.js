import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setConins] = useState([]);
  const [changeCoin, setChangeCoin] = useState('');
  const [selectCoin, setSelectCoin] = useState('');
  const [usd, setUsd] = useState('');
  const onChangeUsd = (event) => setUsd(event.target.value);
  const onChangeCoin = (event) => setSelectCoin(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();

    setChangeCoin(Math.round((usd / selectCoin) * 10000) / 10000);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setConins(json);
        setLoading(false);
      });
  }, []);
  // console.log(coins);
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChangeUsd}
              value={usd}
              type="text"
              placeholder="Write USD"
            />
            <select value={selectCoin} onChange={onChangeCoin}>
              <option value="">Select one</option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <button>확인</button>
          </form>
          <hr />
          <input type="text" value={changeCoin} onChange={setChangeCoin} />
        </div>
      )}
    </div>
  );
}

export default App;
