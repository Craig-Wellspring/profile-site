import React from 'react';
import PropTypes from 'prop-types';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useHistory } from 'react-router-dom';
import TimelineIcon from '../icons/TimelineIcon';
import colorScheme from '../../JSON/globalVars/colorScheme.json';

export default function TimelineEventSmall({
  title,
  iconTag,
  bubbleColor,
  date,
}) {
  const history = useHistory();

  return (
    <VerticalTimelineElement
      style={{ margin: '0px 0px 20px 0px' }}
      className="vertical-timeline-element--work"
      contentStyle={{
        background: colorScheme.panelColor,
        color: colorScheme.textColor,
        padding: '5px 20px 0px 20px',
        boxShadow: `0px 3px ${colorScheme.textColor}`,
        minWidth: '250px',
      }}
      contentArrowStyle={{ borderRight: `7px solid ${colorScheme.textColor}` }}
      date={date}
      iconStyle={{ background: bubbleColor, color: colorScheme.textColor }}
      icon={<TimelineIcon name={iconTag} />}
      onTimelineElementClick={() => history.push('/timeline')}
    >
      <h6 className="vertical-timeline-element-title">{title}</h6>
    </VerticalTimelineElement>
  );
}

TimelineEventSmall.propTypes = {
  title: PropTypes.string,
  iconTag: PropTypes.string,
  date: PropTypes.string,
  bubbleColor: PropTypes.string,
};

TimelineEventSmall.defaultProps = {
  title: 'Title',
  iconTag: 'ban',
  date: '2021',
  bubbleColor: colorScheme.warningColor,
};
