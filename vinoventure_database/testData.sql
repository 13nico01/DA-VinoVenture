-- Testdaten für Benutzer, Admins und Vintner
INSERT INTO users (username, firstname, lastname, password, email, birthdate, status, role)
VALUES
-- 15 Benutzer
('user', 'Max', 'Mustermann', 'user', 'max.mustermann@example.at', '1990-01-01', 'active', 'user'),
('anna.schmidt', 'Anna', 'Schmidt', 'Test1234', 'anna.schmidt@example.at', '1985-05-15', 'active', 'user'),
('lena.mayer', 'Lena', 'Mayer', 'Test1234', 'lena.mayer@example.at', '1992-08-30', 'active', 'user'),
('tom.oberhofer', 'Tom', 'Oberhofer', 'Test1234', 'tom.oberhofer@example.at', '1988-03-22', 'active', 'user'),
('hannah.fischer', 'Hannah', 'Fischer', 'Test1234', 'hannah.fischer@example.at', '1995-12-10', 'active', 'user'),
('karl.bauer', 'Karl', 'Bauer', 'Test1234', 'karl.bauer@example.at', '1987-06-12', 'active', 'user'),
('eva.schneider', 'Eva', 'Schneider', 'Test1234', 'eva.schneider@example.at', '1993-11-21', 'active', 'user'),
('martin.wagner', 'Martin', 'Wagner', 'Test1234', 'martin.wagner@example.at', '1991-04-13', 'active', 'user'),
('nina.schuster', 'Nina', 'Schuster', 'Test1234', 'nina.schuster@example.at', '1989-07-25', 'active', 'user'),
('alexander.pohl', 'Alexander', 'Pohl', 'Test1234', 'alexander.pohl@example.at', '1994-02-17', 'active', 'user'),
('julian.koch', 'Julian', 'Koch', 'Test1234', 'julian.koch@example.at', '1990-10-03', 'active', 'user'),
('sophia.huber', 'Sophia', 'Huber', 'Test1234', 'sophia.huber@example.at', '1996-01-29', 'active', 'user'),
('benjamin.klein', 'Benjamin', 'Klein', 'Test1234', 'benjamin.klein@example.at', '1986-09-08', 'active', 'user'),
('maria.weiß', 'Maria', 'Weiß', 'Test1234', 'maria.weiss@example.at', '1984-11-02', 'active', 'user'),
('oliver.schwarz', 'Oliver', 'Schwarz', 'Test1234', 'oliver.schwarz@example.at', '1992-05-17', 'active', 'user'),


('admin', 'Johann', 'Weinbauer', 'admin', 'weinbauer1@example.at', '1970-10-18', 'active', 'admin');

