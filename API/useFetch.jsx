import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";


const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState({});
    const [cookies] = useCookies("access_token", { path: "/" });
    let status;

    const fetchData = useCallback(
        async ({ url, method, body, headers, callback }) => {
            try {
                setIsLoading(true);
                const res = await fetch(url, {
                    method: method || "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + cookies.access_token,
                        ...headers,
                    },
                    body: JSON.stringify(body),
                });
                const data = await res.json();
                status = res.status;
                setApiData(data);
                setIsLoading(false);
                if (callback) callback(data, status);
            } catch (error) {
                console.log("error:", error);
                setIsLoading(false);
            }
        }
    );
    return [fetchData, apiData, isLoading, setIsLoading];
};
export default useFetch;
