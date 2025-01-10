const { db } = require("../config/database");
require("mysql2/promise");

/**
 * @swagger
 /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       package_id:
 *                         type: integer
 *                         example: 1
 *                       package_name:
 *                         type: string
 *                         example: Exquisite Wine Package
 *                       description:
 *                         type: string
 *                         example: A selection of fine wines from around the world.
 *                       wine_count:
 *                         type: integer
 *                         example: 6
 *                       vintner:
 *                         type: string
 *                         example: Top Vineyard
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 129.99
 *                       suitable_for_persons:
 *                         type: integer
 *                         example: 4
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     package_id:
 *                       type: integer
 *                     package_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     wine_count:
 *                       type: integer
 *                     vintner:
 *                       type: string   
 *                     price:
 *                       type: number
 *                       format: float                   
 *                     suitable_for_persons:
 *                       type: integer
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Produkt nicht gefunden
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */




 exports.getProducts = async (req, res) => {
  try {
    // Abfrage für alle Weinpakete
    const [packages] = await db.query(`SELECT * FROM wine_packages`);

    // Abfrage für alle Weine, die zu den Weinpaketen gehören
    const [wine] = await db.query(`SELECT * FROM wines`);

    // Zuordnung der Weine zu den jeweiligen Weinpaketen
    const products = packages.map((pkg) => {
      return {
        ...pkg,
        wine: wine.filter((wine) => wine.wine_package_id === pkg.wine_package_id),
      };
    });

    res.json({ products });
  } catch (err) {
    console.error("Datenbankabfrage fehlgeschlagen:", err);
    return res.status(500).json({ error: err.message });
  }
};


  exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM wine_packages WHERE wine_package_id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Produkt nicht gefunden' });
        }

        res.json({ product: rows[0] });
    } catch (err) {
        console.error('Datenbankabfrage fehlgeschlagen:', err);
        return res.status(500).json({ error: err.message });
    }
};


