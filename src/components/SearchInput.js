import React from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SearchInput({setQuery,apiFetch}) {
  return (
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
  );
}

export default SearchInput