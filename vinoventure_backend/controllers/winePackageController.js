const db = require('../config/database')

exports.addWinePackage = (req, res) => {
    const { package_name, description, wine_count, vintner, price, suitable_for_persons } = req.body;

    db.run(
        `INSERT INTO wine_packages (package_name, description, wine_count, vintner, price, suitable_for_persons)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [package_name, description, wine_count, vintner, price, suitable_for_persons],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Weinpaket hinzugefügt!", id: this.lastID })
        }
    );
}

exports.getWinePackages = (req, res) => {
    db.all(`SELECT * FROM wine_packages`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json({ packages: rows })
    })
}
