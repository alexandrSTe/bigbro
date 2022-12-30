import React from 'react';
import ServerResponse from '../../api/ServerResponse';
import StudentDisplay from '../../model/StudentDisplay';
import StudentListItem from './studentListItem/StudentListItem';

interface Props {
  students: ServerResponse<StudentDisplay[]>;
}

const StudentsList: React.FC<Props> = ({ students }) => {
  if (students.loading) {
    return <div>Loading</div>;
  }

  if (students.error) {
    console.error(students.error);
    return <div>Error</div>;
  }

  if (students.data) {
    return (
      <div>
        {students.data.map(student => {
          return <StudentListItem key={student.id} student={student} />;
        })}
      </div>
    );
  }
  return <div>No students</div>;
};

export default StudentsList;
