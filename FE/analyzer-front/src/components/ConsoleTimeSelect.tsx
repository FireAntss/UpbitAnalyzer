import React, { useEffect, useState } from 'react';
import { AlignMiddle, CaretDownFill, Fullscreen, GraphUp } from 'react-bootstrap-icons';

const ConsoelTimeSelect = () => {
  const [time, setTime] = useState('1일');
  const handleTime = (e: any) => {
    setTime(e.target.innerText);
  };

  const [taList, setTaList] = useState<any>([]);
  const [selectedTaList, setSelectedTaList] = useState<any>([]);

  const handleCheck = (e: any) => {
    const option = e.target.id;
    if (e.target.checked) {
      // Add selected option
      setTaList((prevList: any) => [...prevList, option]);
      setSelectedTaList((prevSelectedList: any) => [...prevSelectedList, option]);
    } else {
      // Remove selected option
      setTaList((prevList: any[]) => prevList.filter((item) => item !== option));
      setSelectedTaList((prevSelectedList: any[]) => prevSelectedList.filter((item) => item !== option));
    }
  };

  return (
    <div className="console_selects">
      <div className="dropdown-group">
        <div className="dropdown">
          <button
            id="timeDropdown"
            className="btn dropdwon-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="time_state">{time}</span>
            <CaretDownFill />
          </button>
          <ul className="dropdown-menu" aria-labelledby="timeDropdown">
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                1일
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                1주
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                한 달
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                1m
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                3m
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                5m
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                5m
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                10m
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                15m
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={handleTime}>
                5m
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            id="taDropdown"
            className="btn dropdwon-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="ta_state">지표</span>
            <CaretDownFill />
          </button>
          <ul className="ta-dropdown dropdown-menu" aria-labelledby="taDropdown">
            {selectedTaList.map((el: any) => (
              <li className="ta-list ta-checked" key={el}>
                <input type="checkbox" checked={true} id={el} onChange={handleCheck} />
                <label className="dropdown-item" htmlFor={el}>
                  {el}
                </label>
              </li>
            ))}
            <li className="ta-list unch">
              <input type="checkbox" checked={taList.includes('MA12')} id="MA12" onChange={handleCheck} />
              <label className="dropdown-item" htmlFor="MA12">
                MA12
              </label>
            </li>
            <li className="ta-list unch">
              <input type="checkbox" checked={taList.includes('MA26')} id="MA26" onChange={handleCheck} />
              <label className="dropdown-item" htmlFor="MA26">
                MA26
              </label>
            </li>
            <li className="ta-list unch">
              <input type="checkbox" checked={taList.includes('BB')} id="BB" onChange={handleCheck} />
              <label className="dropdown-item" htmlFor="BB">
                BB
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div className="toggleGraph">
        <button>
          <AlignMiddle />
        </button>
        <button>
          <GraphUp />
        </button>
      </div>

      <div className="fullscreen">
        <button>
          <Fullscreen />
        </button>
      </div>
    </div>
  );
};

export default ConsoelTimeSelect;
