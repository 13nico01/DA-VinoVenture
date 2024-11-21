-- Tabelle für Benutzer erstellen
CREATE TABLE
    IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        birthdate DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        role VARCHAR(255) NOT NULL,
        last_login TIMESTAMP,
        status VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255)
    );

-- Tabelle für die Lieferadresse der einzelnen Benutzer
CREATE TABLE
    IF NOT EXISTS shipping_address (
        address_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        street VARCHAR(255) NOT NULL,
        house_number VARCHAR(10) NOT NULL,
        postal_code INT NOT NULL,
        city VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
    );

-- Tabelle für Weinpakete
CREATE TABLE
    IF NOT EXISTS wine_packages (
        package_id INT AUTO_INCREMENT PRIMARY KEY,
        package_name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        wine_count INT NOT NULL,
        vintner VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL, -- Preis mit zwei Dezimalstellen
        suitable_for_persons INT NOT NULL,
        image BLOB
    );

-- Tabelle für Bestellungen
CREATE TABLE
    IF NOT EXISTS orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT,
        shipping_address_id INT,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL,
        FOREIGN KEY (shipping_address_id) REFERENCES shipping_address (address_id) ON DELETE SET NULL
    );

-- Verbindung zwischen Bestellungen und Weinpaketen
CREATE TABLE
    IF NOT EXISTS order_wine_packages (
        order_wine_id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        package_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE,
        FOREIGN KEY (package_id) REFERENCES wine_packages (package_id) ON DELETE CASCADE
    );

-- Bewertungen der einzelnen Weinpakete
CREATE TABLE
    IF NOT EXISTS wine_package_reviews (
        review_id INT AUTO_INCREMENT PRIMARY KEY,
        package_id INT NOT NULL,
        user_id INT NOT NULL,
        rating INT NOT NULL CHECK (
            rating >= 1
            AND rating <= 5
        ), -- CHECK nur in MySQL 8.x
        review_text TEXT,
        review_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (package_id) REFERENCES wine_packages (package_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
    );

-- Tabelle für die Quizzes der einzelnen Weinpakete
CREATE TABLE
    IF NOT EXISTS quizzes (
        quiz_id INT AUTO_INCREMENT PRIMARY KEY,
        participant VARCHAR(255),
        host_id INT NOT NULL,
        package_id INT NOT NULL,
        question TEXT NOT NULL,
        FOREIGN KEY (host_id) REFERENCES users (user_id) ON DELETE CASCADE,
        FOREIGN KEY (package_id) REFERENCES wine_packages (package_id) ON DELETE CASCADE
    );

-- Antworten zu den Quizzes
CREATE TABLE
    IF NOT EXISTS answers (
        answer_id INT AUTO_INCREMENT PRIMARY KEY,
        quiz_id INT NOT NULL,
        answer_text TEXT NOT NULL,
        is_correct TINYINT (1) NOT NULL, -- BOOLEAN als TINYINT(1)
        FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE
    );
    