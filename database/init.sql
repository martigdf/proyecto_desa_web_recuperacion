CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE table if not exists users (
    id SERIAL primary key,
    name text not null,
    lastname text not null,
    email text not null unique,
    password text not null
);

insert into users (name, lastname, email, password)
    values('Nicolás', 'Márquez', 'nicomars270@gmail.com', crypt('27DEenero2003_', gen_salt('bf'))),
          ('Martina', 'Guzmán', 'martina14288@gmail.com', crypt('28DEenero2003_', gen_salt('bf'))),
          ('Ana', 'Sena', 'anaclarasenanunez@gmail.com', crypt('29DEenero2003_', gen_salt('bf')))