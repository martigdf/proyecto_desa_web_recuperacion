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
          ('Jose', 'Gutierrez', 'jg@correo.com', crypt('28DESeptiembre2024!', gen_salt('bf')), 'user');

insert into properties (title, description, price, location, number_of_rooms, number_of_bathrooms, main_img_url, contact_data, property_type)
    values('Casa en el bosque', 'Casa en el bosque con vista al lago', 100000, 'Bosque de la luna', 3, 2, 'https://www.lacasadelbosque.com.uy/assets/images/la-casa-del-bosque-2019-20-1320x880.jpg', '
    123456789', 'Casa'),
          ('Departamento en la ciudad', 'Departamento en la ciudad con vista al río', 50000, 'Ciudad de la luna', 2, 1, 'https://images.adsttc.com/media/images/5f10/80ed/b357/65e1/f700/0086/newsletter/07112019-Jaime_Navarro_6319.jpg?1594917086', '
    123456789', 'Departamento'),
          ('Casa en la playa', 'Casa en la playa con vista al mar', 200000, 'Playa de la luna', 4, 3, 'https://hips.hearstapps.com/hmg-prod/images/casa-playa-surf-edificio-1627031468.jpg', '
    123456789', 'Casa'),
          ('Departamento en la montaña', 'Departamento en la montaña con vista al valle', 70000, 'Montaña de la luna', 3, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIKOpvOU4Jhlamv9e7zwx0PhN9jbZrzL7JA&s', '
    123456789', 'Departamento'),
          ('Casa en la ciudad', 'Casa en la ciudad con vista al río', 150000, 'Ciudad de la luna', 3, 2, 'https://www.inmobiliariaya.com/fotos/1/311/31128/720769606189569.jpg', '
    123456789', 'Casa'),
          ('Departamento en la playa', 'Departamento en la playa con vista al mar', 80000, 'Playa de la luna', 2, 1, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/379322242.jpg?k=ba35583b81990574f272ab3bf6e4e5823a7c275263d14415930a029f32166ee4&o=&hp=1',
    123456789, 'Departamento'),
          ('Casa en la montaña', 'Casa en la montaña con vista al valle', 250000, 'Montaña de la luna', 4, 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkVQWOH8-aiHdORnNaVwjLoZQzYCI-L5cxQ&s', '
    123456789', 'Casa'),
          ('Departamento en la ciudad', 'Departamento en la ciudad con vista al río', 90000, 'Ciudad de la luna', 3, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MT70jKV4v1vHock3vk4pIGYH9hDCipormQ&s', '
    123456789', 'Departamento'),
          ('Casa en la playa', 'Casa en la playa con vista al mar', 300000, 'Playa de la luna', 4, 3, 'https://a0.muscache.com/im/pictures/6aa4515b-f7ca-4eb0-bb19-a4f3453eb9f4.jpg', '
    123456789', 'Casa'),
          ('Departamento en la montaña', 'Departamento en la montaña con vista al valle', 100000, 'Montaña de la luna', 3, 2, 'https://images.adsttc.com/media/images/62a6/8414/20f5/9701/6830/9064/newsletter/house-on-a-hill-amunt_7.jpg?1655079979', '
    123456789', 'Departamento'),
          ('Casa en la ciudad', 'Casa en la ciudad con vista al río', 200000, 'Ciudad de la luna', 3, 2, 'https://bostonglobe-prod.cdn.arcpublishing.com/resizer/v2/MBNZYUHTMAI6HCSJ6IGLDM2VXE.jpg?auth=cbaf28c03d41c51abe1459b34de7ee026fd37a978ff93aa741a442b43a1150c8&width=1440', '
    123456789', 'Casa'),
          ('Departamento en la playa', 'Departamento en la playa con vista al mar', 110000, 'Playa de la luna', 2, 1, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416582773.jpg?k=8d7dc0d8f7999e23cc2d4ef48a6409deb721778ee44c62cff1ea13502879b470&o=&hp=1', '
    123456789', 'Departamento'),
          ('Casa en la montaña', 'Casa en la montaña con vista al valle', 350000, 'Montaña de la luna', 4, 3, 'https://img.alqastatic.com/_propiedades_/kr29/o_kr29_Departamento_GYA2YEQF.jpg', '
    123456789', 'Casa'),
          ('Departamento en la ciudad', 'Departamento en la ciudad con vista al río', 120000, 'Ciudad de la luna', 3, 2, 'https://http2.mlstatic.com/D_NQ_NP_2X_973772-MLU75425032018_042024-E.webp', '
    123456789', 'Departamento'),
          ('Casa en la playa', 'Casa en la playa con vista al mar', 400000, 'Playa de la luna', 4, 3, 'https://img10.naventcdn.com/avisos/18/00/90/43/43/27/360x266/1414248662.jpg?isFirstImage=true', '
    123456789', 'Casa'),
          ('Departamento en la montaña', 'Departamento en la montaña con vista al valle', 130000, 'Montaña de la luna', 3, 2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/578131179.jpg?k=704ade7b9880a710188af300a41610358dd1744d88f4696de67822b8b9f82193&o=&hp=1', '   123456789', 'Departamento');