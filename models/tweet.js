import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Tweet = sequelize.define('tweet', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export default Tweet
