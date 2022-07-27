import React from 'react';
import PropTypes from 'prop-types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineIcon from '../icons/TimelineIcon';
import colorScheme from '../../resources/JSON/globalVars/colorScheme.json';

export default function TimelineEvent({ bubbleColor, event }) {
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
      date={event[1].date}
      dateClassName="timeline-date"
      iconStyle={{ background: bubbleColor, color: colorScheme.textColor }}
      icon={<TimelineIcon name={event[1].iconTag} />}
    >
      <h3 className="vertical-timeline-element-title">{event[0]}</h3>
      <h6 className="vertical-timeline-element-subtitle">{event[1].location}</h6>
      <p>{event[1].textContent}</p>
    </VerticalTimelineElement>
  );
}

TimelineEvent.propTypes = {
  event: PropTypes.shape({
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired,
    iconTag: PropTypes.string.isRequired,
  }),
  bubbleColor: PropTypes.string,
};

TimelineEvent.defaultProps = {
  event: {
    date: '2021',
    location: 'Nashville, TN',
    textContent: 'An event happened',
  },
  bubbleColor: colorScheme.warningColor,
};
