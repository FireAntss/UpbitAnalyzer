import React, { ChangeEvent, useEffect, useState } from 'react';
import { debounce } from '@utils/debounce';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

const SearchBox = ({ coinList }: { coinList: any[] }) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  const searchCoins = debounce(() => {
    if (query.length > 2) {
      const filteredCoins = coinList?.filter((coin) => {
        const { korean_name, english_name, symbol } = coin;
        const searchQuery = query.toLowerCase();
        return (
          korean_name.toLowerCase().includes(searchQuery) ||
          english_name.toLowerCase().includes(searchQuery) ||
          symbol.toLowerCase().includes(searchQuery)
        );
      });
      // Remove duplicates based on korean_name and english_name
      const uniqueCoins = filteredCoins
        ? Array.from(new Set(filteredCoins.map((coin) => `${coin.korean_name}-${coin.english_name}`)))
            .map((key) => filteredCoins.find((coin) => `${coin.korean_name}-${coin.english_name}` === key))
            .filter((coin) => coin !== undefined)
        : [];
      setCoins(uniqueCoins);
    } else {
      setCoins([]);
    }
  }, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    searchCoins();
  };

  const navigate = useNavigate();
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (coins.length > 0) {
      const lowerCaseMarket = coins[0].market.toLocaleLowerCase();
      navigate(`/cryptocurrency/${lowerCaseMarket}`);
    }
  };

  useEffect(() => {
    if (coinList && query.length > 2) {
      searchCoins();
    }
  }, [coinList, query, searchCoins]);

  return (
    <>
      <form className="d-flex align-items-center" role="search" onSubmit={handleSearchSubmit}>
        <input
          className="form-control me-2"
          value={query}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleInputChange}
        />
        <button className="btn btn-outline-success align-items-center" type="submit">
          <Search />
        </button>
        {coins.length > 0 && (
          <ul>
            {coins.map((coin, i) => (
              <li key={i}>
                <Link to={`/cryptocurrency/${coin.market.toLocaleLowerCase()}`}>
                  <span>{coin.market}</span>
                  <img src={coin.symbol} alt="" width={15} />
                  <span>{coin.korean_name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

export default SearchBox;
