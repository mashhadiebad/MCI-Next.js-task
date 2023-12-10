import { create } from "zustand";

interface filterStore{
    filterData:{header:string; condition:string; value:string}[];
    setFilterList: (updatedFilterData:{header:string; condition:string; value:string}[]) => void;
}

const useFilterStore = create<filterStore>(set => ({
    filterData: [{header:'', condition:'', value:''}],
    setFilterList: (updatedFilterData:{header:string; condition:string; value:string}[]) => set(() => ({filterData:updatedFilterData})),
}))

export default useFilterStore;