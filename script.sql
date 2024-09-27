-- Tabelle für Benutzer erstellen
CREATE TABLE users
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    street_address TEXT,
    postal_code INTEGER,
    city TEXT,
    country TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role TEXT not null
);


-- Weinpakete erstellen
CREATE TABLE wine_packages
(
    package_id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    wine_count INTEGER NOT NULL,
    vintner TEXT NOT NULL,
    price REAL NOT NULL,
    suitable_for_persons INTEGER NOT NULL
);

-- Bestellungen erstellen
CREATE TABLE orders
(
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);


-- Verbindung zwischen orders und wine_packages
CREATE TABLE order_wine_packages
(
    order_wine_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES wine_packages(package_id) ON DELETE CASCADE
);


CREATE TABLE quizzes
(
    quiz_id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL
);


CREATE TABLE answers
(
    answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    answer TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);
