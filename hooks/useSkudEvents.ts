import { now } from 'moment';
import { useCallback, useEffect, useState } from 'react';
import axios from '../api/axios';
import ServerResponse from '../api/ServerResponse';
import SkudEventContent from '../model/SkudEventContent';
import SkudEventDisplay from '../model/SkudEventDisplay';
import { useFetch } from './common/useFetch';
import { useInterval } from './common/useInterval';

const PAGE_SIZE = 40;
const POLLING_DELAY = 5 * 1000;

const fetchEvents: (
  older: number,
  student?: string,
) => [call: () => void, response: ServerResponse<SkudEventContent>] = (older, student) => {
  return useFetch(async () => {
    return await axios.get('/skud', {
      params: { limit: PAGE_SIZE, older, student },
    });
  });
};

const fetchNewEvents: (
  last: number,
  student?: string,
) => [call: () => void, response: ServerResponse<SkudEventDisplay[]>] = (last, student) => {
  return useFetch(async () => {
    return await axios.get(`/skud/last/${last}`, {
      params: { student },
    });
  });
};
export const useSkudEvents: (
  student?: string,
) => [data: ServerResponse<SkudEventDisplay[]>, onScrollToBottom: () => void] = student => {
  const [mostOlderTimestamp, setMostOlderTimestamp] = useState<number>(now());
  const [events, setEvents] = useState<ServerResponse<SkudEventDisplay[]>>({
    loading: false,
    data: [],
  });

  const getTimestampOf: (getIndex: (events: any[]) => number, def: number) => number = useCallback(
    (getIndex, def) => {
      const data = events.data;
      if (data) {
        return data[getIndex(data)]?.timestamp ?? def;
      }
      return def;
    },
    [events.data],
  );

  const hasNextPage: () => boolean = useCallback(() => {
    return getOlderTimestamp() > mostOlderTimestamp;
  }, [mostOlderTimestamp, events.data]);

  // get timestamp of the first event in list
  const getLastTimestamp: () => number = () => getTimestampOf(_events => 0, -1);

  // get timestamp of the last event in list
  const getOlderTimestamp: () => number = useCallback(
    () => getTimestampOf(events => events.length - 1, now()),
    [mostOlderTimestamp, events.data],
  );

  const [callFetchEvents, responseFetchEvents] = fetchEvents(getOlderTimestamp(), student);
  const [callFetchNewEvents, responseFetchNewEvents] = fetchNewEvents(getLastTimestamp(), student);

  useEffect(() => {
    if (responseFetchEvents.loading) {
      setEvents({ loading: true, data: events.data });
      return;
    }

    if (responseFetchEvents.error) {
      setEvents({
        loading: false,
        data: events.data,
        error: responseFetchEvents.error,
      });
      return;
    }

    if (responseFetchEvents.data) {
      setMostOlderTimestamp(responseFetchEvents.data.olderEventTimestamp);
      setEvents({
        loading: false,
        data: [...(events.data ?? []), ...responseFetchEvents.data.content],
      });
    }
  }, [responseFetchEvents]);

  useEffect(() => {
    if (responseFetchNewEvents.data) {
      setEvents({
        loading: events.loading,
        data: [...responseFetchNewEvents.data, ...(events.data ?? [])],
        error: events.error,
      });
    }
  }, [responseFetchNewEvents]);

  useEffect(() => {
    if (events.data?.length !== 0) {
      setEvents({ loading: false });
      setMostOlderTimestamp(now());
      callFetchEvents();
    }
  }, [student]);

  useEffect(() => {
    if (events.data?.length === 0) {
      callFetchEvents();
    }
  }, []);

  useInterval(() => {
    if (events.data?.length !== 0) {
      callFetchNewEvents();
    }
  }, POLLING_DELAY);

  const onScrollToBottom: () => void = () => {
    if (!events.loading && hasNextPage()) {
      callFetchEvents();
    }
  };

  return [events, onScrollToBottom];
};
