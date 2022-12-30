import ClientError from '../error/ClientError';
import { ServerError } from '../error/ServerError';

export default interface ServerResponse<T> {
  loading: boolean;
  data?: T;
  error?: ServerError | ClientError;
}
