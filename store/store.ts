import {Store} from "pullstate";

interface StoreType {
    volume: string;
}

const store = new Store<StoreType>({
    volume: localStorage.volume ? localStorage.volume : "1",
});

export default store;
