-- views.sql: Vistas SQL para reportes y analiticas del panel de administracion


-- ==========================================================
-- VISTAS PARA REPORTES DEL PANEL DE ADMINISTRACIÓN
-- ==========================================================

-- Vista: Ventas por período
CREATE OR REPLACE VIEW vista_ventas_por_periodo AS
SELECT
    fecha_pedido::DATE AS fecha,
    COUNT(*) AS total_pedidos,
    SUM(total) AS ingresos
FROM pedidos
WHERE estado = 'entregado'
GROUP BY fecha_pedido::DATE
ORDER BY fecha DESC;

-- Vista: Productos más vendidos
CREATE OR REPLACE VIEW vista_productos_mas_vendidos AS
SELECT
    p.nombre,
    SUM(dp.cantidad) AS total_vendido,
    SUM(dp.subtotal) AS ingreso_generado
FROM detalle_pedidos dp
JOIN productos p
    ON dp.id_producto = p.id_producto
JOIN pedidos pe
    ON dp.id_pedido = pe.id_pedido
WHERE pe.estado = 'entregado'
GROUP BY p.nombre
ORDER BY total_vendido DESC;

-- Vista: Pedidos por estado
CREATE OR REPLACE VIEW vista_pedidos_por_estado AS
SELECT
    estado,
    COUNT(*) AS total
FROM pedidos
GROUP BY estado;