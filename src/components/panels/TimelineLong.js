import React, { useEffect, useState } from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styled from 'styled-components';
import TimelineEvent from '../listables/TimelineEvent';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { getEvents } from '../../api/data/timeline-data';
import TimelineEventForm from '../forms/TimelineEventForm';
import { userIsAdmin } from '../../api/auth';

const ButtonContainer = styled.div`
  @media only screen and (max-width: 1170px) {
    display: flex;
    width: 100%;
    padding-left: 1.5%;
  }
`;

export default function TimelineLong() {
  const [showForm, setShowForm] = useState(false);
  const [editEventObj, setEditEventObj] = useState({});

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
    <>
      <VerticalTimeline lineColor={colorScheme.textColor}>
        {events.map((event) => (
          <TimelineEvent
            key={event.firebaseKey}
            iconTag={event.iconTag}
            event={event}
            setEvents={setEvents}
            setShowForm={setShowForm}
            setEditEventObj={setEditEventObj}
          />
        ))}
      </VerticalTimeline>
      {showForm && (
        <TimelineEventForm
          eventObj={editEventObj}
          setEditEventObj={setEditEventObj}
          setShowForm={setShowForm}
          setEvents={setEvents}
        />
      )}
      {userIsAdmin() && !showForm && (
        <ButtonContainer>
          <button
            type="button"
            className="blue-button"
            onClick={() => setShowForm(true)}
          >
            <i className="fas fa-plus" />
          </button>
        </ButtonContainer>
      )}
    </>
  );
}
