import React, { useEffect, useState } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineEventSmall from '../listables/TimelineEventSmall';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { getEvents } from '../../api/data/timeline-data';

export default function TimelineShort() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getEvents().then((eventList) => {
      if (isMounted) setEvents(eventList);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <VerticalTimeline lineColor={colorScheme.textColor} layout="1-column-left">
      {events.map((event) => (
        <TimelineEventSmall
          key={event.firebaseKey}
          title={event.title}
          date={event.date}
          iconTag={event.iconTag}
        />
      ))}
    </VerticalTimeline>
  );
}
