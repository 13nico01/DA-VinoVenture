-- Tabelle für Benutzer erstellen
CREATE TABLE  IF NOT EXISTS users
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role TEXT not null,
    last_login TIMESTAMP,
    status TEXT NOT NULL,
    reset_token TEXT
);

--Tabelle für die Lieferaddresse der einzelnen user
CREATE TABLE IF NOT EXISTS shipping_address
(
    address_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    street TEXT NOT NULL,
    house_number TEXT NOT NULL,
    postal_code INTEGER NOT NULL,
    city TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- Weinpakete erstellen
CREATE TABLE  IF NOT EXISTS wine_packages
(
    package_id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    wine_count INTEGER NOT NULL,
    vintner TEXT NOT NULL,
    price REAL NOT NULL,
    suitable_for_persons INTEGER NOT NULL,
    image blob
);

CREATE TABLE  IF NOT EXISTS orders
(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    shipping_address_id INTEGER,
    total_amount real NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (shipping_address_id) REFERENCES shipping_address(address_id) ON DELETE SET NULL
);



-- Verbindung zwischen orders und wine_packages
CREATE TABLE  IF NOT EXISTS order_wine_packages
(
    order_wine_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES wine_packages(package_id) ON DELETE CASCADE
);

-- Bewertungen der einzelnen Weinpakete
CREATE TABLE  IF NOT EXISTS wine_package_reviews
(
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES wine_packages(package_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Tabelle für die quizzes der einzelnen Weinpakete
CREATE TABLE IF NOT EXISTS quizzes
(
    quiz_id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant TEXT,
    host_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (host_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES wine_packages(package_id) ON DELETE CASCADE
);


-- Antworten der quizzes
CREATE TABLE  IF NOT EXISTS answers
(
    answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);



