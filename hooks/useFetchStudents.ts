import { useEffect } from 'react';
import axios from '../api/axios';
import Student from '../model/Student';
import { useFetch } from './common/useFetch';

export const useFetchStudents: (onResponse: (students: Student[]) => void) => void = onResponse => {
  const [call, response] = useFetch(async () => {
    return await axios.get<Student[]>('/students');
  });
  useEffect(call, []);
  useEffect(() => {
    if (response.data) {
      onResponse(response.data);
    }
  }, [response]);
};
