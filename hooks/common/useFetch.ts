import { AxiosResponse, AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import ClientError from '../../error/ClientError';
import { ServerError, ServerErrorResponse } from '../../error/ServerError';
import ServerResponse from '../../api/ServerResponse';

export function useFetch<T>(
  getRequest: () => Promise<AxiosResponse<T>>,
): [call: () => void, response: ServerResponse<T>] {
  const [response, setResponse] = useState<ServerResponse<T>>({ loading: false });
  const buildCall: () => () => void = () => {
    return () => {
      void (async () => {
        setResponse({ loading: true });
        await getRequest()
          .then(response => {
            setResponse({ loading: false, data: response.data });
          })
          .catch((error: AxiosError<ServerErrorResponse>) => {
            if (error.response) {
              const serverError = ServerError.fromServerResponse(error.response.data);
              setResponse({ loading: false, error: serverError });
              return;
            }
            throw new Error(error.message);
          })
          .catch((error: Error) => {
            const clientError = new ClientError(error.message);
            setResponse({ loading: false, error: clientError });
          });
      })();
    };
  };

  const call = useCallback(buildCall(), [getRequest]);

  return [call, response];
}
// export function useFetch<T>(
// url: RequestInfo | URL,
// options: RequestInit = {},
// ): [call: () => Promise<void>, status: FetchStatus<T>] {
// const [status, setStatus] = useState<FetchStatus<T>>({ loading: false });

// const call: () => Promise<void> = async () => {
// setStatus({ loading: true });
// await fetch(url, options)
// .then(async response => {
// if (response.ok) {
// return await response.json();
// }

// return await Promise.reject(response); // catch to ServerError
// })
// .then(raw => raw as T)
// .then((data: T) => {
// setStatus({ loading: false, data });
// })
// .catch(async error => {
// if (error instanceof Response) {
// Server Error
// const serverError = ServerError.fromServerResponse(await error.json());
// setStatus({ loading: false, error: serverError });
// } else if (error instanceof Error) {
// Client Error
// const clientError = new ClientError(error.message);
// setStatus({ loading: false, error: clientError });
// console.log(clientError);
// }
// });
// };

// return [call, status];
// }
