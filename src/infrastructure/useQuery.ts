import { useState, useEffect, useCallback, useRef } from "react";

function noCallbackDefined () {
    return true
}

export function useQuery<Input, Output>(
  asyncFn: (arg?: Input) => Promise<Output>,
  params?: { parameters?: Input, initialValues?: Output, isCommand?: boolean, callback?: any }
) {
  const [results, setResults] = useState(params?.initialValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const callback = useRef(params?.callback || noCallbackDefined)

  const refresh = useCallback(
    (newParameters?: Input) => {
      setLoading(true);
      setError(null);
      asyncFn(newParameters)
        .then((results) => {setResults(results); callback.current({results})} )
        .catch((error) => {setError(error); callback.current({error})} )
        .finally(() => setLoading(false));
    },
    [asyncFn]
  );

  // Fire the query when the component mounts
  useEffect(() => {
    if(!params?.isCommand) {
      refresh(params?.parameters)
    }
  }, [refresh, params?.parameters, params?.isCommand]);

  return { loading, results, error, refresh };
}
