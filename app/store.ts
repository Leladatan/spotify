import { Store } from "pullstate";

interface StoreProps {
  LikedSongs: any;
}

export const store = new Store<StoreProps>({
  LikedSongs: [],
});
