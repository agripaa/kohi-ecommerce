import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './routes/Product.Route';
import fileUpload from 'express-fileupload';

const app = express();
dotenv.config()
app.use(express.static("public"))
app.use(express.json())
app.use(fileUpload())
app.use(cors());
app.use(Product)

app.listen(process.env.PORT, () => {
    console.log(`this server running at http://localhost:${process.env.PORT}`)
})