CREATE EXTENSION IF NOT EXISTS pgcrypto;

 --  TABLAS   --

CREATE table if not exists users (
    id SERIAL primary key,
    name text not null,
    lastname text not null,
    email text not null unique,
    password text not null,
    role varchar(10) check (role in ('admin', 'user')) not null,
    registration_date timestamp default now() not null
);

CREATE table if not exists properties (
    id SERIAL primary key,
    title varchar(100) not null,
    description text not null,
    price NUMERIC(10, 2) NOT NULL, 
    /*
       El primero es el número total de dígitos que puede almacenar el número
       El segundo es la cantidad de digitos que pueden haber despues de la coma
    */
    location varchar(100) not null,
    number_of_rooms int not null,
    number_of_bathrooms int not null,
    publication_date timestamp default now() not null,
    main_img_url varchar(255) not null,
    contact_data varchar(255) not null,
    property_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS favorites (
    id_favorite SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE, 
    /* ON DELETE CASCADE 
        Se asegura de que si se borra un dato en la tabla padre todos
        los registros derivados de ese dato se borren tambien.
    */
    UNIQUE (user_id, property_id)  -- Para evitar que un usuario tenga favoritos duplicados
);

CREATE TABLE IF NOT EXISTS notificaciones (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    fecha_notificacion TIMESTAMP DEFAULT NOW(),
    resumen TEXT NOT NULL,
    url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS data_source (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL
);


insert into users (name, lastname, email, password, role)
    values('Nicolás', 'Márquez', 'nicomars270@gmail.com', crypt('27DEenero2003_', gen_salt('bf')), 'admin'),
          ('Martina', 'Guzmán', 'martina14288@gmail.com', crypt('28DEenero2003_', gen_salt('bf')), 'admin'),
          ('Ana', 'Sena', 'anaclarasenanunez@gmail.com', crypt('Ana0411!', gen_salt('bf')), 'admin'),
          ('Juan', 'Pérez', 'juan@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user'),
          ('Martin', 'Martinez', 'mm@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user'),
          ('Jose', 'Gutierrez', 'jg@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user')

insert into properties (title, description, price, location, number_of_rooms, number_of_bathrooms, main_img_url, contact_data, property_type)
    values('Casa en el bosque', 'Casa en el bosque con vista al lago', 100000, 'Bosque de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la ciudad', 'Departamento en la ciudad con vista al río', 50000, 'Ciudad de la luna', 2, 1, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la playa', 'Casa en la playa con vista al mar', 200000, 'Playa de la luna', 4, 3, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la montaña', 'Departamento en la montaña con vista al valle', 70000, 'Montaña de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la ciudad', 'Casa en la ciudad con vista al río', 150000, 'Ciudad de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la playa', 'Departamento en la playa con vista al mar', 80000, 'Playa de la luna', 2, 1, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la montaña', 'Casa en la montaña con vista al valle', 250000, 'Montaña de la luna', 4, 3, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la ciudad', 'Departamento en la ciudad con vista al río', 90000, 'Ciudad de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la playa', 'Casa en la playa con vista al mar', 300000, 'Playa de la luna', 4, 3, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la montaña', 'Departamento en la montaña con vista al valle', 100000, 'Montaña de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la ciudad', 'Casa en la ciudad con vista al río', 200000, 'Ciudad de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la playa', 'Departamento en la playa con vista al mar', 110000, 'Playa de la luna', 2, 1, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la montaña', 'Casa en la montaña con vista al valle', 350000, 'Montaña de la luna', 4, 3, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la ciudad', 'Departamento en la ciudad con vista al río', 120000, 'Ciudad de la luna', 3, 2, 'https://www.google.com', '
    123456789', 'Departamento'),
          ('Casa en la playa', 'Casa en la playa con vista al mar', 400000, 'Playa de la luna', 4, 3, 'https://www.google.com', '
    123456789', 'Casa'),
          ('Departamento en la montaña', 'Departamento en la montaña con vista al valle', 130000, 'Montaña de la luna', 3, 2, 'https://www.google.com', '   123456789', 'Departamento');