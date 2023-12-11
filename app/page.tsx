"use client";
import Header from "./components/Header/Header";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import Main from "./components/Main/Main";
import usePageStore from "./store/pageStore";
import usePerPageStore from "./store/perPageStore";

export default function Home() {
  const { page } = usePageStore();
  const { perPage } = usePerPageStore();
  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<any>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://reqres.in/api/users?per_page=12").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full">
        <progress className="progress w-56" />
      </div>
    );
  }
  if (isError) {
    return <div className="">error</div>;
  }
  if (isSuccess) {
    return (
      <div>
        <Header />
        <Main userData={userData.data} />
        <footer className="footer footer-center p-3 bg-base-300 text-base-content fixed bottom-0">
          <aside>
            <p>Copyright © 2023 - All right reserved by MCI</p>
          </aside>
        </footer>
      </div>
    );
  }
}
