import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import hiteshSirImg from "../assets/HiteshSir.jpeg";
import piyushSirImg from "../assets/PiyushSir.jpeg";

function Home({ theme, setTheme }) {
  const navigate = useNavigate();

  return (
    <div className="home">
        <button
  className="theme-toggle home-toggle"
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
>
  {theme === "light" ? <FiMoon /> : <FiSun />}
</button>
      <div className="home-container">
        <h1 className="home-title">Choose Your AI Mentor</h1>

        <p className="home-subtitle">
          Select the personality you'd like to chat with.
        </p>

        <div className="persona-grid">
          <div
            className="persona-card"
            onClick={() => navigate("/chat/HiteshSir")}
          >
            <div className="persona-avatar">
                <img src={hiteshSirImg} alt="Hitesh Sir" />
            </div>

            <h2 className="persona-name">Hitesh Sir</h2>

            <p className="persona-description">
              Hanji! Karte hain aapki problem ka samadhan with practical advice,
              real-world examples, and lots of chai.
            </p>
          </div>

          <div
            className="persona-card"
            onClick={() => navigate("/chat/PiyushSir")}
          >
            <div className="persona-avatar">
              <img src={piyushSirImg} alt="Piyush Sir" />
            </div>

            <h2 className="persona-name">Piyush Sir</h2>

            <p className="persona-description">
              Coding ko life se relate karke samjho. Learn concepts through
              stories, analogies, and a developer mindset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;