import { useState, useEffect, useCallback, useRef } from "react";

function noCallbackDefined () {
    return true
}


export function useQuery<T, Input, Output>(
  interactor: T,
  asyncFn: (arg?: Input) => Promise<Output>,
  params?: { parameters?: Input, initialValues?: Output, isCommand?: boolean, onSuccess?: any }
) {
  const [results, setResults] = useState(params?.initialValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const callback = useRef(params?.onSuccess || noCallbackDefined) // Callback change should not re-render

  const refresh = useCallback(
    (newParameters?: Input) => {
      setLoading(true);
      setError("");
      asyncFn.call(interactor, newParameters)
        .then((results) => {setResults(results); callback.current({results})} )
        .catch((error) => {console.log(error); setError(error.toString()); callback.current({error:error.toString()})} )
        .finally(() => setLoading(false));
    },
    [interactor, asyncFn]
  );

  // Fire the query when the component mounts
  useEffect(() => {
    if(!params?.isCommand) {
      refresh(params?.parameters)
    }
  }, [refresh, params?.parameters, params?.isCommand]);

  return { loading, results, error, refresh };
}
