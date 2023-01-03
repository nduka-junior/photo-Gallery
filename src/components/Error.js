import React from 'react'

function Error({ error, setLoading }) {
    // setLoading(false);
  return (
    <div>
      <h3>{error.status}</h3>
      <h1>{error.message}</h1>
    </div>
  );
}

export default Error