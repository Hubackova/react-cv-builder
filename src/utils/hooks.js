/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";


function useDataApi() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function doFetch(url, method, input) {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v2/${url}`, {
        method,
        body: JSON.stringify(input),
        headers: {
          Authorization: `Token ${process.env.REACT_APP_TOKEN}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }
  return [{ data, isLoading, isError }, doFetch];
}


export { useDataApi };
