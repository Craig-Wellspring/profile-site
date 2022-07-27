import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 120%;
  text-decoration: underline;
`;

const ListContent = styled.div``;

export default function Tech({ tech }) {
  return (
    <Panel>
      <ListTitle>{tech[0]}:</ListTitle>
      <ListContent>{tech[1]}</ListContent>
    </Panel>
  );
}

Tech.propTypes = {
  tech: PropTypes.arrayOf(PropTypes.string).isRequired,
};