-- Testdaten für Weinpakete
INSERT INTO wine_packages (package_name, description, wine_count, vintner, price, suitable_for_persons, image)
VALUES
-- 1. Paket
('Wiener Gemischter Satz', 'Eine Mischung aus verschiedenen weißen Rebsorten, typisch für Wien.', 6, 'Weingut Mayer am Pfarrplatz', 49.99, 2, NULL),
-- 2. Paket
('Grüner Veltliner', 'Frisch und fruchtig, der typische österreichische Grüner Veltliner.', 6, 'Weingut Knoll', 59.99, 4, NULL),
-- 3. Paket
('Krems Pinot Blanc', 'Elegant und mild, ideal für ein Glas zu besonderen Anlässen.', 6, 'Weingut Lang', 45.00, 2, NULL),
-- 4. Paket
('Wachauer Riesling', 'Der Wachauer Riesling ist bekannt für seine Frische und Mineralität.', 6, 'Weingut F.X. Pichler', 75.00, 4, NULL),
-- 5. Paket
('Zweigelt aus dem Burgenland', 'Ein kräftiger und würziger Rotwein aus dem Burgenland.', 6, 'Weingut Juris', 39.50, 4, NULL),
-- 6. Paket
('Steirischer Schilcher', 'Ein erfrischender Rosé-Wein aus der Steiermark.', 6, 'Weingut Tement', 55.00, 2, NULL),
-- 7. Paket
('Poysdorfer Blaufränkisch', 'Vollmundiger Rotwein mit feinen Tanninen, typisch für das Weinviertel.', 6, 'Weingut Schloss Gobelsburg', 48.00, 4, NULL),
-- 8. Paket
('Niederösterreichische Cuvée', 'Eine rote Cuvée aus verschiedenen Rebsorten aus Niederösterreich.', 6, 'Weingut Christ', 65.00, 4, NULL),
-- 9. Paket
('Kremser Terroir', 'Ein Wein, der die Mineralität und das Terroir der Region Krems widerspiegelt.', 6, 'Weingut Jamek', 69.00, 4, NULL),
-- 10. Paket
('Südsteiermark Chardonnay', 'Ein frischer, fruchtiger Chardonnay aus der Südsteiermark.', 6, 'Weingut Erich & Walter Polz', 42.00, 2, NULL),
-- 11. Paket
('Rosé aus der Südsteiermark', 'Ein eleganter Rosé-Wein, ideal für den Sommer.', 6, 'Weingut Hannes Sabathi', 50.00, 2, NULL),
-- 12. Paket
('Wiener Nussberg Grüner Veltliner', 'Der Wiener Grüner Veltliner aus dem Nussberg, fruchtig und mineralisch.', 6, 'Weingut Wieninger', 58.00, 4, NULL),
-- 13. Paket
('Burgenland Cuvée', 'Eine rote Cuvée mit intensiven Fruchtaromen, typisch für das Burgenland.', 6, 'Weingut Heinrich', 62.00, 4, NULL),
-- 14. Paket
('Tullnerfelder Welschriesling', 'Ein spritziger und fruchtiger Weißwein aus dem Tullnerfeld.', 6, 'Weingut Ecker', 45.00, 2, NULL),
-- 15. Paket
('Weinviertler Zweigelt', 'Ein klassischer Rotwein mit würzigen Aromen, typisch für das Weinviertel.', 6, 'Weingut Leth', 52.00, 4, NULL),
-- 16. Paket
('Steirerland Sauvignon Blanc', 'Ein aromatischer Weißwein aus der Steiermark, ideal für Fischgerichte.', 6, 'Weingut Knauss', 58.00, 2, NULL),
-- 18. Paket
('Pannonischer Blaufränkisch', 'Kräftiger Rotwein aus dem pannonischen Raum, vollmundig und harmonisch.', 6, 'Weingut Heinz Schindler', 60.00, 4, NULL),
-- 19. Paket
('Österreichische Klassik', 'Ein Set aus den bekanntesten österreichischen Weinen.', 6, 'Weingut Schloss Halbturn', 79.00, 4, NULL),
-- 20. Paket
('Südtiroler Lagrein', 'Kräftiger, fruchtiger Rotwein aus Südtirol, ideal für Grillabende.', 6, 'Weingut Alois Lageder', 65.00, 4, NULL),
-- 21. Paket
('Wachau Grüner Veltliner', 'Fruchtig und frisch mit einer schönen Säure, ideal zu Fisch.', 6, 'Weingut Franz Hirtzberger', 55.00, 4, NULL),
-- 22. Paket
('Zweigelt Classic', 'Ein eleganter Rotwein aus der österreichischen Rebsorte Zweigelt.', 6, 'Weingut Ott', 46.00, 4, NULL),
-- 23. Paket
('Steirerland Muskateller', 'Fruchtig und blumig, der perfekte Aperitif aus der Steiermark.', 6, 'Weingut Erich Polz', 53.00, 2, NULL),
-- 24. Paket
('Weißburgunder aus der Südsteiermark', 'Ein harmonischer Weißwein, der typisch für die Südsteiermark ist.', 6, 'Weingut Sattlerhof', 47.00, 2, NULL),
-- 25. Paket
('Kremser Grüner Veltliner', 'Erfrischend und ausgewogen, ideal für jedes Essen.', 6, 'Weingut Hiedler', 50.00, 4, NULL);

