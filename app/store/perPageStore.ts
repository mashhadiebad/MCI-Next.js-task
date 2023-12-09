import { create } from "zustand";

interface perPageStore{
    perPage:number;
    setPerPage: (perPageNumber:number) => void;
}

const usePerPageStore = create<perPageStore>(set => ({
    perPage: 6,
    setPerPage: (perPageNumber:number) => set(() => ({perPage:perPageNumber})),
}))

export default usePerPageStore;