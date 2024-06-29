import { useState, useEffect } from "react";

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const REACT_APP_RAWG_API_KEY = "37cd9ab12b484361b71e903c9bbf01a8";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${REACT_APP_RAWG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Games Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;
