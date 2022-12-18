import db from "../config/database";
import { Sequelize } from "sequelize";

const {DataTypes} = Sequelize;

const Product = db.define('kohi-echo',{
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.STRING,
    product_location: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
})

export default Product;

// (async() => {
//     db.sync();
// })();