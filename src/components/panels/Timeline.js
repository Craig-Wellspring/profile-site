import React from 'react';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineEvent from '../listables/TimelineEvent';
import colorScheme from '../../resources/JSON/globalVars/colorScheme.json';
import PanelHeader from '../GenericComponents';
import events from '../../resources/JSON/listableData/timeline-data.json';

export default function Timeline() {
  return (
    <div
      id="timeline"
      className="slide-in on-left"
      style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        scrollMarginTop: '100px',
      }}
    >
      <PanelHeader>Timeline</PanelHeader>
      <VerticalTimeline lineColor={colorScheme.textColor}>
        {Object.entries(events).map((event) => (
          <TimelineEvent
            key={event[0]}
            iconTag={event.iconTag}
            event={event}
          />
        ))}
      </VerticalTimeline>
      <PanelHeader>Present</PanelHeader>
    </div>
  );
}
