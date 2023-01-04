import axios from "axios";
import { useEffect, useState } from "react";
import Images from "./components/Images";
import Error from "./components/Error";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";
import SearchInput from "./components/SearchInput";
import usePagination from "./usePagination";
function App() {
  const [query, setQuery] = useState("tesla");
  const [images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [imagesPerPage] = useState(30);
  const [Page, setPage] = useState(1);

  const _DATA = usePagination(images, imagesPerPage);
  // url
  const url = `https://api.pexels.com/v1/search/?page=${Page}&per_page=${imagesPerPage}&query=${query}
`;

  const apiFetch = () => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
      })
      .then(({ data }) => {
        setTotalResults(data.total_results);
        setLoading(false);
        setError(null);
        setImages(data.photos);
      })
      .catch(function (error) {
        if (error.response) {
          setLoading(false);
          setError({
            message: error.response.data.error,
            status: error.response.status,
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request + "request");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  // HANDLE PAGONAITON

  useEffect(() => {
    apiFetch();
  }, []);
  const pag = (e, value) => {
    setPage(value);
    _DATA.jump(value);
    apiFetch();
    // console.log(currentPage + "before");
    // console.log(value + "value");
    // setCurrentPage(value);
    // console.log(currentPage + "after");
    // apiFetch();
  };

  return (
    <div className="container">
      <h1 > A Simple Photo Gallery</h1>
      <SearchInput setQuery={setQuery} apiFetch={apiFetch} />
      {images.length === 0 && Loading === false && error == null ? (
        <Alert
          severity="error"
          sx={{
            mt: 3,
          }}
        >
          It looks like there aren't many great matches for
          <strong>"{query}"</strong>
        </Alert>
      ) : (
        error == null && (
          <>
            <Images images={_DATA} />
            <Pagination
              sx={{ mt: 10, mb: 10,}}
              count={Math.ceil(totalResults / imagesPerPage)}
              page={Page}
              onChange={pag}
            />
          </>
        )
      )}
      {/* /ERROR HANDLING */}
      {error && (
        <>
          <Error error={error} setLoading={setLoading} />
        </>
      )}
      {Loading && <CircularProgress disableShrink />}
    </div>
  );
}

export default App;
