"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./Main.module.css";
import Pagination from "../Pagination/Pagination";
import usePerPageStore from "@/app/store/perPageStore";
import usePageStore from "@/app/store/pageStore";
import FilterModal from "../FilterModal/FilterModal";
import useFilterStore from "@/app/store/filterStore";

interface Props {
  userData: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }[];
}
type list = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

const Main = ({ userData }: Props) => {
  const [listData, setListData] = useState<list[]>();
  const [totalPageNumber, setTotalPageNumber] = useState<number>(2);
  const { page, setPage } = usePageStore();
  const { perPage, setPerPage } = usePerPageStore();
  const { filterData } = useFilterStore();
  const [filteredData, setFilteredData] = useState<list[]>([]);

  const handlePerPageInput = (event: any) => {
    if (!event.target.value || Number(event.target.value <= 0)) {
      setPerPage(6);
      event.target.value = "";
    } else {
      setPerPage(Number(event.target.value));
    }
  };

  const handleChangePerPage = () => {
    const totalPageNumber = Math.ceil(filteredData.length / perPage);
    setPage(1);
    setTotalPageNumber(totalPageNumber);
    let filteredList: list[] = filteredData.slice(
      (page - 1) * perPage,
      page * perPage
    );
    setListData(filteredList);
  };

  const handleChangePage = () => {
    const totalPageNumber = Math.ceil(filteredData.length / perPage);
    setTotalPageNumber(totalPageNumber);
    let filteredList: list[] = filteredData.slice(
      (page - 1) * perPage,
      page * perPage
    );
    setListData(filteredList);
  };

  const handleChangeFilter = () => {
    let newList = filterData.reduce((result, filter) => {
      const { header, condition, value } = filter;

      return result.filter((item) => {
        const headerValue = item[header];

        switch (condition) {
          case "==":
            return headerValue == value;
          case "<":
            return headerValue < value;
          case ">":
            return headerValue > value;
          case "<=":
            return headerValue <= value;
          case ">=":
            return headerValue >= value;
          case "!=":
            return headerValue != value;
          case "":
            return true;
          default:
            return false;
        }
      });
    }, userData);

    const totalPageNumber = Math.ceil(newList.length / perPage);
    let filteredList: list[] = newList.slice(
      (page - 1) * perPage,
      page * perPage
    );

    setTimeout(() => {
      setFilteredData(newList);
      setTotalPageNumber(totalPageNumber);
      setPage(1);
      setListData(filteredList);
    }, 0);
  };

  useEffect(() => {
    handleChangeFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  useEffect(() => {
    handleChangePerPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);

  useEffect(() => {
    handleChangePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center w-full pt-3">
      <div
        className="overflow-x-auto shadow-md shadow-indigo-500/40"
        style={{ width: "80%" }}
      >
        <table className="table table-zebra">
          <thead>
            <tr className="text-xl text-center">
              <th>ID</th>
              <th>Avavtar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {listData?.map((user: list) => (
              <tr className="text-center" key={user.id}>
                <td>{user.id}</td>
                <td className="flex justify-center items-center">
                  <Image
                    src={user.avatar}
                    alt={user.last_name}
                    priority={false}
                    height={64}
                    width={64}
                  />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-around items-center w-full pt-5 pb-20">
        <Pagination totalPages={totalPageNumber} />
        <FilterModal />
        <input
          style={{ width: "150px" }}
          type="number"
          placeholder="Per Page Item"
          className="input input-bordered w-full max-w-xs text-center"
          onInput={handlePerPageInput}
        />
      </div>
    </div>
  );
};

export default Main;
