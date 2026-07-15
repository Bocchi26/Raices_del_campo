-- seed.sql: Datos de prueba iniciales (categorias, productos, usuario admin, ruta de entrega)
INSERT INTO categorias(nombre, descripcion)
VALUES
('Verduras','Productos frescos'),
('Frutas','Frutas nacionales');

INSERT INTO productos(id_categoria,nombre,descripcion,precio)
VALUES
(1,'Papa','Papa pastusa',2500),
(1,'Tomate','Tomate chonto',3200);