CREATE TABLE IF NOT EXISTS users
(
    user_id     INT AUTO_INCREMENT PRIMARY KEY,
    username    varchar(250)             NOT NULL UNIQUE,
    firstname   varchar(250)             NOT NULL,
    lastname    varchar(250)             NOT NULL,
    password    varchar(250)             NOT NULL,
    email       varchar(250)             NOT NULL UNIQUE,
    birthdate    DATE                     NOT NULL,
    status      VARCHAR(255)             NOT NULL,
    reset_token VARCHAR(255),
    role        ENUM ('user', 'vintner', 'admin') NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login  TIMESTAMP default CURRENT_TIMESTAMP
);

-- Tabelle für Vintner (Winzer)
CREATE TABLE IF NOT EXISTS vintner
(
    vintner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT UNIQUE,
    package_id INT,
    winery     varchar(250) NOT NULL,
    awards     varchar(250),
    history    varchar(250),
    image      BLOB,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- Tabelle für Lieferadressen
CREATE TABLE IF NOT EXISTS shipping_address
(
    address_id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id            INT  NOT NULL,
    street             TEXT NOT NULL,
    house_number       TEXT NOT NULL,
    postal_code        INT  NOT NULL,
    city               TEXT NOT NULL,
    vintner_vintner_id INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS wine_packages
(
    wine_package_id      INT AUTO_INCREMENT PRIMARY KEY,
    package_name         VARCHAR(255)   NOT NULL UNIQUE,
    description          VARCHAR(255)   NOT NULL,
    wine_count           INT            NOT NULL,
    vintner              VARCHAR(255)   NOT NULL,
    price                DECIMAL(10, 2) NOT NULL,
    suitable_for_persons INT            NOT NULL,
    image                BLOB
);

CREATE TABLE IF NOT EXISTS wine
(
    wine_id   INT AUTO_INCREMENT PRIMARY KEY,
    wine_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS wine_package_wine
(
    wine_package_id INT NOT NULL,
    wine_id         INT NOT NULL,
    quantity        INT NOT NULL,
    PRIMARY KEY (wine_package_id, wine_id),
    FOREIGN KEY (wine_package_id) REFERENCES wine_packages (wine_package_id) ON DELETE CASCADE,
    FOREIGN KEY (wine_id) REFERENCES wine (wine_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS shipping_cart (
    shipping_cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id          INT,
    quantity         INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wine_packages_shipping_cart
(
    wine_package_id  INT,
    shipping_cart_id INT,
    quantity         INT,
    PRIMARY KEY (wine_package_id, shipping_cart_id),
    FOREIGN KEY (wine_package_id) REFERENCES wine_packages (wine_package_id) ON DELETE CASCADE,
    FOREIGN KEY (shipping_cart_id) REFERENCES shipping_cart (shipping_cart_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS orders (
    order_id     INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT            ,
    ordered_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    status       VARCHAR(255),
    shipping_cart_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (shipping_cart_id) REFERENCES shipping_cart (shipping_cart_id) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS wine_package_reviews
(
    review_id         INT AUTO_INCREMENT PRIMARY KEY,
    wine_package_id        INT NOT NULL,
    user_id           INT NOT NULL,
    rating            INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text       VARCHAR(500),
    review_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wine_package_id) REFERENCES wine_packages (wine_package_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS answers (
    answer_id   INT AUTO_INCREMENT PRIMARY KEY,
    wine_id     INT NOT NULL,
    answer1     VARCHAR(255) NOT NULL,
    answer2     VARCHAR(255) NOT NULL,
    answer3     VARCHAR(255) NOT NULL,
    answer4     VARCHAR(255) NOT NULL,
    is_correct1 INT        NOT NULL,
    is_correct2 INT        NOT NULL,
    is_correct3 INT        NOT NULL,
    is_correct4 INT        NOT NULL,
    FOREIGN KEY (wine_id) REFERENCES wine (wine_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quizzes (
    quizzes_id    INT AUTO_INCREMENT PRIMARY KEY,
    host          VARCHAR(255) NOT NULL,
    status        BOOLEAN NOT NULL,
    quiz_key      INT,
    answer_id     INT,
    wine_package_id INT,
    FOREIGN KEY (answer_id) REFERENCES answers (answer_id) ON DELETE CASCADE,
    FOREIGN KEY (wine_package_id) REFERENCES wine_packages (wine_package_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS score
(
    score_id INT AUTO_INCREMENT PRIMARY KEY,
    score    INT NOT NULL
);

CREATE TABLE participants
(
    participants_id  INT AUTO_INCREMENT PRIMARY KEY,
    participant_name VARCHAR(255)
);



