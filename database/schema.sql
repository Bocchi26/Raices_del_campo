-- schema.sql: DDL de tablas y tipos de la base de datos PostgreSQL
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_categoria
        FOREIGN KEY(id_categoria)
        REFERENCES categorias(id_categoria)
);