INSERT INTO users (username, firstname, lastname, password, email, birthdate, status, role)
VALUES
('user', 'Johann', 'Müller', 'user', 'johann.mueller@gmail.com', '1990-05-14', 'active', 'user'),
('katl95', 'Katharina', 'Lechner', 'securepass1', 'katharina.lechner@gmail.com', '1995-03-20', 'active', 'user'),
('franziskahuber', 'Franziska', 'Huber', 'securepass2', 'franziska.huber@gmail.com', '1987-07-12', 'active', 'user'),
('maximilian.k', 'Maximilian', 'Klein', 'securepass3', 'max.klein@gmail.com', '1992-11-23', 'inactive', 'user'),
('lauragruber', 'Laura', 'Gruber', 'securepass4', 'laura.gruber@gmail.com', '1998-01-30', 'active', 'user'),
('lukas.k', 'Lukas', 'Koller', 'securepass5', 'lukas.koller@gmail.com', '1985-06-25', 'inactive', 'user'),
('anna.schmidt', 'Anna', 'Schmidt', 'securepass6', 'anna.schmidt@gmail.com', '1990-04-15', 'active', 'user'),
('petermaier', 'Peter', 'Maier', 'securepass7', 'peter.maier@gmail.com', '1983-09-10', 'active', 'user'),
('sabrinafischer', 'Sabrina', 'Fischer', 'securepass8', 'sabrina.fischer@gmail.com', '1997-08-18', 'active', 'user'),
('philiplang', 'Philipp', 'Lang', 'securepass9', 'philipp.lang@gmail.com', '1989-12-05', 'active', 'user'),
('marie.kaufmann', 'Marie', 'Kaufmann', 'securepass10', 'marie.kaufmann@gmail.com', '1993-03-28', 'inactive', 'user'),
('daniel.p', 'Daniel', 'Pichler', 'securepass11', 'daniel.pichler@gmail.com', '1986-07-22', 'active', 'user'),
('jacqueline.hofer', 'Jacqueline', 'Hofer', 'securepass12', 'jacqueline.hofer@gmail.com', '1994-09-14', 'active', 'user'),
('fabianbrenner', 'Fabian', 'Brenner', 'securepass13', 'fabian.brenner@gmail.com', '1991-11-19', 'inactive', 'user'),
('monika.k', 'Monika', 'Kreuzer', 'securepass14', 'monika.kreuzer@gmail.com', '1988-02-11', 'active', 'user'),
('andreasteiner', 'Andreas', 'Steiner', 'securepass15', 'andreas.steiner@gmail.com', '1984-05-30', 'active', 'user'),
('karin.obermayer', 'Karin', 'Obermayer', 'securepass16', 'karin.obermayer@gmail.com', '1996-12-03', 'active', 'user'),
('sebastian.b', 'Sebastian', 'Bauer', 'securepass17', 'sebastian.bauer@gmail.com', '1995-01-17', 'active', 'user'),
('elisabeth.schwarz', 'Elisabeth', 'Schwarz', 'securepass18', 'elisabeth.schwarz@gmail.com', '1987-10-07', 'inactive', 'user'),
('christoph.wagner', 'Christoph', 'Wagner', 'securepass19', 'christoph.wagner@gmail.com', '1992-06-02', 'active', 'user'),

('admin', 'Alexander', 'Meier', 'admin', 'alexander.meier@gmail.com', '1980-04-20', 'active', 'admin'),
('admin2', 'Verena', 'Weiss', 'adminpass2', 'verena.weiss@gmail.com', '1982-07-14', 'active', 'admin'),
('admin3', 'Bernhard', 'Eder', 'adminpass3', 'bernhard.eder@gmail.com', '1979-09-09', 'active', 'admin'),
('admin4', 'Claudia', 'Holzer', 'adminpass4', 'claudia.holzer@gmail.com', '1983-01-25', 'active', 'admin'),
('admin5', 'Thomas', 'Rauch', 'adminpass5', 'thomas.rauch@gmail.com', '1978-10-12', 'active', 'admin');

