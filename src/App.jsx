import { useState } from 'react';
import axios from 'axios';
import './App.css';

const temas = ["Cine y Series", "Bebidas y Comida", "Deportes", "Redes y Tecnología", "Viajes y Lugares"];

function App() {
  const [temaSeleccionado, setTemaSeleccionado] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerPreguntas = async (tema) => {
    setCargando(true);
    setTemaSeleccionado(tema);
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/generate?topic=${tema}`);
      setPreguntas(res.data.preguntas); // Asegúrate que el backend responde con este campo
    } catch (error) {
      console.error("❌ Error al obtener preguntas:", error);
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mb-4 mt-2">
        🎮 Juego de Preguntados IA
      </h1>

      {!preguntas.length && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {temas.map((tema) => (
            <button
              key={tema}
              onClick={() => obtenerPreguntas(tema)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-md"
            >
              {tema}
            </button>
          ))}
        </div>
      )}

      {cargando && <p className="text-indigo-700 font-semibold">⏳ Cargando preguntas...</p>}

      {preguntas.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Tema: {temaSeleccionado}</h2>
          {preguntas.map((pregunta, index) => (
            <div key={index} className="mb-6">
              <p className="font-medium">{index + 1}. {pregunta.question}</p>
              <ul className="mt-2 space-y-2">
                {pregunta.options.map((opcion, i) => (
                  <li key={i} className="bg-purple-100 p-2 rounded-lg">{opcion}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-purple-600 font-medium text-sm my-4">
        Desarrollado con ❤️ por Leidy
      </p>
    </div>
  );
}

export default App;
