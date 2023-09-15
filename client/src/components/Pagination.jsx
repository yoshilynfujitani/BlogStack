import { useSearchParams } from "react-router-dom";
import { usePosts } from "../pages/usePosts";

const Pagination = () => {
  const { totalCount } = usePosts();

  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from the URL search params or default to 1
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const pageCount = Math.ceil(totalCount / 5);

  function previous() {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  function next() {
    const nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <button onClick={previous} disabled={currentPage === 1}>
        Previous
      </button>
      <h1>{currentPage}</h1>
      <button onClick={next} disabled={currentPage === pageCount}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
