import { useState, useEffect, useRef } from 'react';

const useRealTimeData = (initialData = [], maxDataPoints = 20) => {
  const [data, setData] = useState(initialData);
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);
  const intervalRef = useRef(null);

  const generateNewDataPoint = currentData => {
    if (currentData.length === 0) {
      return Math.floor(Math.random() * 100) + 10;
    }

    const lastValue = currentData[currentData.length - 1];
    const variation = (Math.random() - 0.5) * 20;
    const newValue = Math.max(5, Math.min(150, lastValue + variation));
    return Math.floor(newValue);
  };

  const startRealTime = () => {
    if (intervalRef.current) return;

    setIsRealTimeActive(true);
    intervalRef.current = setInterval(() => {
      setData(currentData => {
        const newPoint = generateNewDataPoint(currentData);
        const updatedData = [...currentData, newPoint];

        if (updatedData.length > maxDataPoints) {
          return updatedData.slice(-maxDataPoints);
        }

        return updatedData;
      });
    }, 100);
  };

  const stopRealTime = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRealTimeActive(false);
  };

  const toggleRealTime = () => {
    if (isRealTimeActive) {
      stopRealTime();
    } else {
      startRealTime();
    }
  };

  const resetData = (newInitialData = initialData) => {
    stopRealTime();
    setData(newInitialData);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    isRealTimeActive,
    startRealTime,
    stopRealTime,
    toggleRealTime,
    resetData,
    setData,
  };
};

export default useRealTimeData;
