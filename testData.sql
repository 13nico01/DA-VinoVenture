INSERT INTO users (firstname, lastname, password, email, birthdate, street_address, postal_code, city, country, role)
VALUES
('Max', 'Müller', 'passwortMax123', 'max.mueller@example.com', '1990-01-15', 'Musterstraße 1', 1010, 'Wien', 'Österreich', 'admin'),
('Anna', 'Schmidt', 'AnnaSchmidt456', 'anna.schmidt@example.com', '1992-02-20', 'Beispielweg 2', 1020, 'Wien', 'Österreich', 'kunde'),
('Lukas', 'Huber', 'HuberLukas789', 'lukas.huber@example.com', '1985-03-25', 'Teststraße 3', 1030, 'Wien', 'Österreich', 'kunde'),
('Laura', 'Fischer', 'LauraFischer234', 'laura.fischer@example.com', '1995-04-30', 'Feldgasse 4', 1040, 'Wien', 'Österreich', 'kunde'),
('David', 'Weber', 'WeberDavid321', 'david.weber@example.com', '1988-05-05', 'Wiesenweg 5', 1050, 'Wien', 'Österreich', 'kunde'),
('Eva', 'Peters', 'PetersEva654', 'eva.peters@example.com', '1993-06-10', 'Blumenstraße 6', 1060, 'Wien', 'Österreich', 'kunde'),
('Tobias', 'Klein', 'KleinTobias987', 'tobias.klein@example.com', '1987-07-15', 'Lindenweg 7', 1070, 'Wien', 'Österreich', 'admin'),
('Sophie', 'Meyer', 'SophieMeyer654', 'sophie.meyer@example.com', '1994-08-20', 'Bergstraße 8', 1080, 'Wien', 'Österreich', 'kunde'),
('Jan', 'Schneider', 'SchneiderJan987', 'jan.schneider@example.com', '1983-09-25', 'Talweg 9', 1090, 'Wien', 'Österreich', 'kunde'),
('Sarah', 'Schwarz', 'SarahSchwarz321', 'sarah.schwarz@example.com', '1991-10-30', 'Sonnenweg 10', 1100, 'Wien', 'Österreich', 'kunde'),
('Paul', 'Zimmermann', 'PaulZimm789', 'paul.zimmermann@example.com', '1996-11-05', 'Mondstraße 11', 1110, 'Wien', 'Österreich', 'kunde'),
('Lisa', 'Wolf', 'WolfLisa234', 'lisa.wolf@example.com', '1989-12-10', 'Sternweg 12', 1120, 'Wien', 'Österreich', 'kunde'),
('Michael', 'Koch', 'KochMichael123', 'michael.koch@example.com', '1984-01-20', 'Felsenweg 13', 1130, 'Wien', 'Österreich', 'kunde'),
('Julia', 'Schmitt', 'SchmittJulia456', 'julia.schmitt@example.com', '1992-02-25', 'Eichenweg 14', 1140, 'Wien', 'Österreich', 'kunde'),
('Felix', 'Hoffmann', 'HoffmannFelix789', 'felix.hoffmann@example.com', '1993-03-30', 'Ahornstraße 15', 1150, 'Wien', 'Österreich', 'kunde'),
('Marie', 'Schulte', 'SchulteMarie234', 'marie.schulte@example.com', '1995-04-10', 'Eisenweg 16', 1160, 'Wien', 'Österreich', 'kunde'),
('Leon', 'Kramer', 'KramerLeon654', 'leon.kramer@example.com', '1986-05-15', 'Grünweg 17', 1170, 'Wien', 'Österreich', 'kunde'),
('Nina', 'Wagner', 'WagnerNina987', 'nina.wagner@example.com', '1982-06-20', 'Waldstraße 18', 1180, 'Wien', 'Österreich', 'kunde'),
('Tim', 'Schröder', 'SchroederTim321', 'tim.schroeder@example.com', '1990-07-25', 'Rosenweg 19', 1190, 'Wien', 'Österreich', 'kunde'),
('Hannah', 'Jäger', 'JaegerHannah654', 'hannah.jaeger@example.com', '1994-08-30', 'Grabenweg 20', 1200, 'Wien', 'Österreich', 'kunde');


