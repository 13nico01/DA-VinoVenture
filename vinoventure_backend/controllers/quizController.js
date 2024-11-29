const { db } = require("../config/database");
require("mysql2/promise");



// Wine Quiz_id und Answers aus Wine_Packages rausziehen
exports.createQuiz = async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM orders`); // Verwende db.query() anstelle von db.all()
      res.json({ users: rows });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  


exports.getAnswers
   // Daten basierend auf der wineId
  if (wineId === 3) {
    const quizData = {
      wineName: "Sauvignon Blanc | Scharl Vulkanland 2022",
      wineId: 3,
      authNumber: 1111,
      quiz: {
        smell: {
          "MARACUJA": true,
          "TOMATENRISPEN (STIELE)": false,
          "PAPRIKA": false,
          "JOHANNISBEERE": true
        },
        taste: {
          "MARZIPAN": true,
          "RAUCHIG": false,
          "HASELNUSS": true,
          "ROTE RÜBEN (ERDIG)": false
        },
        acidity: {
          "WENIG": false,
          "HOCH": true
        },
        finish: {
          "VOLLMUNDIG - CREMIG": false,
          "MINERALISCH - FRISCH": true
        }
      }
    };

    // Daten zurückgeben
    res.json(quizData);
  } else {
    // Fehler für unbekannte wineId
    res.status(404).json({ error: "Wein-Quiz nicht gefunden." });
  };