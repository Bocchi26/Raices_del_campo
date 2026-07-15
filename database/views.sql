-- views.sql: Vistas SQL para reportes y analiticas del panel de administracion
CREATE VIEW vista_productos AS
SELECT
    p.id_producto,
    p.nombre,
    c.nombre AS categoria,
    p.precio
FROM productos p
JOIN categorias c
ON p.id_categoria = c.id_categoria;