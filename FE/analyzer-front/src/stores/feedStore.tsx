import create, { SetState } from 'zustand';

type feedStore = {
  FeedList: any[];
  setFeedList: (FeedList: any[]) => void;
};

export const useFeedStore = create<feedStore>((set: SetState<feedStore>) => ({
  FeedList: [],
  setFeedList: (newFeedList: any[]): void => set((state) => ({ ...state, FeedList: newFeedList }))
}));
