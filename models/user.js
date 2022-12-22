import {DataTypes} from "sequelize";
import {sequelize} from "../config/db.js";

const User = sequelize.define("users", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export default User
