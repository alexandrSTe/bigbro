import React from 'react';
import StudentDisplay from '../../../model/StudentDisplay';
import StudentStatus from '../../../model/StudentStatus';

interface Props {
  student: StudentDisplay;
}
const StudentListItem: React.FC<Props> = ({ student }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <p>
        <strong>{student.id}</strong>
        {` ${student.name} ${student.surname} ${student.patronymic}`}
      </p>

      <p
        style={{
          color: student.status === StudentStatus.IN ? 'green' : 'red',
          margin: '0px 0px 0px 10px',
        }}
      >
        {student.status}
      </p>
    </div>
  );
};

export default StudentListItem;
