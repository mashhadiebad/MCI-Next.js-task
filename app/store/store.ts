import { create } from "zustand";

interface ThemeStore {
    theme:string;
    setDark: () => void;
    setLight: () => void;
}

const useThemeStore = create<ThemeStore>(set => ({
    theme: 'light',
    setDark: () => set(() => ({theme:'dark'})),
    setLight: () => set(() => ({theme:'light'}))
}))

interface PageStore{
    page:number;
}

const usePageStore = create<PageStore>(set => ({
    page: 1,
    setPage: (pageNumber:number) => set(() => ({page:pageNumber})),
}))

export default useThemeStore;