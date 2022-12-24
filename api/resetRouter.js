import {Router} from "express";
import twitterService from "../service/twitter.service.js";

const resetRouter = Router()

resetRouter.get('/', (req, res) => {
	twitterService.resetData()
	res.status(200).json({message: 'Data reset'})
})

export default resetRouter
