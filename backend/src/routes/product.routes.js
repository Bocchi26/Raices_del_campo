// product.routes.js: GET /api/products | GET /api/products/:id | POST/PUT/DELETE (admin)
const express = require("express");
const router = express.Router();

const productService = require("../services/product.service");

router.get("/", async (req,res)=>{

    try {

        const { categoriaId } = req.query;
        const products = await productService.getProducts(categoriaId);

        res.json(products);

    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


router.get("/:id", async(req,res)=>{

    try{

        const product = await productService.getProductById(req.params.id);
        res.json(product);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;