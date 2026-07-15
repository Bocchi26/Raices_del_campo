// category.routes.js: GET /api/categories | POST /api/categories (admin)
const express = require("express");
const router = express.Router();

const categoryRepository = require("../repositories/category.repository");


router.get("/", async(req,res)=>{

    try{

        const categories = await categoryRepository.findAll();

        res.json(categories);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;