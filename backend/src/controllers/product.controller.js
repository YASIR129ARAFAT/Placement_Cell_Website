const fs = require('fs')
// const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
// let products = data.products;

const { Product } = require('../models/product.models.js')

exports.getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.send(products);
}
exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id // + changes from string to number
        // const product = products.find((ele) => {
        //     return id === ele.id
        // })
        const product = await Product.findById(id);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
exports.createProduct = async (req, res) => {//post

    try {
        // const product = req.body;
        // products.push(product)
        // res.json(products)

        /*
            for adding more than one product at once
                const arr = req.body;
                arr.map(async(ele)=>{
                    const newProduct = new Product(ele);
                    await newProduct.save()
                })
        */

        const newProduct = new Product(req.body);
        await newProduct.save()
        res.send("product created succefully");

    }
    catch (error) {
        res.send(error);
    }


}
exports.replaceProduct = async (req, res) => { //put
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id, req.body);
        res.json(product)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}
exports.updateProduct = async (req, res) => { //patch
    try {
        const id = req.params.id;
        const updateValues = req.body;
        const product = await Product
            .findByIdAndUpdate(id, updateValues, { returnDocument: 'after' });
        /**
         * The above option is to return the updated product not the older version
         * Many other options are there on mongoose docs
         */
        res.json(product);
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}
exports.deleteProduct = async (req, res) => {//delete
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id)

        res.json(product);
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}