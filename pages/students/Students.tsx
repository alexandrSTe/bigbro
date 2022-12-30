import React from 'react';
import StudentsList from '../../components/studentList/StudentsList';
import useStudents from '../../hooks/useStudents';

const Students: React.FC = () => {
  const students = useStudents();

  return (
    <>
      <StudentsList students={students} />
    </>
  );
};

export default Students;
