import { useState, useEffect } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [fetchFunctionState, setFetchFunctionState] = useState(fetchFunction);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            // @ts-ignore
            const result = await fetchFunctionState();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchFunctionState]); // Ajout de `fetchFunctionState` dans la liste des dépendances

    const refetch = (newFetchFunction?: () => Promise<T>) => {
        if (newFetchFunction) {
            // @ts-ignore
            setFetchFunctionState(() => newFetchFunction);
        }
        fetchData();
    };

    return { data, loading, error, refetch };
};

export default useFetch;