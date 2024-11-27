const { db } = require("../config/database");


/**
 * @swagger
 * /cart/{user_id}:
 *   get:
 *     summary: Get the shopping cart for a user
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Shopping cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       package_name:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       quantity:
 *                         type: integer
 *                       total_price:
 *                         type: number
 *                         format: float
 *       404:
 *         description: Shopping cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /cart/{user_id}:
 *   post:
 *     summary: Add an item to the shopping cart
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - package_id
 *               - quantity
 *             properties:
 *               package_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart_id:
 *                   type: integer
 *                 package_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       400:
 *         description: Bad request (missing package_id or quantity)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /cart/{user_id}:
 *   patch:
 *     summary: Update the quantity of an item in the shopping cart
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - package_id
 *               - quantity
 *             properties:
 *               package_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Item or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (missing package_id or quantity)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /cart/{user_id}/{package_id}:
 *   delete:
 *     summary: Remove an item from the shopping cart
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *       - in: path
 *         name: package_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the package to remove
 *     responses:
 *       200:
 *         description: Item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Cart or item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (missing package_id)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */




exports.getCart = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const [rows] = await db.query(
      `
            SELECT wp.package_name, wp.price, cwp.quantity, (wp.price * cwp.quantity) AS total_price
            FROM shopping_cart sc
            JOIN cart_wine_packages cwp ON sc.cart_id = cwp.cart_id
            JOIN wine_packages wp ON cwp.package_id = wp.package_id
            WHERE sc.user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    res.json({ cart: rows });
  } catch (err) {
    console.error("Datenbankabfrage fehlgeschlagen:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.params.user_id;
  const { package_id, quantity } = req.body;

  if (!package_id || !quantity) {
    return res
      .status(400)
      .json({ message: "Package ID und Menge sind erforderlich" });
  }

  try {
    const [cartResult] = await db.query(
      "SELECT cart_id FROM shopping_cart WHERE user_id = ?",
      [userId]
    );

    let cartId;
    if (cartResult.length === 0) {
      const [createCartResult] = await db.query(
        "INSERT INTO shopping_cart (user_id) VALUES (?)",
        [userId]
      );
      cartId = createCartResult.insertId;
    } else {
      cartId = cartResult[0].cart_id;
    }

    const [addPackageResult] = await db.query(
      `
            INSERT INTO cart_wine_packages (cart_id, package_id, quantity)
            VALUES (?, ?, ?)`,
      [cartId, package_id, quantity]
    );

    res.status(201).json({
      message: "Weinpaket hinzugefügt",
      cart_id: cartId,
      package_id,
      quantity,
    });
  } catch (err) {
    console.error("Fehler beim Hinzufügen des Weinpakets:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.params.user_id;
  const { package_id, quantity } = req.body;

  if (!package_id || !quantity) {
    return res
      .status(400)
      .json({ message: "Package ID und Menge sind erforderlich" });
  }

  try {
    const [cartResult] = await db.query(
      "SELECT cart_id FROM shopping_cart WHERE user_id = ?",
      [userId]
    );

    if (cartResult.length === 0) {
      return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    const cartId = cartResult[0].cart_id;

    const [updateResult] = await db.query(
      `
            UPDATE cart_wine_packages
            SET quantity = ?
            WHERE cart_id = ? AND package_id = ?`,
      [quantity, cartId, package_id]
    );

    if (updateResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Weinpaket nicht im Warenkorb gefunden" });
    }

    res.json({ message: "Menge des Weinpakets aktualisiert" });
  } catch (err) {
    console.error("Fehler beim Aktualisieren der Menge:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.params.user_id;
  const packageId = req.params.package_id; // package_id wird aus der URL entnommen

  if (!packageId) {
    return res.status(400).json({ message: "Package ID ist erforderlich" });
  }

  try {
    // Prüfe, ob der Benutzer einen Warenkorb hat
    const [cartResult] = await db.query(
      "SELECT cart_id FROM shopping_cart WHERE user_id = ?",
      [userId]
    );

    if (cartResult.length === 0) {
      return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    const cartId = cartResult[0].cart_id;

    // Entferne das Produkt aus dem Warenkorb
    const [deleteResult] = await db.query(
      `
              DELETE FROM cart_wine_packages
              WHERE cart_id = ? AND package_id = ?`,
      [cartId, packageId]
    );

    if (deleteResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Weinpaket nicht im Warenkorb gefunden" });
    }

    res.json({ message: "Weinpaket aus dem Warenkorb entfernt" });
  } catch (err) {
    console.error("Fehler beim Entfernen des Weinpakets:", err);
    return res.status(500).json({ error: err.message });
  }
};
