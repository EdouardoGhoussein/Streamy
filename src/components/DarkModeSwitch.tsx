import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="custom-toggle">
      <input
        type="checkbox"
        className="custom-toggle-input"
        id="darkModeSwitch"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label className="custom-toggle-label" htmlFor="darkModeSwitch">
        <span className="custom-toggle-inner" />
        <span className="custom-toggle-switch" />
      </label>

      <span className="dark-mode-text">{darkMode ? "Dark" : "Light"} mode</span>
    </div>
  );
};

export default DarkModeSwitch;
