import React from 'react';
import Student from '../../model/Student';

type StudentId = string | 'NONE';

interface Props {
  value: StudentId;
  items: Student[];
  onChange: (studentId: StudentId) => void;
}

const StudentDropdown: React.FC<Props> = ({ value, items, onChange }) => {
  return (
    <div>
      <select
        value={value}
        onChange={event => {
          onChange(event.target.value);
        }}
      >
        <option value={'NONE'}>Выберите студента</option>

        {items.map(item => {
          return (
            <option value={item.id} key={item.id}>
              {`${item.name} ${item.surname} ${item.patronymic}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default StudentDropdown;
