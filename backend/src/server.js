// server.js: Punto de entrada del servidor, levanta Express en el puerto configurado
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);