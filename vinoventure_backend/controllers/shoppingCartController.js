exports.getShoppingCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM shopping_carts WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Warenkorb nicht gefunden' });
        }

        res.json({ product: rows[0] });
    } catch (err) {
        console.error('Datenbankabfrage fehlgeschlagen:', err);
        return res.status(500).json({ error: err.message });
    }
};
