const { db } = require("../config/database");
require("mysql2/promise");

exports.getProducts = async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM wine_packages`);
      res.json({ products: rows });
    } catch (err) {
      console.error("Datenbankabfrage fehlgeschlagen:", err); 
      return res.status(500).json({ error: err.message });
    }
  };

  exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM wine_packages WHERE package_id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Produkt nicht gefunden' });
        }

        res.json({ product: rows[0] });
    } catch (err) {
        console.error('Datenbankabfrage fehlgeschlagen:', err);
        return res.status(500).json({ error: err.message });
    }
};


