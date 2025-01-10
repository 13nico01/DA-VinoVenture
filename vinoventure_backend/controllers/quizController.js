const { db } = require("../config/database");
require("mysql2/promise");

 
      // Wine Quiz_id und Answers aus Wine_Packages rausziehen
exports.createQuiz = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT p.participant_id,
    COALESCE(u.username, p.participant_name) AS participant_display_name,  
    pa.clicked,
    CASE
        WHEN pa.clicked = 1 THEN a.answer1
        WHEN pa.clicked = 2 THEN a.answer2
        WHEN pa.clicked = 3 THEN a.answer3
        WHEN pa.clicked = 4 THEN a.answer4
        ELSE 'No answer selected'
    END AS selected_answer,  
    a.is_correct,
    a.wine_id,
    a.answer1, 
    a.answer2,  
    a.answer3,  
    a.answer4, 
    CASE
        WHEN a.is_correct = 1 THEN a.answer1
        WHEN a.is_correct = 2 THEN a.answer2
        WHEN a.is_correct = 3 THEN a.answer3
        WHEN a.is_correct = 4 THEN a.answer4
        ELSE 'No correct answer'
    END AS correct_answer, 
    w.wine_name,  
    wp.package_name, 
    ho.username AS host_name  
FROM
    participant p
LEFT JOIN
    users u ON p.user_id = u.user_id  
JOIN
    participant_answer pa ON p.participant_id = pa.participant_id 
JOIN
    answer a ON pa.answer_id = a.answer_id  
JOIN
    wine w ON a.wine_id = w.wine_id 
    quiz q ON a.quiz_id = q.quiz_id  
JOIN
    wine_packages wp ON q.wine_package_id = wp.wine_package_id 
JOIN
    users ho ON q.host_id = ho.user_id  
ORDER BY
    wp.package_name, w.wine_name; `); 
   res.json({ 
    success: true,
    data: rows 
  });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

// Check Auth Number
exports.checkAuthNumber = async (req, res) => {
  const { authNumber } = req.body; // Authentifizierungsnummer aus Anfrage

  if (authNumber === 1111) {
    res.json({ success: true, wineId: 3 }); // Beispiel: Wein-ID 3
  } else {
    res.status(401).json({ success: false, message: "Ungültige Authentifizierungsnummer" });
  }
};


exports.getAnswers = async (req, res) => {
  const { wineId } = req.params; // Erhalte wineId aus Anfrage
  if (wineId === '3') { // `wineId` ist als String aus der URL
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
    res.json(quizData);
  } else {
    res.status(404).json({ error: "Wein-Quiz nicht gefunden." });
  }
};