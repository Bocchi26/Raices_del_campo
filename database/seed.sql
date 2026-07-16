-- seed.sql: Datos de prueba iniciales (categorias, productos, usuario admin, ruta de entrega)
-- ==========================================
-- ==========================================================
-- DATOS DE PRUEBA
-- ==========================================================

-- Categorías
INSERT INTO categorias (nombre, descripcion)
VALUES
('Verduras', 'Productos frescos cultivados por campesinos'),
('Frutas', 'Frutas frescas de temporada'),
('Tubérculos', 'Tubérculos producidos en la región');

-- Productos
INSERT INTO productos (
    id_categoria,
    nombre,
    descripcion,
    unidad_medida,
    origen,
    precio_compra_kg,
    precio_venta,
    stock_disponible,
    imagen_url,
    activo,
    fecha_creacion
)
VALUES
(1,'Tomate Chonto','Tomate fresco de alta calidad','kg','La Dorada',2500.00,3500.00,120,'https://via.placeholder.com/300',TRUE,CURRENT_TIMESTAMP),

(1,'Cebolla Cabezona','Cebolla fresca','kg','Manizales',1800.00,2800.00,80,'https://via.placeholder.com/300',TRUE,CURRENT_TIMESTAMP),

(2,'Banano','Banano fresco','kg','Honda',1200.00,2200.00,100,'https://via.placeholder.com/300',TRUE,CURRENT_TIMESTAMP),

(2,'Manzana Roja','Manzana roja seleccionada','kg','Bogotá',3500.00,4800.00,70,'https://via.placeholder.com/300',TRUE,CURRENT_TIMESTAMP),

(3,'Papa Criolla','Papa criolla de excelente calidad','kg','Boyacá',2000.00,3000.00,150,'https://via.placeholder.com/300',TRUE,CURRENT_TIMESTAMP);

-- Usuario administrador
INSERT INTO clientes (
    nombre,
    apellido,
    email,
    password_hash,
    telefono,
    tipo_cliente,
    direccion,
    ciudad,
    rol,
    activo,
    fecha_registro
)
VALUES (
'Administrador',
'Sistema',
'admin@raicesdelcampo.com',
'$2b$10$7Wj8O2qjX6V9lQd1cP4f0eR9rY8nL6mK2hT5uB1xC3dE4fG5hI6jK',
'3000000000',
'tienda',
'Centro',
'La Dorada',
'administrador',
TRUE,
CURRENT_TIMESTAMP
);

-- Campesino
INSERT INTO campesinos (
    nombre,
    apellido,
    telefono,
    municipio,
    departamento,
    email,
    activo
)
VALUES (
'Juan',
'Pérez',
'3101234567',
'La Dorada',
'Caldas',
'juan.perez@raicesdelcampo.com',
TRUE
);

-- Ruta de entrega
INSERT INTO rutas_entrega (
    nombre_ruta,
    zona_cobertura,
    conductor,
    vehiculo,
    activo
)
VALUES (
'Ruta Centro',
'La Dorada',
'Carlos Gómez',
'Camión NPR',
TRUE
);