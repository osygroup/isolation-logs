import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const getRandomText = length => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let text = '';

  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

const RandomTexts = ({ length }) => {
  const [value, setValue] = useState(getRandomText(length));

  useEffect(() => {
    setValue(getRandomText(length));
    setInterval(() => {
      setValue(getRandomText(length));
    }, 300);
  }, [length])

  return (
    <span>{value}</span>
  )
}

RandomTexts.defaultProps = {
  length: 4
}

RandomTexts.propTypes = {
  length: PropTypes.number
}

export default RandomTexts;