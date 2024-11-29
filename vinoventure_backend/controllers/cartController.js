const { db } = require("../config/database");

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
