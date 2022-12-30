import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ServerResponse from '../api/ServerResponse';
import StudentDisplay from '../model/StudentDisplay';
import { useFetch } from './common/useFetch';
import { useInterval } from './common/useInterval';

const useFetchStudents: () => [
  call: () => void,
  response: ServerResponse<StudentDisplay[]>,
] = () => {
  return useFetch(async () => {
    return await axios.get<StudentDisplay[]>('/students/display');
  });
};

const useStudents: () => ServerResponse<StudentDisplay[]> = () => {
  const [students, setStudents] = useState<ServerResponse<StudentDisplay[]>>({ loading: false });

  const [call, response] = useFetchStudents();

  useEffect(() => {
    setStudents(response);
  }, [response]);
  useInterval(() => {
    call();
  }, 5000);

  useEffect(() => {
    call();
  }, []);

  return students;
};

export default useStudents;
