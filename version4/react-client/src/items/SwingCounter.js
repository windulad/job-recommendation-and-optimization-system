import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SwingCounter = ({ targetValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let endTimestamp = null;
    let increment = null;

    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp;
      if (!endTimestamp) endTimestamp = startTimestamp + duration;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.round(progress * targetValue);

      if (increment !== currentValue) {
        increment = currentValue;
        setCount(increment);
      }

      if (timestamp < endTimestamp) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);

    return () => {
      startTimestamp = null;
      endTimestamp = null;
      increment = null;
    };
  }, [targetValue, duration]);

  return (
    <div className="counter">
      <h2>{count}</h2>
    </div>
  );
};

export default SwingCounter;
