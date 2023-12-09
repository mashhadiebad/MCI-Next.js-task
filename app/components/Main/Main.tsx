"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import style from "./Main.module.css";
import Pagination from "../Pagination/Pagination";
import usePerPageStore from "@/app/store/perPageStore";
import usePageStore from "@/app/store/pageStore";

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

  const handlePerPageInput = (event: any) => {
    if (!event.target.value || Number(event.target.value <= 0)) {
      setPerPage(6);
      event.target.value = "";
    } else {
      setPerPage(Number(event.target.value));
    }
  };

  const handleChangePerPage = () => {
    const totalPageNumber = Math.ceil(userData.length / perPage);
    setPage(1);
    setTotalPageNumber(totalPageNumber);
    let filteredList: list[] = userData.filter(
      (user: any) => user.id > (page - 1) * perPage && user.id <= page * perPage
    );
    setListData(filteredList);
  };

  const handleChangePage = () => {
    const totalPageNumber = Math.ceil(userData.length / perPage);
    setTotalPageNumber(totalPageNumber);
    let filteredList: list[] = userData.filter(
      (user: any) => user.id > (page - 1) * perPage && user.id <= page * perPage
    );
    setListData(filteredList);
  };

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
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("filterModal").showModal()}
        >
          Filter
        </button>
        <dialog id="filterModal" className="modal">
          <div className="modal-box">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <form method="dialog flex justify-center w-full">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn text-xl font-bold">ٍُSEARCH</button>
              </form>
            </div>
          </div>
        </dialog>
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
