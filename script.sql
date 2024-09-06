create table users
(
    id         INTEGER
        primary key autoincrement,
    firstname  varchar(60)  not null,
    lastname   varchar(60)  not null,
    password   varchar(255) not null,
    email      varchar(255) not null,
    birthdate  Date         not null,
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);


