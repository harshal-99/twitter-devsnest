import {Sequelize} from "sequelize";

const sequelize = new Sequelize('sqlite::memory:')

const connectToDb = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error.message)
	}
}

export {sequelize, connectToDb}
