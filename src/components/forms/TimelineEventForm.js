import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createEvent, updateEvent } from '../../api/data/timeline-data';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 300px;
  max-width: 600px;

  margin: 20px;
`;

const EntryForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Group = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const TitleInput = styled.input`
  width: 80%;
`;

const LocationInput = styled.input`
  width: 45%;
`;
const DateInput = styled.input`
  width: 45%;
`;

const ContentInput = styled.textarea`
  width: 100%;
`;

const initialState = {
  title: '',
  date: '',
  location: '',
  textContent: '',
  iconTag: 'ban',
};

export default function TimelineEventForm({
  eventObj,
  setEditEventObj,
  setShowForm,
  setEvents,
}) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (eventObj.firebaseKey) {
      setFormInput(eventObj);
    }
  }, []);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      updateEvent(formInput).then(setEvents);
    } else {
      createEvent(formInput).then(setEvents);
    }
    setShowForm(false);
    setEditEventObj({});
  };

  const handleClose = () => {
    setShowForm(false);
    setEditEventObj({});
  };

  return (
    <Container className="section">
      <EntryForm onSubmit={handleSubmit}>
        <TitleInput
          name="title"
          type="text"
          onChange={handleChange}
          placeholder="Event Title"
          value={formInput.title}
          required
        />
        <Group>
          <DateInput
            name="date"
            type="text"
            onChange={handleChange}
            placeholder="Date"
            value={formInput.date}
            required
          />
          <LocationInput
            name="location"
            type="text"
            onChange={handleChange}
            placeholder="Location"
            value={formInput.location}
            required
          />
        </Group>
        <ContentInput
          name="textContent"
          onChange={handleChange}
          placeholder="Event content"
          value={formInput.textContent}
        />
        <Group>
          <button type="submit" className="blue-button">
            <i
              className={`fas fa-${
                eventObj.firebaseKey ? 'check-double' : 'check'
              }`}
            />
          </button>
          <button type="button" className="orange-button" onClick={handleClose}>
            <i className="fas fa-times" />
          </button>
        </Group>
      </EntryForm>
    </Container>
  );
}

TimelineEventForm.propTypes = {
  eventObj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    textContent: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  setShowForm: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  setEditEventObj: PropTypes.func.isRequired,
};

TimelineEventForm.defaultProps = {
  eventObj: {},
};
