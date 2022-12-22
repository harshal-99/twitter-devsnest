import {Router} from "express";
import {Follower, Tweet, User} from "../models/index.js";

const userRouter = Router()

userRouter.post('/', async (req, res) => {
	const {name, username} = req.body

	if (!name || !username) {
		return res.status(400).json({message: `${!name ? 'name' : 'username'} is required`})
	}

	const newUser = await User.create({
		name,
		username
	})

	return res.status(201).json(newUser)
})

userRouter.post('/timeline', async (req, res) => {
	const {userId} = req.body

	if (!userId) {
		return res.status(400).json({message: 'userId is required'})
	}

	const foundUser = await User.findByPk(userId)

	if (!foundUser) {
		return res.status(404).json({message: 'User not found'})
	}

	const tweets = await Tweet.findAll({
		where: {
			userId
		},
		order: [
			['createdAt', 'DESC']
		],
		limit: 10
	})

	return res.status(200).json(tweets)
})

userRouter.post('/feed', async (req, res) => {
	const {userId} = req.body

	if (!userId) {
		return res.status(400).json({message: 'userId is required'})
	}

	const foundUser = await User.findByPk(userId)

	if (!foundUser) {
		return res.status(404).json({message: 'User not found'})
	}

	const userFollowers = await Follower.findAll({
		where: {
			followerId: userId
		},
		order: [
			['createdAt', 'DESC']
		],
		limit: 10
	})

	let tweets = []

	for (const user of userFollowers) {
		const tweet = await Tweet.findAll({
			where: {
				userId: user.userId
			},
			order: [
				['createdAt', 'DESC']
			],
			limit: 10
		})

		tweets.push(...tweet)
	}

	tweets = tweets.map(tweet => tweet.toJSON())
	tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
	tweets = tweets.slice(0, 10)

	return res.status(200).json(tweets)
})

userRouter.post('/follow', async (req, res) => {
	const {fromUserId, toUserId} = req.body

	if (!fromUserId || !toUserId) {
		return res.status(400).json({message: `${!fromUserId ? 'fromUserId' : 'toUserId'} is required`})
	}

	const foundFromUser = await User.findByPk(fromUserId)
	const foundToUser = await User.findByPk(toUserId)

	if (!foundFromUser || !foundToUser) {
		return res.status(404).json({message: `Invalid ${!fromUserId ? 'fromUserId' : 'toUserId'} provided`})
	}

	const newFollower = await Follower.create({
		userId: toUserId,
		followerId: fromUserId
	})

	return res.status(200).json({message: 'Followed successfully'})
})

userRouter.post('/unfollow', async (req, res) => {
	const {fromUserId, toUserId} = req.body

	if (!fromUserId || !toUserId) {
		return res.status(400).json({message: `${!fromUserId ? 'fromUserId' : 'toUserId'} is required`})
	}

	const foundFromUser = await User.findByPk(fromUserId)
	const foundToUser = await User.findByPk(toUserId)

	if (!foundFromUser || !foundToUser) {
		return res.status(404).json({message: `Invalid ${!fromUserId ? 'fromUserId' : 'toUserId'} provided`})
	}

	const response = await Follower.destroy({
		where: {
			userId: toUserId,
			followerId: fromUserId
		}
	})

	if (response) {
		return res.status(200).json({message: 'Unfollowed successfully'})
	}

	return res.status(404).json({message: `${foundFromUser.name} is not following ${foundToUser.name}`})
})

export default userRouter
