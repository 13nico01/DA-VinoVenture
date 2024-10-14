const db = require('../config/database')


/**
 * @swagger
 * tags:
 *      name: WinePackage
 *      description: WinePackages
 */

/**
 * @swagger
 * /wine-packages/add-packages:
 *   post:
 *     summary: Add WinePackage
 *     tags: [WinePackage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - package_name
 *               - description
 *               - wine_count
 *               - vinter
 *               - price
 *               - suitable_for_persons
 *               - image
 *             properties:
 *               package_name:
 *                 type: string
 *                 description: Name des Weinpackets
 *               description:  
 *                 type: string
 *                 description: Beschreibung des Weinpaketes  
 *     responses:
 *       201:
 *         description: Wine-Package created successfully
 *       400:
 *         description: WinePackage already Exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /wine-packages/get-packages:
 *  get:
 *    summary: Get all WinePackages
 *    tags: [WinePackage]
 *    responses:
 *       200:
 *         description: WinePackages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WinePackage'
 *       404:
 *         description: No WinePackages found
 *       500:
 *         description: Internal server error
 */


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

exports.getPackageCount = (req, res) => {
    db.get(`SELECT COUNT(*) AS count FROM wine_packages`, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json({ count: row.count })
    });
}

exports.deleteWinePackage = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM wine_packages WHERE package_id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Weinpaket gelöscht!" });
    });
};

