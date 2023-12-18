import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "71d5b33e54msh230d124660b0d40p1f5c9cjsn1976dda2d1ec",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  async function fetchData() {
    setIsLoading(true);

    try {
      const res = await axios.request(options);
      setData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error while fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function refetch() {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error };
}
