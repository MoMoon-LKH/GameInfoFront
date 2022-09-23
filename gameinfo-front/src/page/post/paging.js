import Pagination from "react-js-pagination";


export default function Paging({page, perPage, total, setPage}){


    return <>
        <Pagination
            activePage={page}
            itemsCountPerPage={perPage}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={setPage}
        />
    </>
}