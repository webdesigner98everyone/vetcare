import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function PreferencesSettings() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<string>("es");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const savedLanguage = localStorage.getItem("language");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>{t('settings')}</h2>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            🎨 {t('change_theme')}
          </h3>
          <button style={styles.button} onClick={toggleTheme}>
            {theme === "light" ? t('dark_mode')+"🌙" : t('light_mode')+"🌞"}
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            🌍 {t('select_language')}
          </h3>
          <select style={styles.select} value={language} onChange={handleLanguageChange}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "transparent",
    padding: "2rem",
    borderRadius: "1rem",
    textAlign: "center" as const,
    color: "white",
    width: "100%",
    maxWidth: "400px",
    fontSize: "2rem"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
    fontWeight: "bold",
    padding: "2rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  button: {
    backgroundColor: "#5a4bff",
    color: "white",
    border: "none",
    padding: "0.75rem 1rem",
    fontSize: "1.2rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "none",
    fontSize: "1.2rem",
    color: "black",
  }
};
