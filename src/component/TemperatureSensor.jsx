import React from 'react';

const TemperatureSensor = ({ temperature }) => {
  return (
    <div>
      <h2>Temperature Sensor</h2>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};

export default TemperatureSensor;