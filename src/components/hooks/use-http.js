import { useCallback, useState } from "react";

const useHttp = (applyData) => {
  const [isAnim, setAnim] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setAnim(true);
    setError(null);

    console.log("call " + requestConfig);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      //console.log("data: " + data);
      applyData(data);

    } catch (err) {
      console.log(error);
      setError(err.message || "Something goes wrong ");
    }

    setAnim(false);
  }, []);

  return {
    isAnim,
    error,
    sendRequest,
  };
};

export default useHttp;
