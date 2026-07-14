-- schema.sql: DDL de tablas y tipos de la base de datos PostgreSQL
-- ==========================================
-- =====================================================
-- ==========================================================
-- TABLAS DE SUMINISTRO Y LOGÍSTICA
-- Persona 4
-- ==========================================================

-- ==========================================================
-- TABLA: CAMPESINOS
-- ==========================================================
CREATE TABLE IF NOT EXISTS campesinos (
    id_campesino SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    municipio VARCHAR(100),
    departamento VARCHAR(100),
    email VARCHAR(150),
    activo BOOLEAN DEFAULT TRUE
);

-- ==========================================================
-- TABLA: CONTRATOS DE SUMINISTRO
-- ==========================================================
CREATE TABLE IF NOT EXISTS contratos_suministro (
    id_contrato SERIAL PRIMARY KEY,
    id_campesino INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    periodicidad VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'activo',
    observaciones TEXT,

    CONSTRAINT fk_contrato_campesino
        FOREIGN KEY (id_campesino)
        REFERENCES campesinos(id_campesino)
);

-- ==========================================================
-- TABLA: CONTRATO_PRODUCTOS
-- ==========================================================
CREATE TABLE IF NOT EXISTS contrato_productos (
    id_contrato INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad_acordada DECIMAL(10,2) NOT NULL,
    precio_acordado DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (id_contrato, id_producto),

    CONSTRAINT fk_contrato_producto
        FOREIGN KEY (id_contrato)
        REFERENCES contratos_suministro(id_contrato),

    CONSTRAINT fk_producto_contrato
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);

-- ==========================================================
-- TABLA: RUTAS DE ENTREGA
-- ==========================================================
CREATE TABLE IF NOT EXISTS rutas_entrega (
    id_ruta SERIAL PRIMARY KEY,
    nombre_ruta VARCHAR(100) NOT NULL,
    zona_cobertura VARCHAR(150) NOT NULL,
    conductor VARCHAR(100),
    vehiculo VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

-- ==========================================================
-- TABLA: ENTREGAS
-- ==========================================================
CREATE TABLE IF NOT EXISTS entregas (
    id_entrega SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_ruta INT NOT NULL,
    fecha_salida TIMESTAMP,
    fecha_entrega_real TIMESTAMP,
    estado_entrega VARCHAR(30),
    observaciones TEXT,

    CONSTRAINT fk_entrega_pedido
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),

    CONSTRAINT fk_entrega_ruta
        FOREIGN KEY (id_ruta)
        REFERENCES rutas_entrega(id_ruta)
);