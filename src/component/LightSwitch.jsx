import React from 'react';

const LightSwitch = ({ isOn, onToggle }) => {
  const [count, setCount] = useState(0)
  // Simulated sensor states
  const [temperature, setTemperature] = useState(25);
  const [isLightOn, setLightOn] = useState(false);
  const [isWaterLeakDetected, setWaterLeakDetected] = useState(false);
  // Simulated sensor actions
  const toggleLight = () => setLightOn(!isLightOn);
  
  return (
    <div>
      <h2>Light Switch</h2>
      <p>Status: {isOn ? 'On' : 'Off'}</p>
      <button onClick={onToggle}>{isOn ? 'Turn Off' : 'Turn On'}</button>
    </div>
  );
};

export default LightSwitch;