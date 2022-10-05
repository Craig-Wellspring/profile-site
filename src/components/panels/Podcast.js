import React from 'react';
import PanelHeader from '../GenericComponents';

export default function Podcast() {
  return (
    <div className="slide-in on-right">
      <PanelHeader>Interview</PanelHeader>
      <iframe
        title="Podcast"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1292013430&color=%23e2552e&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      />
    </div>
  );
}