-- Testdaten für Weine
INSERT INTO wine (wine_name)
VALUES
-- 1. Wein
('Grüner Veltliner'),
-- 2. Wein
('Riesling Wachau'),
-- 3. Wein
('Zweigelt'),
-- 4. Wein
('Blaufränkisch'),
-- 5. Wein
('Sauvignon Blanc Steiermark'),
-- 6. Wein
('Weißburgunder'),
-- 7. Wein
('Pinot Noir'),
-- 8. Wein
('Welschriesling'),
-- 9. Wein
('Chardonnay'),
-- 10. Wein
('Muskateller'),
-- 11. Wein
('Cabernet Sauvignon'),
-- 12. Wein
('Syrah'),
-- 13. Wein
('Grüner Veltliner Federspiel'),
-- 14. Wein
('Pinot Blanc'),
-- 15. Wein
('Blauer Portugieser'),
-- 16. Wein
('Sangiovese'),
-- 17. Wein
('Tempranillo'),
-- 18. Wein
('Lemberger'),
-- 19. Wein
('Garnacha'),
-- 20. Wein
('Merlot'),
-- 21. Wein
('Cuvée Rot'),
-- 22. Wein
('Cuvée Weiß'),
-- 23. Wein
('Rosé aus Zweigelt'),
-- 24. Wein
('Trollinger'),
-- 25. Wein
('Grüner Veltliner Kamptal');

-- Testdaten für wine_package_wine
INSERT INTO wine_package_wine (wine_package_id, wine_id, quantity)
VALUES
-- Weinpaket 1
(1, 1, 3),  -- Grüner Veltliner in Weinpaket 1, Menge: 3 Flaschen
(1, 2, 2),  -- Riesling Wachau in Weinpaket 1, Menge: 2 Flaschen
(1, 3, 5),  -- Zweigelt in Weinpaket 1, Menge: 5 Flaschen

-- Weinpaket 2
(2, 4, 4),  -- Blaufränkisch in Weinpaket 2, Menge: 4 Flaschen
(2, 5, 3),  -- Sauvignon Blanc Steiermark in Weinpaket 2, Menge: 3 Flaschen
(2, 6, 6),  -- Weißburgunder in Weinpaket 2, Menge: 6 Flaschen

-- Weinpaket 3
(3, 7, 2),  -- Pinot Noir in Weinpaket 3, Menge: 2 Flaschen
(3, 8, 4),  -- Welschriesling in Weinpaket 3, Menge: 4 Flaschen
(3, 9, 5),  -- Chardonnay in Weinpaket 3, Menge: 5 Flaschen

-- Weinpaket 4
(4, 10, 3),  -- Muskateller in Weinpaket 4, Menge: 3 Flaschen
(4, 11, 2),  -- Cabernet Sauvignon in Weinpaket 4, Menge: 2 Flaschen
(4, 12, 4),  -- Syrah in Weinpaket 4, Menge: 4 Flaschen

-- Weinpaket 5
(5, 13, 6),  -- Grüner Veltliner Federspiel in Weinpaket 5, Menge: 6 Flaschen
(5, 14, 3),  -- Pinot Blanc in Weinpaket 5, Menge: 3 Flaschen
(5, 15, 4),  -- Blauer Portugieser in Weinpaket 5, Menge: 4 Flaschen

-- Weinpaket 6
(6, 16, 2),  -- Sangiovese in Weinpaket 6, Menge: 2 Flaschen
(6, 17, 3),  -- Tempranillo in Weinpaket 6, Menge: 3 Flaschen
(6, 18, 5),  -- Lemberger in Weinpaket 6, Menge: 5 Flaschen

-- Weinpaket 7
(7, 19, 4),  -- Garnacha in Weinpaket 7, Menge: 4 Flaschen
(7, 20, 6),  -- Merlot in Weinpaket 7, Menge: 6 Flaschen
(7, 21, 2),  -- Cuvée Rot in Weinpaket 7, Menge: 2 Flaschen

-- Weinpaket 8
(8, 22, 3),  -- Cuvée Weiß in Weinpaket 8, Menge: 3 Flaschen
(8, 23, 5),  -- Rosé aus Zweigelt in Weinpaket 8, Menge: 5 Flaschen
(8, 24, 4),  -- Trollinger in Weinpaket 8, Menge: 4 Flaschen

-- Weinpaket 9
(9, 25, 2),  -- Grüner Veltliner Kamptal in Weinpaket 9, Menge: 2 Flaschen
(9, 1, 3),   -- Grüner Veltliner in Weinpaket 9, Menge: 3 Flaschen
(9, 2, 4);   -- Riesling Wachau in Weinpaket 9, Menge: 4 Flaschen



