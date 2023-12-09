import { create } from "zustand";

interface PageStore{
    page:number;
    setPage: (pageNumber:number) => void;
}

const usePageStore = create<PageStore>(set => ({
    page: 1,
    setPage: (pageNumber:number) => set(() => ({page:pageNumber})),
}))

export default usePageStore;