import React from 'react';

const VenueMap = ({ event }) => {
  return (
    <div className="advanced-panel venue-map">
      <h2>Venue Map</h2>
      <p><strong>Location:</strong> {event.mapLabel}</p>
      <iframe
        title={`${event.venue} map`}
        src={event.mapUrl}
        loading="lazy"
      />
      <a
        href={event.mapLink}
        target="_blank"
        rel="noreferrer"
      >
        Open larger map
      </a>
    </div>
  );
};

export default VenueMap;
