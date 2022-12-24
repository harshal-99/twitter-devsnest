import {Router} from "express";
import twitterService from "../service/twitter.service.js";

const tweetRouter = Router()

tweetRouter.post('/', async (req, res) => {
	const {userId, tweet} = req.body

	try {
		return res.status(201).json(twitterService.createTweet(userId, tweet))
	} catch (e) {
		return res.status(404).json({message: e.message})
	}
})


export default tweetRouter
