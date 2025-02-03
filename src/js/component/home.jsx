import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa"; // Icono de reloj de Font Awesome

// Componente SecondsCounter
const SecondsCounter = ({ seconds }) => {
  return (
    <div className="counter">
      <FaClock /> {/* Icono de reloj */}
      <span>{seconds} segundos</span> {/* Mostrar los segundos */}
    </div>
  );
};

// Componente principal
const Home = () => {
  const [seconds, setSeconds] = useState(0); // Estado para los segundos
  const [inputTime, setInputTime] = useState(""); // Estado para almacenar el tiempo ingresado
  const [countdown, setCountdown] = useState(null); // Estado para el tiempo restante de la cuenta regresiva
  const [isCountdownActive, setIsCountdownActive] = useState(false); // Estado para saber si está activa la cuenta regresiva

  // useEffect para el contador general (aumenta segundos)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isCountdownActive) {
        setSeconds((prevSeconds) => prevSeconds + 1); // Aumentar segundos si no hay cuenta regresiva
      } else if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1); // Disminuir si la cuenta regresiva está activa
      }
    }, 1000);

    return () => clearInterval(intervalId); // Limpiar intervalo cuando se deje de contar
  }, [isCountdownActive, countdown]);

  // Función para manejar el cambio en el input del tiempo
  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  // Función para iniciar la cuenta regresiva con el tiempo dado
  const startCountdown = () => {
    if (inputTime > 0 && !isCountdownActive) {
      setCountdown(Number(inputTime)); // Iniciar cuenta regresiva desde el número ingresado
      setIsCountdownActive(true); // Activar cuenta regresiva
    }
  };

  // Función para detener la cuenta regresiva y mostrar los segundos
  const stopCountdown = () => {
    setIsCountdownActive(false); // Detener la cuenta regresiva
  };

  // Función para reiniciar la cuenta regresiva con el valor ingresado
  const resetCountdown = () => {
    if (inputTime > 0) {
      setCountdown(Number(inputTime)); // Reiniciar con el valor ingresado
      setIsCountdownActive(true); // Asegurarnos de que la cuenta regresiva siga activa
    }
  };

  return (
    <div>
      <h1>Contador de Segundos y Cuenta Regresiva</h1>
      <SecondsCounter seconds={isCountdownActive ? countdown : seconds} /> {/* Mostrar el contador principal */}
      
      {/* Entrada para el tiempo de cuenta regresiva */}
      <input
        type="number"
        value={inputTime}
        onChange={handleInputChange}
        placeholder="Ingresa tiempo para cuenta regresiva"
      />
      
      {/* Mostrar la cuenta regresiva si está activa */}
      {isCountdownActive && countdown === 0 && <div>¡Cuenta regresiva finalizada!</div>}

      <div>
        {/* Botón Iniciar Cuenta Regresiva */}
        {!isCountdownActive && (
          <button onClick={startCountdown}>Iniciar Cuenta Regresiva</button>
        )}
        
        {/* Botón Detener siempre visible */}
        {isCountdownActive && (
          <button onClick={stopCountdown}>Detener</button>
        )}
        
        {/* Botón Reiniciar siempre visible */}
        <button onClick={resetCountdown}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Home;
