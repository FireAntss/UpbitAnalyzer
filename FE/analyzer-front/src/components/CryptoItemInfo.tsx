import React, { useEffect, useState } from 'react';
import { useCoinStore } from '@stores/CoinStore';
import { useParams } from 'react-router-dom';
import { setNumComma } from '@utils/numbers';
import { coinApi } from '@utils/API';
import { BoxArrowUpRight, PersonFill, Twitter } from 'react-bootstrap-icons';

const CryptoItemInfo = () => {
  const { coin } = useParams<{ coin: string }>();
  const coinList = useCoinStore((state) => state.coinList);
  const [coinInfo, setCoinInfo] = useState<any[any]>();
  const coinItem = coinList.find((i) => i.market == coin);

  useEffect(() => {
    const fetchCoinInfo = async () => {
      try {
        const coinInfoApi = await coinApi.getCoinInfo(coinItem.english_name.toLowerCase().replace(' ', '-'));
        const updateCoinInfo = coinInfoApi.data;
        setCoinInfo(updateCoinInfo);
      } catch (error) {
        console.error('Failed Fetching Coin Info', error);
      }
    };
    fetchCoinInfo();
    console.log(coinInfo);
  }, [coinItem.market]);

  return (
    <div className="current_coin">
      {coinItem ? (
        <div className="info_box">
          <div className="name_box">
            <div className="coin_symbol_box">
              <div className="coin_symbol">
                <img
                  className="symbol"
                  src={coinItem.symbol}
                  alt={coinItem.market.split('-')[1].toLowerCase() + '_symbol'}
                />
              </div>
            </div>
            <div className="coin_name">
              <div className="main_name">
                <span>{coinItem.korean_name}</span>
                <span>{coinItem.english_name}</span>
              </div>
              <span>{coinItem.market.split('-')[1] + '/' + coinItem.market.split('-')[0]}</span>
            </div>
          </div>

          <div className="current_price">
            <span>₩{setNumComma(coinItem.trade_price)}</span>
            <div
              className={`badge ${
                coinItem.change === 'RISE' ? 'bg-up' : coinItem.change === 'FALL' ? 'bg-down' : 'bg-even'
              }`}
            >
              {(coinItem.signed_change_rate * 100).toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {coinInfo ? (
        <div className="detail_info_box">
          <div className="detail_blocks">
            <div className="category_block">
              {coinInfo.categories
                ? coinInfo.categories.map((data: any) => {
                    return (
                      <div className="badge">
                        <span>{data}</span>
                      </div>
                    );
                  })
                : null}
            </div>

            <div className="link_block">
              {coinInfo.links.hompage ? (
                <div className="badge">
                  <div className="badge_wrapper">
                    <BoxArrowUpRight />
                    <span>{coinInfo.links.hompage?.[0]}</span>
                  </div>
                </div>
              ) : null}

              {coinInfo.links.official_forum_url ? (
                <div className="badge">
                  <div className="badge_wrapper">
                    <BoxArrowUpRight />
                    <span>{coinInfo.links.official_forum_url?.[0]}</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="detail_block">
              <div className="badge">
                <div className="badge_wrapper">
                  <div className="icon">
                    <span>Followers</span>
                    <Twitter />
                  </div>
                  <span>
                    {coinInfo.community_data.twitter_followers ? coinInfo.community_data.twitter_followers : null}
                  </span>
                </div>
              </div>
              <div className="badge">
                <div className="badge_wrapper">
                  <div className="icon">
                    <span>Community Score</span>
                    <PersonFill />
                  </div>
                  <span>{coinInfo.community_score ? coinInfo.community_score : null}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="desc_box">
            <div className="coin_desc hasShadow">
              <div className="coin_desc_content">{coinInfo.description.ko}</div>
            </div>
            <div className="read_more">
              <span>더보기</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CryptoItemInfo;
