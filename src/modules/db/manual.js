import Sequelize from "sequelize";
import config from "./config/config.json";

export default () => {

    return new Sequelize(config.database, config.username, config.password, config);
    
}