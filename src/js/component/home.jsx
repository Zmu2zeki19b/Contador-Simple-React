import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa"; 

const SecondsCounter = ({ seconds }) => {
  return (
    <div className="counter">
      <FaClock />
      <span>{seconds} segundos</span>
    </div>
  );
};
const Home = () => {
  const [seconds, setSeconds] = useState(0);
  const [inputTime, setInputTime] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isCountdownActive) {
        setSeconds((prev) => prev + 1);
      } else if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCountdownActive, countdown]);

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const startCountdown = () => {
    if (inputTime > 0 && !isCountdownActive) {
      setCountdown(Number(inputTime));
      setIsCountdownActive(true);
    }
  };

  const stopCountdown = () => {
    setIsCountdownActive(false);
  };

  const resetCountdown = () => {
    if (inputTime > 0) {
      setCountdown(Number(inputTime));
      setIsCountdownActive(true);
    }
  };

  return (
    <div className="container">
      <h1>Contador de Segundos</h1>
      <SecondsCounter seconds={isCountdownActive ? countdown : seconds} />
      
      <input
        type="number"
        value={inputTime}
        onChange={handleInputChange}
        placeholder="Ingresa tiempo para cuenta regresiva"
      />

      <div className="button-group">
        <button className="start-btn" onClick={startCountdown}>Iniciar Cuenta Regresiva</button>
        <button className="stop-btn" onClick={stopCountdown}>Detener</button>
        <button className="reset-btn" onClick={resetCountdown}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Home;

