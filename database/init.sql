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
    surface_area NUMERIC(10, 2) NOT NULL,
    location varchar(100) not null,
    number_of_rooms int not null,
    number_of_bathrooms int not null,
    publication_date timestamp default now() not null,
    main_img_url varchar(255) not null,
    contact_data varchar(255) not null,
    property_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS search_criteria (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    location VARCHAR(100),
    price_range_min NUMERIC(10, 2),
    price_range_max NUMERIC(10, 2),
    number_of_rooms INT,
    property_type VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

insert into users (name, lastname, email, password, role)
    values('Nicolás', 'Márquez', 'nicomars270@gmail.com', crypt('27DEenero2003_', gen_salt('bf')), 'admin'),
          ('Martina', 'Guzmán', 'martina14288@gmail.com', crypt('28DEenero2003_', gen_salt('bf')), 'admin'),
          ('Ana', 'Sena', 'anaclarasenanunez@gmail.com', crypt('Ana0411!', gen_salt('bf')), 'admin'),
          ('Juan', 'Pérez', 'juan@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user'),
          ('Martin', 'Martinez', 'mm@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user'),
          ('Jose', 'Gutierrez', 'jg@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user')


