const { db } = require("../config/database");

/**
 * @swagger
 * /cart/{user_id}:
 *   get:
 *     summary: Abrufen des Warenkorbs eines Benutzers
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Benutzers
 *     responses:
 *       200:
 *         description: Warenkorb erfolgreich abgerufen
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
 *         description: Warenkorb nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *   post:
 *     summary: Hinzufügen eines Artikels zum Warenkorb
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Benutzers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wine_package_id
 *               - quantity
 *             properties:
 *               wine_package_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Artikel erfolgreich hinzugefügt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 shipping_cart_id:
 *                   type: integer
 *                 wine_package_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       400:
 *         description: Ungültige Anfrage (fehlende package_id oder Menge)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *   patch:
 *     summary: Aktualisieren der Menge eines Artikels im Warenkorb
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Benutzers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wine_package_id
 *               - quantity
 *             properties:
 *               wine_package_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Menge erfolgreich aktualisiert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Artikel oder Warenkorb nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Ungültige Anfrage (fehlende package_id oder Menge)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Interner Serverfehler
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 * /cart/{user_id}/{wine_package_id}:
 *   delete:
 *     summary: Entfernen eines Artikels aus dem Warenkorb
 *     tags: [Shopping Cart]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des Benutzers
 *       - in: path
 *         name: wine_package_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Die ID des zu entfernenden Pakets
 *     responses:
 *       200:
 *         description: Artikel erfolgreich entfernt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Warenkorb oder Artikel nicht gefunden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Ungültige Anfrage (fehlende package_id)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Interner Serverfehler
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
      SELECT wp.wine_package_id, wp.package_name, wp.price, wpsc.quantity, (wp.price * wpsc.quantity) AS total_price
      FROM shipping_cart sc
      JOIN wine_packages_shipping_cart wpsc ON sc.shipping_cart_id = wpsc.shipping_cart_id
      JOIN wine_packages wp ON wpsc.wine_package_id = wp.wine_package_id
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
  const { wine_package_id, quantity } = req.body;

  if (!wine_package_id || !quantity) {
    return res
      .status(400)
      .json({ message: "Package ID und Menge sind erforderlich" });
  }

  try {
    const [cartResult] = await db.query(
      "SELECT shipping_cart_id FROM shipping_cart WHERE user_id = ?",
      [userId]
    );

    let shippingCartId;
    if (cartResult.length === 0) {
      const [createCartResult] = await db.query(
        "INSERT INTO shipping_cart (user_id, quantity) VALUES (?, 0)",
        [userId]
      );
      shippingCartId = createCartResult.insertId;
    } else {
      shippingCartId = cartResult[0].shipping_cart_id;
    }

    const [addPackageResult] = await db.query(
      `
      INSERT INTO wine_packages_shipping_cart (shipping_cart_id, wine_package_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [shippingCartId, wine_package_id, quantity]
    );

    res.status(201).json({
      message: "Weinpaket hinzugefügt",
      shipping_cart_id: shippingCartId,
      wine_package_id,
      quantity,
    });
  } catch (err) {
    console.error("Fehler beim Hinzufügen des Weinpakets:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.params.user_id;
  const { wine_package_id, quantity } = req.body;

  if (!wine_package_id || !quantity) {
    return res
      .status(400)
      .json({ message: "Package ID und Menge sind erforderlich" });
  }

  try {
    const [cartResult] = await db.query(
      "SELECT shipping_cart_id FROM shipping_cart WHERE user_id = ?",
      [userId]
    );

    if (cartResult.length === 0) {
      return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    const shippingCartId = cartResult[0].shipping_cart_id;

    const [updateResult] = await db.query(
      `
      UPDATE wine_packages_shipping_cart
      SET quantity = ?
      WHERE shipping_cart_id = ? AND wine_package_id = ?`,
      [quantity, shippingCartId, wine_package_id]
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
  const winePackageId = req.params.wine_package_id;

  if (!winePackageId) {
    return res.status(400).json({ message: "Package ID ist erforderlich" });
  }

  try {
    // Überprüfen, ob der Benutzer einen Warenkorb hat
    const [cartResult] = await db.query(
      "SELECT shipping_cart_id FROM shipping_cart WHERE user_id = ?",
      [userId]
    );

    if (!cartResult || cartResult.length === 0) {
      return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    const shippingCartId = cartResult[0].shipping_cart_id;

    // Löschen des Weinpakets aus dem Warenkorb
    const [deleteResult] = await db.query(
      `
      DELETE FROM wine_packages_shipping_cart
      WHERE shipping_cart_id = ? AND wine_package_id = ?`,
      [shippingCartId, winePackageId]
    );

    if (!deleteResult.affectedRows) {
      return res
        .status(404)
        .json({ message: "Weinpaket nicht im Warenkorb gefunden" });
    }

    return res.json({ message: "Weinpaket aus dem Warenkorb entfernt" });
  } catch (err) {
    console.error("Fehler beim Entfernen des Weinpakets:", err);
    return res.status(500).json({ error: "Interner Serverfehler" });
  }
};

exports.updateShippingID = async (req, res) => {
  const userId = req.params.user_id;
  const { shipping_id } = req.body;

  // Überprüfen, ob eine shipping_id übergeben wurde
  if (!shipping_id) {
    return res.status(400).json({ message: "Shipping ID ist erforderlich" });
  }

  try {
    // Überprüfen, ob der Benutzer einen Warenkorb hat
    const [cartResult] = await db.query(
      "SELECT shipping_cart_id FROM shipping_cart WHERE user_id = ?",
      [userId]
    );

    if (!cartResult || cartResult.length === 0) {
      return res.status(404).json({ message: "Warenkorb nicht gefunden" });
    }

    const shippingCartId = cartResult[0].shipping_cart_id;

    // Aktualisieren der shipping_id im Warenkorb
    const [updateResult] = await db.query(
      `
      UPDATE shipping_cart
      SET shipping_id = ?
      WHERE shipping_cart_id = ?
      `,
      [shipping_id, shippingCartId]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Warenkorb konnte nicht aktualisiert werden" });
    }

    res.json({ message: "Shipping ID erfolgreich aktualisiert" });
  } catch (err) {
    console.error("Fehler beim Aktualisieren der Shipping ID:", err);
    return res.status(500).json({ error: err.message });
  }
};
