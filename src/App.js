import axios from "axios";
import { useEffect, useState } from "react";
import Images from "./components/Images";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Error from "./components/Error";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";

function App() {
  const [query, setQuery] = useState("tesla");
  const [images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(2);
  const url = `https://api.pexels.com/v1/search/?page=${currentPage}&per_page=${imagesPerPage}&query=${query}
`;

  const apiFetch = () => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization:
            "563492ad6f9170000100000158c9a241a4ef43e7958a6055fe9dd282",
        },
      })
      .then(({ data }) => {
        console.log(JSON.stringify(data.total_results) + "data");
        setTotalResults(data.total_results);
        setCurrentPage(data.next_page);
        setLoading(false);
        setError(null);
        setImages(data.photos);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError({
            message: error.response.data.error,
            status: error.response.status,
          });
          // console.log(error.response.data.error);
          // console.log(error.response.status + "status");
          // console.log(error.response.headers + "headers");
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
  console.log(JSON.stringify(error) + "error");
  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <div className="container">
      <h1> A Simple Photo Gallery</h1>
      <div className="search-input">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mr: 2, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            apiFetch();
          }}
        >
          <div className="input-alignment">
            <TextField
              id="outlined-search"
              label="Input 
              Search Term"
              type="search"
            />

            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => apiFetch()}
            >
              Search
            </Button>
          </div>
        </Box>
      </div>
      {images.length === 0 && Loading == false && error ==false ? (
        <Alert
          severity="error"
          sx={{
            mt: 3,
          }}
        >
          It looks like there aren't many great matches for{" "}
          <strong>"{query}"</strong>
        </Alert>
      ) : (
        <Images images={images} />
      )}
      {/* /ERROR HANDLING */}
      {error && (
        <>
          <Error error={error} setLoading={setLoading} />
        </>
      )}
      {Loading && <CircularProgress disableShrink />}
      <Pagination
        count={Math.ceil(totalResults / imagesPerPage)}
        onChange={(e) => { 
          setCurrentPage(e.target.textContent);
          apiFetch();
        }
        }
        // getItemAriaLabel={(type, pages, selected) => {
        //   if (selected === true) {
        //     console.log(currentPage + "before");
        //     setCurrentPage(pages);
        //     console.log(currentPage + "after");
        //   }
        // }}
      />
    </div>
  );
}

export default App;
