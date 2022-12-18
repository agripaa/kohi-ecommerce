import { Sequelize } from "sequelize";

const db = new Sequelize('kohi-echo','root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db;