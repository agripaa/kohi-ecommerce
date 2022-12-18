import Product from '../models/Product.Model';
import path from 'path';
import fs from 'fs';

export const getProduct = async(req, res, next) => {
    try {
        const result = await Product.findAll();
        res.status(200).json({status: true, datas:result});
    } catch (err) {
        console.error(err)
        if(err) return res.status(500).json({msg: 'something wrong happened'})
        next(err)
    }
}

export const getProductById = async(req, res, next) => {
    try {
        const result = await Product.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!result) return res.status(404).json({msg: 'product not available'})
        res.status(200).json({status: true, datas:result})
    } catch (err) {
        console.error(err)
        if(!result.data) return res.status(500).json({msg: 'something wrong happened'})
        next(err)
    }
}

export const createProduct = async(req, res, next) => {
    const files = req.files;
    const { name, desc, price, product_location } = req.body;

    if(files === null) return res.status(400).json({msg: "data is not found"})

    const file = files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedTypes =  ['.png', '.jpg', '.jpeg']

    if(!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({msg: 'invalid image'})
    if(size > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});
    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: "something wrong happened", error: err});
    })
    try {
        await Product.create({
            name: name,
            desc: desc,
            price: price,
            product_location: product_location,
            image: fileName,
            url: url
        }) 
        res.status(201).json({status: true, msg: "product created successfully"})
    } catch (err) {
        console.error(err)
        if(!result.data) return res.status(500).json({msg: 'something wrong happened'})
        next(err)
    }
}

export const updateProduct = async(req, res, next) => {
    let fileName;
    const files = req.files;
    const { name, desc, price, product_location } = req.body;
    const product = await Product.findOne({where: {id: req.params.id}})
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`

    if(!product) return res.status(404).json({msg: "Data not found"})

    if(files === null) {
        fileName = Product.image;
    }else{
        const file = files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedTypes =  ['.png', '.jpg', '.jpeg']
        if(!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({msg: 'invalid image'})
        file.mv(`./public/images/${fileName}`, async(err) => {
        if(size > 5000000) return res.status(422).json({msg: "image must be less than 5 MB"});
        if(err) return res.status(500).json({msg: "something wrong happened", error: err});
    })
}
    
    try {
        await Product.update({
            name: name,
            desc: desc,
            price: price,
            product_location: product_location,
            image: fileName,
            url: url
        },{
            where: {id: req.params.id}
        });
        res.status(201).json({status: true, msg: "product updated successfully"})
    } catch (err) {
        console.error(err)
        if(!result.data) return res.status(500).json({msg: 'something wrong happened'})
        next(err)
    }
}

export const deleteProduct = async(req, res) => {
    const posting = await Product.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!posting) return res.status(404).json({msg: 'Data not found'});

    try {
        const filePath = `./public/images/${posting.image}`
        fs.unlinkSync(filePath);
        
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        
        res.status(202).json({msg: 'data deleted successfully'});
        return;
    } catch (err) {
        console.error(err)
        if(!result.data) return res.status(500).json({msg: 'something wrong happened'})
        next(err)
    }
}