-- Weinpakete
INSERT INTO wine_packages (package_name, description, wine_count, winemaker, price, suitable_for_persons) VALUES
('Weinpaket Grüner Veltliner', 'Ein erfrischender Grüner Veltliner aus der Wachau mit fruchtigen Aromen und einem mineralischen Abgang.', 6, 'Weingut Franz Hirtzberger', 99.90, 2),
('Rotwein-Paket Burgenland', 'Ein kräftiges Rotwein-Paket mit Cabernet Sauvignon und Blaufränkisch aus dem Burgenland.', 4, 'Weingut Moric', 89.50, 2),
('Österreichische Weißweine', 'Ausgewählte Weißweine aus verschiedenen österreichischen Regionen, ideal für den Sommer.', 3, 'Weingut Stagard', 79.90, 4),
('Süßwein-Paket von Kracher', 'Eine Auswahl von edelsüßen Weinen des berühmten Weinguts Kracher aus dem Burgenland.', 2, 'Weingut Kracher', 120.00, 2),
('Gemischtes Weinpaket', 'Eine Mischung aus Rot-, Weiß- und Roséweinen, perfekt für jede Gelegenheit.', 5, 'Weingut Wieninger', 95.00, 4),
('Sekt-Paket Österreich', 'Ein prickelndes Paket mit österreichischem Sekt, perfekt für Feiern.', 3, 'Weingut Szigeti', 65.00, 2);

-- Bestellungen
INSERT INTO orders (created_at, user_id) VALUES
('2024-09-01 14:30:00', 11),
('2024-09-02 10:15:00', 6),
('2024-09-03 18:45:00', 8),
('2024-09-04 12:00:00', 11),
('2024-09-05 09:30:00', 8),
('2024-09-06 16:00:00', 10);

INSERT INTO order_wine_packages (order_id, package_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 1, 1);

INSERT INTO wine_package_reviews (package_id, user_id, rating, review_text)
VALUES
(1, 1, 5, 'Ausgezeichnetes Weinpaket, jede Flasche hat mir gefallen!'),
(2, 2, 4, 'Tolle Auswahl, aber eine Flasche war nicht nach meinem Geschmack.'),
(1, 3, 3, 'Durchschnittliches Paket, einige Weine waren besser als andere.');


INSERT INTO quizzes (package_id, question)
VALUES
(1, 'Was ist die Hauptrebsorte in diesem Weinpaket?'),
(1, 'Wie sollte dieser Wein serviert werden?'),
(1, 'Welches Land ist bekannt für die Herstellung von Chianti-Weinen?'),
(1, 'Welche der folgenden Weinregionen liegt in Österreich?');

INSERT INTO answers (quiz_id, answer_text, is_correct)
VALUES
-- Antworten für Frage 1
(1, 'Cabernet Sauvignon', TRUE),
(1, 'Merlot', FALSE),
(1, 'Chardonnay', FALSE),
(1, 'Pinot Noir', FALSE),

-- Antworten für Frage 2
(2, 'Gekühlt', TRUE),
(2, 'Bei Zimmertemperatur', FALSE),
(2, 'Warm', FALSE),
(2, 'Keine der oben genannten', FALSE),

-- Antworten für Frage 3
(3, 'Frankreich', FALSE),
(3, 'Italien', TRUE),
(3, 'Spanien', FALSE),
(3, 'Deutschland', FALSE),

-- Antworten für Frage 4
(4, 'Bordeaux', FALSE),
(4, 'Napa Valley', FALSE),
(4, 'Wachau', TRUE),
(4, 'Rioja', FALSE);
