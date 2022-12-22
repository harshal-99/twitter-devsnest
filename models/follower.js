import {sequelize} from "../config/db.js";
import {DataTypes} from "sequelize";

const Follower = sequelize.define('follower', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	followerId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
})

export default Follower
