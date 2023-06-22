import { formattedTimestamp } from '@utils/numbers';
import GuestSvg from '../assets/GuestAvater';
import React, { useCallback, useEffect, useState } from 'react';
import { ChatFill, HandThumbsUp } from 'react-bootstrap-icons';
import axios from 'axios';
import { useUserStore } from '@stores/UserStore';

const FeedCard = ({ feed }: { feed: any }) => {
  return (
    <div className="feed">
      <div className="feed_witer_info">
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
        <div className="comments">
          <ChatFill />
          <span>{feed.comment ? feed.comment.length : 0}</span>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
