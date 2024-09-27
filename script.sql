create table
    users (
        id INTEGER primary key autoincrement,
        firstname varchar(60) not null,
        lastname varchar(60) not null,
        password varchar(255) not null,
        email varchar(255) not null,
        birthdate Date not null,
        role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')),
        created_at TIMESTAMP default CURRENT_TIMESTAMP
    );
    ;
    