import {Router} from "express";
import {Tweet, User} from "../models/index.js";

const tweetRouter = Router()

tweetRouter.post('/', async (req, res) => {
	const {userId, tweet} = req.body

	if (!userId || !tweet) {
		return res.status(400).json({message: `${!userId ? 'userId' : 'tweet'} is required`})
	}

	const foundUser = await User.findByPk(userId)

	if (!foundUser) {
		return res.status(404).json({message: 'User not found'})
	}

	const newTweet = await Tweet.create({text: tweet, userId})

	return res.status(201).json(newTweet)
})



export default tweetRouter
