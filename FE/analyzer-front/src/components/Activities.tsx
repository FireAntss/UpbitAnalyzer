import { useFeedStore } from '@stores/feedStore';
import { useUserStore } from '@stores/UserStore';
import { formattedTimestamp } from '@utils/numbers';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ChatFill, HandThumbsUp } from 'react-bootstrap-icons';

const Activities = () => {
  const userStore = useUserStore();
  const feedList = useFeedStore((state) => state.FeedList);
  const setFeedList = useFeedStore((state) => state.setFeedList);
  const [myList, setMyList] = useState<any>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/board`);
        const sortedFeeds = response.data.sort((a: any, b: any) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        setFeedList(sortedFeeds);
      } catch (error) {
        console.error('피드를 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchFeeds();
  }, [setFeedList]);

  const filteredFeeds = feedList.filter((item: any) => item.writer === userStore.username);

  return (
    <div className="mypage_cont">
      <div className="page_title">
        <h4>Activities</h4>
      </div>
      <div className="page_cont">
        <div className="watchlist">
          {filteredFeeds ? (
            filteredFeeds.reverse().map((feed) => (
              <div className="activities_box">
                <div className="profile">
                  <img src={userStore.profile} alt={'profile'} />
                </div>
                <div className="feed_cont">
                  <div className="feed_info">
                    <span>{feed.writer}</span>
                    <span className="small text-secondary">{formattedTimestamp(feed.createDate)}</span>
                    <div className="like">
                      <HandThumbsUp className="bi" />
                      <span>{feed.like}</span>
                    </div>
                    <div className="comments">
                      <ChatFill />
                      <span>{feed.comment ? feed.comment.length : 0}</span>
                    </div>
                  </div>
                  <div className="feed_context">
                    {feed.content
                      .split('\n')
                      .map(
                        (
                          line:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined,
                          index: React.Key | null | undefined
                        ) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        )
                      )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="disconnected">
              <p>현재 Watchlist에 추가된 목록이 없습니다.</p>
              <i>
                <a href="/cryptocurrency" target="_self">
                  코인 목록 보기
                </a>
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
