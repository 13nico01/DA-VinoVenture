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
VALUES ('Weinviertel',
        'Das größte heimische Weinbaugebiet trumpft mit einer Fülle an Bodentypen und Kleinklimata auf – und daher mit einer großen Weinvielfalt.',
        4, '', 33.25, 4),
       ('Wagram',
        'Der Wagram ist flächen- wie auch mengenmäßig eine durchaus bedeutende Weinregion mit einem ganz eigenen Charakter und einer ganz besonderen Sortenspezialität.',
        3, '', 75.55, 3),
       ('Burgenland',
        'Mehr als 2.000 Sonnenstunden und das vom Neusiedler See geprägte Mikroklima machen das Burgenland zum Weinland par excellence.',
        5, '', 105, 3),
       ('Toskana',
        'So vielfältig die Reize der Toskana auch sind, untrennbar verbunden ist sie stets mit dem Wein – und der zeigt sich im eleganten Chianti Classico genauso wie bei den Weinen von Montepulciano, Montalcino oder der toskanischen Küste.',
        6, '', 61, 5),
       ('Wien',
        'Welche andere Hauptstadt der Welt verfügt über eine Weinbautradition mit solchem Stellenwert wie Wien?', 3,
        'Mayer am Pfarrplatz', 31.50, 3),
       ('Kremstal',
        'Das Kremstal liegt ca. eine Autostunde westlich von Wien am Tor zur Wachau. Als DAC-Appellation definieren es, so wie auch das Kamptal und das Traisental, die Sorten Grüner Veltliner und Riesling.',
        4, 'Mantlerhof', 102, 4),
       ('Steiermark',
        'Die Rebfläche der Steiermark umfasst nur knapp über 5000 Hektar und dennoch sind hier über 2000 Betriebe angesiedelt.',
        2, 'Erwin Sabathi', 30.6, 2);

INSERT INTO wine (wine_name, image_name)
VALUES ('Grüner Veltliner Ried Längen 2023', 'Prechtl_GV_Ried_Laengen_2023.webp'),
       ('Grüner Veltliner Ried Antlasbergen 2023', 'Hagn_GV_RiedAntlasbergen_2023.webp'),
       ('Roter Veltliner Da Capo 2023/knackig-frisch', 'Setzer_RV_DaCapo_2023.webp'),
       ('Grüner Veltliner Ried Diermannsee Alte Rebe 2023', 'Bauer_GV_RiedDiermannsee_2023.webp'),

       ('Roter Veltliner Ried Steinberg 1ÖTW Erste Lage 2022', 'Fritsch_RV_RiedSteinberg_2022.webp'),
       ('Grüner Veltliner Ried Himmelreich 2023', 'FritzJ_GV_RiedHimmelreich_2023.webp'),
       ('Grüner Veltliner Ried Spiegel 1ÖTW Erste Lage 2022', 'Ott_GV_RiedSpiegel_2022.webp'),

       ('Tiefschwarz 2020', 'Schwarz_Tiefschwarz_2020.webp'),
       ('The Legends 2022', 'Scheiblhofer_TheLegends_2022.webp'),
       ('Nordrand 2018', 'Nittnaus_Nordrand_2018.webp'),
       ('Haideboden 2021', 'Umathum_Haideboden_2021.webp'),
       ('Bela Rex 2020', 'Gesellmann_BelaRex_2020.webp'),

       ('Chianti Riserva 2021', 'Tosca_ChiantiRiserva_2021.webp'),
       ('Le Volte dell’ Ornellaia 2022', 'Ornellaia_LeVolte_2022.webp'),
       ('Chianti Classico Discorsi 2020', 'Settecieli_ChiantiClassicoDiscorsi_2020.webp'),
       ('Brunello di Montalcino CastelGiocondo 2019', 'Frescobaldi_BrunelloDiMontalcino_2019.webp'),
       ('Rosso di Montalcino 2021', 'Fanti_RossoDiMontalcino_2021.webp'),
       ('Vino Nobile di Montepulciano 2021', 'Fanti_RossoDiMontalcino_2021.webp'),

       ('Asia Cuvée 2023', 'Asia_Cuvée_2023.webp'),
       ('Sekt Brut', 'Sekt_Brut.webp'),
       ('Das Fräulein Rosé 2023', 'Das_Fräulein_Rosé_2023.webp'),

       ('Grüner & Roter Veltliner Alte Reben 2023', 'Grüner_&_Roter_Veltliner_Alte_Reben_2023.webp'),
       ('Riesling Reserve V Ried Steingraben 1ÖTW Erste Lage 2018',
        'Riesling_Reserve_V_Ried_Steingraben_1ÖTW_Erste_Lage_2018.webp'),
       ('Roter Veltliner Ried Reisenthal 2023', 'Roter_Veltliner_Ried_Reisenthal_2023.webp'),
       ('Veltlinerin Ried Moosburgerin 1ÖTW Erste Lage 2022',
        'Veltlinerin_Ried_Moosburgerin_1ÖTW_Erste_Lage_2022.webp');



