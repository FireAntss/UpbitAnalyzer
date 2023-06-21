import { useUserStore } from '@stores/UserStore';
import GuestSvg from '../assets/GuestAvater';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFeedStore } from '@stores/feedStore';
import FeedCard from '@components/FeedCard';

const Community = () => {
  const userStore = useUserStore();
  const feedList = useFeedStore((state) => state.FeedList);
  const setFeedList = useFeedStore((state) => state.setFeedList);
  const [visibleFeeds, setVisibleFeeds] = useState(10);
  const [content, setContent] = useState('');

  const addFeed = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const request = await axios.post('http://localhost:8080/board', {
        content: content,
        writer: userStore.isAuthenticated ? userStore.username : 'Guest',
        createDate: new Date().toISOString(),
        comment: 0,
        like: 0
      });
      // 게시물 등록 성공
      console.log('게시물 등록 성공:', request.data);
      setContent('');
      fetchFeeds();
    } catch (error) {
      console.error('게시물 등록 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    const isAtBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (isAtBottom) {
      setVisibleFeeds((preVisibleFeeds) => preVisibleFeeds + 5);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/board`);
      const sortedFeeds = response.data.sort((a: any, b: any) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });

      setFeedList(sortedFeeds);
    } catch (error) {
      console.error('피드를 불러오는 중 오류가 발생했습니다:', error);
    }
  }, [setFeedList]);

  const visibleFeedList = feedList ? feedList.slice(0, visibleFeeds) : [];

  return (
    <div className="community container-sm mt-3">
      <div className="newFeed">
        <div className="card-header">
          <form className="d-flex flex-column" onSubmit={addFeed}>
            <div className="list-group d-grid gap-2">
              <label htmlFor="" className="from-control">
                {userStore.isAuthenticated ? (
                  <div className="d-flex align-middle gap-2">
                    <img src={userStore.profile} alt="" width={32} />
                    <span>{userStore.username}</span>
                  </div>
                ) : (
                  <div className="d-flex align-middle gap-2">
                    <div>
                      <GuestSvg />
                    </div>
                    <span>Guest</span>
                  </div>
                )}
              </label>
              <textarea
                className="form-control"
                placeholder="무슨 일이 일어나고 있나요?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                cols={30}
              />

              <div className="text-end ">
                <button type="submit" className={content === '' ? 'btn btn-primary disabled' : 'btn btn-primary'}>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="feedlist" style={{ overflow: 'auto' }}>
        {visibleFeedList?.reverse().map((feed) => (
          <FeedCard feed={feed} />
        ))}
      </div>
    </div>
  );
};
export default Community;
