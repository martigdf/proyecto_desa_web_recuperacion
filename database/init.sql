CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE table if not exists users (
    id SERIAL primary key,
    name text not null,
    lastname text not null,
    email text not null unique,
    password text not null,
    role varchar(10) check (role in ('admin', 'user')) not null,
    registration_date timestamp default now() not null
);

insert into users (name, lastname, email, password, role)
    values('Nicolás', 'Márquez', 'nicomars270@gmail.com', crypt('27DEenero2003_', gen_salt('bf')), 'admin'),
          ('Martina', 'Guzmán', 'martina14288@gmail.com', crypt('28DEenero2003_', gen_salt('bf')), 'admin'),
          ('Ana', 'Sena', 'anaclarasenanunez@gmail.com', crypt('Ana0411!', gen_salt('bf')), 'admin'),
          ('Juan', 'Pérez', 'juan@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user')