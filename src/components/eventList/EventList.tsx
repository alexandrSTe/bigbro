import React, { useCallback, useRef } from 'react';
import ClientError from '../../error/ClientError';
import { ServerError } from '../../error/ServerError';
import SkudEventDisplay from '../../model/SkudEventDisplay';
import EventListItem from './eventListItem/EventListItem';

interface Props {
  loading: boolean;
  items: SkudEventDisplay[];
  error?: ServerError | ClientError;
  onScrollToBotom: () => void;
}

const EventList: React.FC<Props> = ({ loading, items, error, onScrollToBotom }) => {
  const observer = useRef<IntersectionObserver>();
  const lastEventRef: (event: HTMLDivElement | null) => void = useCallback(
    event => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          onScrollToBotom();
        }
      });

      if (event) observer.current.observe(event);
    },
    [loading],
  );

  const BottomContent: React.FC = () => {
    if (loading) {
      return <p>Loading</p>;
    }
    if (error !== undefined) {
      return <p>Error!</p>;
    }
    return <>End</>;
  };
  return (
    <div>
      {items.map((event, i) => {
        if (items.length === i + 1) {
          return <EventListItem key={event.id} event={event} ref={lastEventRef} />;
        }
        return <EventListItem key={event.id} event={event}></EventListItem>;
      })}

      <BottomContent />
    </div>
  );
};

export default EventList;