INSERT INTO wine_package_wine (wine_package_id, wine_id, quantity)
VALUES (1, 1, 2),
       (1, 2, 2),
       (1, 3, 2),
       (1, 4, 2),
       (2, 5, 2),
       (2, 6, 2),
       (2, 7, 2),
       (3, 8, 3),
       (3, 9, 3),
       (3, 10, 3),
       (3, 11, 3),
       (3, 12, 3),
       (4, 13, 2),
       (4, 14, 2),
       (4, 15, 2),
       (4, 16, 2),
       (4, 17, 2),
       (4, 18, 2),
       (5, 19, 1),
       (5, 20, 1),
       (5, 21, 1),
       (6, 22, 1),
       (6, 23, 1),
       (6, 24, 1),
       (6, 25, 1);

INSERT INTO quiz (host_id, status, quiz_key, wine_package_id)
VALUES (5, TRUE, 123456, 1);


INSERT INTO answer (wine_id, answer1, answer2, answer3, answer4, is_correct, quiz_id)
VALUES (1, 'Zitrus', 'Steinobst', 'Erbeere', 'Vanille', 1, 1),
       (1, 'Zimt', 'Spargel', 'Grüner Apfel', 'Orange', 3, 1),
       (1, 'Süß', 'Sauer', NULL, NULL, 2, 1),
       (1, 'Kremig', 'Frisch', NULL, NULL, 1, 1),
       (2, 'Zitrus', 'Kirsche', 'Pflaume', 'Apfel', 4, 1),
       (2, 'Spargel', 'Birne', 'Pflaume', 'Orange', 3, 1),
       (2, 'Fruchtig', 'Bitter', NULL, NULL, 2, 1),
       (2, 'Süß', 'Herb', NULL, NULL, 1, 1),
       (3, 'Litchi', 'Mango', 'Passionsfrucht', 'Zitrone', 3, 1),
       (3, 'Grüner Apfel', 'Kiwifrucht', 'Ananas', 'Banane', 4, 1),
       (3, 'Süß', 'Trocken', NULL, NULL, 1, 1),
       (3, 'Mild', 'Scharf', 'Scharf-süß', 'Frisch', 4, 1),
       (4, 'Erdbeere', 'Kirsche', 'Heidelbeere', 'Pflaume', 1, 1),
       (4, 'Vanille', 'Zimt', 'Ingwer', 'Orange', 3, 1),
       (4, 'Süß', 'Trockene', 'Blumig', 'Fruchtig', 4, 1),
       (4, 'Kühl', 'Warm', 'Luftig', 'Frisch', 2, 1);

INSERT INTO participant (participant_name, user_id)
VALUES ('Alice', NULL),
       ('Bob', Null),
       (NULL, 5);

INSERT INTO score (user_id, participant_id, score)
VALUES (NULL, 1, 20), -- Benutzer 2 hat 20 Punkte für Teilnehmer Bob
       (NULL, 2, 10),
       (5, NULL, 10);


INSERT INTO participant_answer (participant_id, answer_id, clicked)
VALUES (1, 1, 2),
       (2, 1, 3),
       (3, 1, 4),
       (1, 2, 1),
       (2, 2, 2),
       (3, 2, 3),
       (1, 3, 1),
       (2, 3, 2),
       (3, 3, 2),
       (1, 4, 1),
       (2, 4, 2),
       (3, 4, 1),
       (1, 5, 3),
       (2, 5, 2),
       (3, 5, 4),
       (1, 6, 4),
       (2, 6, 1),
       (3, 6, 2),
       (1, 7, 2),
       (2, 7, 1),
       (3, 7, 1),
       (1, 8, 2),
       (2, 8, 2),
       (3, 8, 1),
       (1, 9, 4),
       (2, 9, 2),
       (3, 9, 1),
       (1, 10, 4),
       (2, 10, 2),
       (3, 10, 1),
       (1, 11, 1),
       (2, 11, 1),
       (3, 11, 2),
       (1, 12, 4),
       (2, 12, 3),
       (3, 12, 3),
       (1, 13, 3),
       (2, 13, 2),
       (3, 13, 1),
       (1, 14, 2),
       (2, 14, 1),
       (3, 14, 4),
       (1, 15, 2),
       (2, 15, 1),
       (3, 15, 4),
       (1, 16, 2),
       (2, 16, 3),
       (3, 16, 4);
