import { formattedTimestamp } from '@utils/numbers';
import GuestSvg from '../assets/GuestAvater';
import React, { useCallback, useEffect, useState } from 'react';
import { ChatFill, HandThumbsUp } from 'react-bootstrap-icons';
import axios from 'axios';

const FeedCard = ({ feed }: { feed: any }) => {
  const [userList, setUserList] = useState<any>([]);
  const matchUsers = useCallback(async () => {
    try {
      const getUsers = await axios.get(`http://localhost:8080/user`);
      console.log('getUsers', getUsers.data); // 응답 데이터 확인

      setUserList(getUsers.data);
    } catch (error) {
      console.error('피드를 불러오는 중 오류가 발생했습니다:', error);
    }
  }, [setUserList]);

  useEffect(() => {
    matchUsers();
    console.log(userList);
  }, []);

  const user = userList.find((user: any) => user.username === feed.writer);
  const avatar = user ? user.avatar : '';

  return (
    <div className="feed">
      <div className="feed_witer_info">
        {feed.writer === 'Guest' ? (
          <div className="profile">
            <GuestSvg />
          </div>
        ) : (
          <div className="profile">
            <img src={avatar} alt={'avatar'} />
          </div>
        )}
        <span>{feed.writer}</span>
        <span className="small text-secondary">{formattedTimestamp(feed.createDate)}</span>
      </div>
      <div className="feed_cont" key={feed.id}>
        <div>
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
      <div className="feed_info">
        <div className="like">
          <HandThumbsUp className="bi" />
          <span>{feed.like}</span>
        </div>
        <div className="comments">
          <ChatFill />
          <span>{feed.comment ? feed.comment.length : 0}</span>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
