import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            theme={theme}
            setTheme={setTheme}
          />
        }
      />

      <Route
        path="/chat/:personaId"
        element={
          <Chat
            theme={theme}
            setTheme={setTheme}
          />
        }
      />
    </Routes>
  );
}

export default App;