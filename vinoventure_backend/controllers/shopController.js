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
  
      // Abfrage für das Weinpaket basierend auf der wine_package_id
      const [rows] = await db.query('SELECT * FROM wine_packages WHERE wine_package_id = ?', [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Produkt nicht gefunden' });
      }
  
      // Abfrage für die Zuordnung von Weinen zu diesem Weinpaket
      const [packageWineRelations] = await db.query('SELECT * FROM wine_package_wine WHERE wine_package_id = ?', [id]);
  
      // Abfrage für alle Weine
      const [wines] = await db.query('SELECT * FROM wine');
  
      // Extrahiere die zugehörigen Wein-IDs
      const relatedWineIds = packageWineRelations.map((relation) => relation.wine_id);
  
      // Finde die Weine anhand der wine_ids und gebe nur den Namen zurück
      const relatedWines = wines.filter((wine) => relatedWineIds.includes(wine.wine_id))
        .map((wine) => ({
          wine_id: wine.wine_id,
          wine_name: wine.wine_name, // Nur den Wein-Namen ausgeben
        }));
  
      // Füge die Weine zum Produkt hinzu
      const product = {
        ...rows[0],
        wines: relatedWines,
      };
  
      res.json({ product });
    } catch (err) {
      console.error('Datenbankabfrage fehlgeschlagen:', err);
      return res.status(500).json({ error: err.message });
    }
  };
  

