import React from 'react';
import PropTypes from 'prop-types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styled from 'styled-components';
import TimelineIcon from '../icons/TimelineIcon';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { userIsAdmin } from '../../api/auth';
import { deleteEvent } from '../../api/data/timeline-data';

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
`;

export default function TimelineEvent({
  bubbleColor,
  event,
  setEvents,
  setShowForm,
  setEditEventObj,
}) {
  const editButton = () => {
    setShowForm(true);
    setEditEventObj(event);
  };

  const deleteButton = () => {
    let isMounted = true;
    deleteEvent(event.firebaseKey).then((eventList) => {
      if (isMounted) {
        setEvents(eventList);
      }
    });
    return () => {
      isMounted = false;
    };
  };

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: colorScheme.panelColor,
        color: colorScheme.textColor,
        boxShadow: `0px 3px ${colorScheme.textColor}`,
        position: 'relative',
        opacity: '0.9',
      }}
      contentArrowStyle={{ borderRight: `7px solid ${colorScheme.textColor}` }}
      date={event.date}
      dateClassName="timeline-date"
      iconStyle={{ background: bubbleColor, color: colorScheme.textColor }}
      icon={<TimelineIcon name={event.iconTag} />}
    >
      <h3 className="vertical-timeline-element-title">{event.title}</h3>
      <h6 className="vertical-timeline-element-subtitle">{event.location}</h6>
      <p>{event.textContent}</p>
      {userIsAdmin() && (
        <ButtonContainer>
          <button type="button" className="blue-button" onClick={editButton}>
            <i className="fas fa-edit" />
          </button>
          <button
            type="button"
            className="orange-button"
            onClick={deleteButton}
          >
            <i className="fas fa-trash" />
          </button>
        </ButtonContainer>
      )}
    </VerticalTimelineElement>
  );
}

TimelineEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    iconTag: PropTypes.string.isRequired,
  }),
  bubbleColor: PropTypes.string,
  setEvents: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  setEditEventObj: PropTypes.func.isRequired,
};

TimelineEvent.defaultProps = {
  event: {
    title: 'Title',
    date: '2021',
    location: 'Nashville, TN',
    textContent: 'An event happened',
    firebaseKey: '000',
  },
  bubbleColor: colorScheme.warningColor,
};
