import {Router} from "express";
import twitterService from "../service/twitter.service.js";

const userRouter = Router()

userRouter.post('/', async (req, res) => {
	const {name, username} = req.body

	if (!name || !username) {
		return res.status(400).json({message: `${!name ? 'name' : 'username'} is required`})
	}

	const newUser = twitterService.createUser(name, username)

	return res.status(201).json(newUser)
})

userRouter.post('/timeline', async (req, res) => {
	const {userId} = req.body

	if (!userId) {
		return res.status(400).json({message: 'userId is required'})
	}

	const foundUser = twitterService.getUserById(userId)

	if (!foundUser) {
		return res.status(404).json({message: 'User not found'})
	}

	const tweets = twitterService.getTweetsByUserId(foundUser.id)

	return res.status(200).json(tweets)
})

userRouter.post('/feed', async (req, res) => {
	const {userId} = req.body
	try {
		return res.status(200).json(twitterService.getUserFeed(userId))
	} catch (e) {
		return res.status(404).json({message: e.message})
	}
})

userRouter.post('/follow', async (req, res) => {
	const {fromUserId, toUserId} = req.body

	try {
		twitterService.followUser(fromUserId, toUserId)
		return res.status(200).json({message: 'User followed'})
	} catch (e) {
		return res.status(404).json({message: e.message})
	}
})

userRouter.post('/unfollow', async (req, res) => {
	const {fromUserId, toUserId} = req.body
	try {
		twitterService.unfollowUser(fromUserId, toUserId)
		return res.status(200).json({message: 'User unfollowed'})
	} catch (e) {
		return res.status(404).json({message: e.message})
	}
})

export default userRouter
