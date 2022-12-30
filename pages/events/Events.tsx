import React, { useState } from 'react';
import ServerResponse from '../../api/ServerResponse';
import EventList from '../../components/eventList/EventList';
import StudentDropdown from '../../components/studentSelect/StudentDropdown';
import { useFetchStudents } from '../../hooks/useFetchStudents';
import { useSkudEvents } from '../../hooks/useSkudEvents';
import SkudEventDisplay from '../../model/SkudEventDisplay';
import Student from '../../model/Student';

const fetchSkudEvents: (
  student: string,
) => [data: ServerResponse<SkudEventDisplay[]>, onScrollToBottom: () => void] = student => {
  const studentId = student === 'NONE' ? undefined : student;
  return useSkudEvents(studentId);
};

const Events: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('NONE');
  useFetchStudents(students => {
    setStudents(students);
  });

  const [events, onScrollToBottom] = fetchSkudEvents(selectedStudent);

  return (
    <>
      <StudentDropdown value={selectedStudent} items={students} onChange={setSelectedStudent} />
      <EventList
        loading={events.loading}
        items={events.data ?? []}
        error={events.error}
        onScrollToBotom={onScrollToBottom}
      />
    </>
  );
};

export default Events;
