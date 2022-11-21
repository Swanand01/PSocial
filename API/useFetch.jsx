import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";


const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState({});
    const [cookies] = useCookies("access_token", { path: "/" });
    let status;

    const fetchData = useCallback(
        async ({ url, method, body, headers, callback, includeAccessToken }) => {
            try {
                setIsLoading(true);
                const res = await fetch(url, {
                    method: method || "GET",
                    headers: {
                        ...(includeAccessToken && { Authorization: "Bearer " + cookies.access_token }),
                        "Content-Type": "application/json",
                        ...headers,
                    },
                    body: JSON.stringify(body),
                });
                console.log({
                    method: method || "GET",
                    headers: {
                        ...(includeAccessToken && { Authorization: "Bearer " + cookies.access_token }),
                        "Content-Type": "application/json",
                        ...headers,
                    },
                    body: JSON.stringify(body),
                });
                // if (!res.ok) {
                //     setIsLoading(false);
                //     return;
                // }
                const data = await res.json();
                status = res.status;
                setApiData(data);
                setIsLoading(false);
                if (callback) callback(data, status);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
    );
    return [fetchData, apiData, isLoading, setIsLoading];
};
export default useFetch;