INSERT INTO shipping_address (user_id, street, house_number, postal_code, city)
VALUES
-- Regular users
(1, 'Hauptstraße', '12A', 1010, 'Wien'),
(2, 'Kirchgasse', '7', 5020, 'Salzburg'),
(3, 'Linzergasse', '34', 4020, 'Linz'),
(4, 'Münchner Straße', '21', 6020, 'Innsbruck'),
(5, 'Berggasse', '9', 8010, 'Graz'),
(6, 'Bahnhofstraße', '5', 3100, 'St. Pölten'),
(7, 'Schulstraße', '17', 3500, 'Krems an der Donau'),
(8, 'Parkstraße', '14B', 6900, 'Bregenz'),
(9, 'Seestraße', '3', 7000, 'Eisenstadt'),
(10, 'Altstadtgasse', '18', 5020, 'Salzburg'),
(11, 'Neubaugasse', '12', 7400, 'Oberwart'),
(12, 'Graben', '8', 1010, 'Wien'),
(13, 'Landstraße', '4', 4020, 'Linz'),
(14, 'Marktplatz', '20', 4050, 'Traun'),
(15, 'Zehnergasse', '13', 2700, 'Wiener Neustadt'),
(16, 'Rathausplatz', '11', 4400, 'Steyr'),
(17, 'Hofgasse', '22A', 9500, 'Villach'),
(18, 'Ringstraße', '9', 6800, 'Feldkirch'),
(19, 'Rosengasse', '19', 6850, 'Dornbirn'),
(20, 'Schlossallee', '5', 2340, 'Mödling'),

-- Admins
(21, 'Kaiserstraße', '1', 6020, 'Innsbruck'),
(22, 'Mariahilfer Straße', '101', 1070, 'Wien'),
(23, 'Spittelbergplatz', '8', 1080, 'Wien'),
(24, 'Feldgasse', '4B', 7201, 'Neudörfl'),
(25, 'Steindlgasse', '15', 8010, 'Graz');

INSERT INTO wine_packages (package_name, description, wine_count, vintner, price, suitable_for_persons)
VALUES
('Weinviertel', 'Das größte heimische Weinbaugebiet trumpft mit einer Fülle an Bodentypen und Kleinklimata auf – und daher mit einer großen Weinvielfalt.', 8, '', 66.53, 2),
('Wagram', 'Der Wagram ist flächen- wie auch mengenmäßig eine durchaus bedeutende Weinregion mit einem ganz eigenen Charakter und einer ganz besonderen Sortenspezialität.', 6, '', 156.55, 2),
('Burgenland', 'Mehr als 2.000 Sonnenstunden und das vom Neusiedler See geprägte Mikroklima machen das Burgenland zum Weinland par excellence.', 15, '', 310.365, 3),
('Toskana', 'So vielfältig die Reize der Toskana auch sind, untrennbar verbunden ist sie stets mit dem Wein – und der zeigt sich im eleganten Chianti Classico genauso wie bei den Weinen von Montepulciano, Montalcino oder der toskanischen Küste.', 12, '', 121, 2);

INSERT INTO wine (wine_name)
VALUES
('Grüner Veltliner Ried Längen 2023'),
('Grüner Veltliner Ried Antlasbergen 2023'),
('Roter Veltliner Da Capo 2023/knackig-frisch'),
('Grüner Veltliner Ried Diermannsee Alte Rebe 2023'),

('Roter Veltliner Ried Steinberg 1ÖTW Erste Lage 2022'),
('Grüner Veltliner Ried Himmelreich 2023'),
('Grüner Veltliner Ried Spiegel 1ÖTW Erste Lage 2022'),

('Tiefschwarz 2020'),
('The Legends 2022'),
('Nordrand 2018'),
('Haideboden 2021'),
('Bela Rex 2020'),

('Chianti Riserva 2021'),
('Le Volte dell’ Ornellaia 2022'),
('Chianti Classico Discorsi 2020'),
('Brunello di Montalcino CastelGiocondo 2019'),
('Rosso di Montalcino 2021'),
('Vino Nobile di Montepulciano 2021');




INSERT INTO wine_package_wine (wine_package_id, wine_id, quantity)
VALUES
(1, 1, 2), (1, 2, 2), (1, 3, 2), (1, 4, 2),
(2, 5, 2), (2, 6, 2), (2, 7, 2),
(3, 8, 3), (3, 9, 3), (3, 10, 3), (3, 11, 3), (3, 12, 3),
(4, 13, 2), (4, 14, 2), (4, 15, 2), (4, 16, 2), (4, 17, 2), (4, 18, 2);