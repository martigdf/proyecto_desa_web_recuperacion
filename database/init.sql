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
      departamento varchar(100) not null,
      barrio varchar(100) not null,
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
    UNIQUE (user_id, property_id)
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

insert into properties (title, description, price, departamento, barrio, number_of_rooms, number_of_bathrooms, main_img_url, contact_data, property_type)
    values('Casa en Punta del Este', 'Casa en Punta del Este con vista al mar', 100000, 'Maldonado', 'Punta del Este', 3, 2, 'https://www.lacasadelbosque.com.uy/assets/images/la-casa-del-bosque-2019-20-1320x880.jpg', '091234567', 'Casa'),
          ('Apartamento en Pocitos', 'Apartamento en Pocitos con vista al río', 50000, 'Montevideo', 'Pocitos', 2, 1, 'https://images.adsttc.com/media/images/5f10/80ed/b357/65e1/f700/0086/newsletter/07112019-Jaime_Navarro_6319.jpg?1594917086', '091234567', 'Apartamento'),
          ('Casa en Piriápolis', 'Casa en Piriápolis con vista al mar', 200000, 'Maldonado', 'Piriápolis', 4, 3, 'https://hips.hearstapps.com/hmg-prod/images/casa-playa-surf-edificio-1627031468.jpg', '091234567', 'Casa'),
          ('Apartamento en Minas', 'Apartamento en Minas con vista al valle', 70000, 'Lavalleja', 'Minas', 3, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIKOpvOU4Jhlamv9e7zwx0PhN9jbZrzL7JA&s', '091234567', 'Apartamento'),
          ('Casa en Carrasco', 'Casa en Carrasco con vista al río', 150000, 'Montevideo', 'Carrasco', 3, 2, 'https://www.inmobiliariaya.com/fotos/1/311/31128/720769606189569.jpg', '091234567', 'Casa'),
          ('Casa en Minas', 'Casa en Minas con vista al valle', 250000, 'Lavalleja', 'Minas', 4, 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDkVQWOH8-aiHdORnNaVwjLoZQzYCI-L5cxQ&s', '091234567', 'Casa'),
          ('Apartamento en Punta Carretas', 'Apartamento en Punta Carretas con vista al río', 90000, 'Montevideo', 'Punta Carretas', 3, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MT70jKV4v1vHock3vk4pIGYH9hDCipormQ&s', '091234567', 'Apartamento'),
          ('Casa en La Barra', 'Casa en La Barra con vista al mar', 300000, 'Maldonado', 'La Barra', 4, 3, 'https://a0.muscache.com/im/pictures/6aa4515b-f7ca-4eb0-bb19-a4f3453eb9f4.jpg', '091234567', 'Casa'),
          ('Apartamento en Minas', 'Apartamento en Minas con vista al valle', 100000, 'Lavalleja', 'Minas', 3, 2, 'https://images.adsttc.com/media/images/62a6/8414/20f5/9701/6830/9064/newsletter/house-on-a-hill-amunt_7.jpg?1655079979', '091234567', 'Apartamento'),
          ('Casa en Prado', 'Casa en Prado con vista al río', 200000, 'Montevideo', 'Prado', 3, 2, 'https://bostonglobe-prod.cdn.arcpublishing.com/resizer/v2/MBNZYUHTMAI6HCSJ6IGLDM2VXE.jpg?auth=cbaf28c03d41c51abe1459b34de7ee026fd37a978ff93aa741a442b43a1150c8&width=1440', '091234567', 'Casa'),
          ('Casa en Minas', 'Casa en Minas con vista al valle', 350000, 'Lavalleja', 'Minas', 4, 3, 'https://img.alqastatic.com/_propiedades_/kr29/o_kr29_Departamento_GYA2YEQF.jpg', '091234567', 'Casa'),
          ('Apartamento en Ciudad Vieja', 'Apartamento en Ciudad Vieja con vista al río', 120000, 'Montevideo', 'Ciudad Vieja', 3, 2, 'https://http2.mlstatic.com/D_NQ_NP_2X_973772-MLU75425032018_042024-E.webp', '091234567', 'Apartamento'),
          ('Casa en Punta del Diablo', 'Casa en Punta del Diablo con vista al mar', 400000, 'Rocha', 'Punta del Diablo', 4, 3, 'https://img10.naventcdn.com/avisos/18/00/90/43/43/27/360x266/1414248662.jpg?isFirstImage=true', '091234567', 'Casa'),
          ('Casa en Rivera', 'Casa en Rivera con vista al parque', 80000, 'Rivera', 'Centro', 3, 2, 'https://cf.bstatic.com/static/img/theme-index/bg_apartments_new/5062c4701202cd04226b76a5a70f8651ee9d94d8.jpg', '091234567', 'Casa'),
          ('Apartamento en Salto', 'Apartamento en Salto con vista al río', 60000, 'Salto', 'Centro', 2, 1, 'https://ftp.rural-server.com/ofertas/images/OYrzVkwArd23i5qP.jpeg', '091234567', 'Apartamento'),
          ('Casa en Artigas', 'Casa en Artigas con vista al parque', 90000, 'Artigas', 'Centro', 3, 2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/293540136.jpg?k=5f295b1900d9e95b64437e488f1c6ecb1b6c591f881417c8199ba4cd9e451317&o=&hp=1', '091234567', 'Casa'),
          ('Apartamento en Tacuarembó', 'Apartamento en Tacuarembó con vista al río', 70000, 'Tacuarembó', 'Centro', 2, 1, 'https://www.inmobiliariaya.com/fotos/1/375/46558/398505772665717.jpeg', '091234567', 'Apartamento'),
          ('Casa en Paysandú', 'Casa en Paysandú con vista al parque', 85000, 'Paysandú', 'Centro', 3, 2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/491137706.jpg?k=a0ea32ff88de7c70ecea8973800ec7618fbfe08e2803e0666a8132b46f3a4241&o=&hp=1', '091234567', 'Casa'),
          ('Apartamento en Durazno', 'Apartamento en Durazno con vista al río', 65000, 'Durazno', 'Centro', 2, 1, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/272852979.jpg?k=6d663ab8ee57941dc5b7e4a4bdb412955b5f7ebf5a1db89d09a43a936cd0ea16&o=&hp=1', '091234567', 'Apartamento'),
          ('Casa en Florida', 'Casa en Florida con vista al parque', 95000, 'Florida', 'Centro', 3, 2, 'https://http2.mlstatic.com/D_NQ_NP_2X_612250-MLU80682044689_112024-N.webp', '091234567', 'Casa'),
          ('Apartamento en Flores', 'Apartamento en Flores con vista al río', 75000, 'Flores', 'Centro', 2, 1, 'https://http2.mlstatic.com/D_NQ_NP_2X_684354-MLU73756876351_012024-N.webp', '091234567', 'Apartamento'),
          ('Casa en Cerro Largo', 'Casa en Cerro Largo con vista al parque', 100000, 'Cerro Largo', 'Centro', 3, 2, 'https://www.inmobiliariapactum.uy/uploads/1626470031-2010055496.jpg', '091234567', 'Casa'),
          ('Apartamento en Treinta y Tres', 'Apartamento en Treinta y Tres con vista al río', 80000, 'Treinta y Tres', 'Centro', 2, 1, 'https://casa-armonia-treinta-y-tres-uy-33000.hotelmix.es/data/Photos/OriginalPhoto/13914/1391403/1391403866/Casa-Agni-Apartment-Treinta-y-Tres-Exterior.JPEG', '091234567', 'Apartamento'),
          ('Casa en Canelones', 'Casa en Canelones con vista al parque', 110000, 'Canelones', 'Centro', 3, 2, 'https://www.casasymas.com.uy/imagenes/125/pth/93904_2.jpg', '091234567', 'Casa'),
          ('Apartamento en San José', 'Apartamento en San José con vista al río', 85000, 'San José', 'Centro', 2, 1, 'https://www.diegoperdomo.uy/fotos/4413a.jpg', '091234567', 'Apartamento'),
          ('Casa en Colonia', 'Casa en Colonia con vista al parque', 120000, 'Colonia', 'Centro', 3, 2, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/194495367.jpg?k=4c39a2aa5ca9e9a3d48e599ddec28a68a007adbd3aed5462530da3c307d2ce3f&o=&hp=1', '091234567', 'Casa'),
          ('Apartamento en Soriano', 'Apartamento en Soriano con vista al río', 90000, 'Soriano', 'Centro', 2, 1, 'https://www.inmobiliariaya.com/fotos/1/424/49778/448056010801978.jpg', '091234567', 'Apartamento'),
          ('Casa en Río Negro', 'Casa en Río Negro con vista al parque', 130000, 'Río Negro', 'Centro', 3, 2, 'https://http2.mlstatic.com/D_NQ_NP_2X_760396-MLU74881926620_032024-O.webp', '091234567', 'Casa'),
          ('Apartamento en Rocha', 'Apartamento en Rocha con vista al río', 95000, 'Rocha', 'Centro', 2, 1, 'https://http2.mlstatic.com/D_NQ_NP_2X_936801-MLU79696435161_102024-N.webp', '091234567', 'Apartamento');