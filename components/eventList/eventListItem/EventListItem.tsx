import React, { Ref } from 'react';
import SkudEventDisplay from '../../../model/SkudEventDisplay';

interface Props {
  event: SkudEventDisplay;
}

const EventListItem = React.forwardRef<HTMLDivElement, Props>(
  ({ event }, ref?: Ref<HTMLDivElement>) => {
    const student = event.student;
    return (
      <div ref={ref} style={{ display: 'flex', flexDirection: 'row' }}>
        <p>
          <strong>{event.id}</strong>
          {` - ${student.name} ${student.surname}`}
        </p>
        <p
          style={{
            color: event.type === 'ENTER' ? 'green' : 'red',
            margin: '0px 0px 0px 10px',
          }}
        >
          {event.type}
        </p>
      </div>
    );
  },
);

EventListItem.displayName = 'EventListItem';
export default EventListItem;
