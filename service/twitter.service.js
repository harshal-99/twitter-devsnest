import User from "../models/user.js";
import Tweet from "../models/tweet.js";
import Follower from "../models/follower.js";
import {faker} from "@faker-js/faker";

let instance

class TwitterService {
	constructor() {
		if (instance) {
			throw new Error("New instance cannot be created!!");
		}
		instance = this;
		this.users = []
		this.tweets = []
		this.followers = []
	}

	getUserById = (userId) => {
		return this.users.find(user => user.id === userId)
	}

	createUser = (name, username) => {
		const newUser = new User(faker.datatype.number(), name, username)
		this.users.push(newUser)
		return newUser
	}

	getTweetById = (tweetId) => {
		return this.tweets.find(tweet => tweet.id === tweetId)
	}

	createTweet = (userId, text) => {
		if (!userId || !text) {
			throw new Error(`${!userId ? 'userId' : 'tweet'} is required`)
		}

		const user = this.getUserById(userId)

		if (!user) {
			throw new Error('User not found')
		}

		const newTweet = new Tweet(faker.datatype.number(), text, userId)
		this.tweets.push(newTweet)
		return newTweet
	}

	followUser = (fromUserId, toUserId) => {
		if (!fromUserId || !toUserId) {
			throw new Error(`${!fromUserId ? 'fromUserId' : 'toUserId'} is required`)
		}

		const foundToUser = this.getUserById(fromUserId)
		const foundFromUser = this.getUserById(toUserId)

		if (!foundToUser || !foundFromUser) {
			throw new Error(`${!fromUserId ? 'fromUserId' : 'toUserId'} is required`)
		}

		const newFollower = new Follower(faker.datatype.number(), toUserId, fromUserId)
		this.followers.push(newFollower)
	}

	unfollowUser = (fromUserId, toUserId) => {
		if (!fromUserId || !toUserId) {
			throw new Error(`${!fromUserId ? 'fromUserId' : 'toUserId'} is required`)
		}

		const foundToUser = this.getUserById(toUserId)
		const foundFromUser = this.getUserById(fromUserId)

		if (!foundToUser || !foundFromUser) {
			throw new Error(`${!fromUserId ? 'fromUserId' : 'toUserId'} is required`)
		}

		const follower = this.followers.find(follower => follower.userId === fromUserId && follower.followerId === toUserId)
		if (!follower) {
			throw new Error(`${foundFromUser.username} is not following ${foundToUser.username}`)
		}
		this.followers.splice(this.followers.indexOf(follower), 1)
	}

	getTweetsByUserId = (userId) => {
		const tweetsByUser = this.tweets.filter(tweet => tweet.userId === userId)
		tweetsByUser.sort((a, b) => b.createdAt - a.createdAt)
		return tweetsByUser.slice(0, 10)
	}

	getUserFeed = (userId) => {
		if (!userId) {
			throw new Error("User id is required")
		}

		const user = this.getUserById(userId)

		if (!user) {
			throw new Error("User not found")
		}

		const tweets = []

		this.getTweetsByUserId(userId).forEach(tweet => tweets.push(tweet))

		const userFollowers = this.followers.filter(follower => follower.userId === userId)

		userFollowers.forEach(follower => {
			this.getTweetsByUserId(follower.followerId).forEach(tweet => tweets.push(tweet))
		})

		tweets.sort((a, b) => b.createdAt - a.createdAt)
		return tweets.slice(0, 10)
	}

	resetData = () => {
		this.users.splice(0);
		[
			{
				"id": 98858,
				"name": "Clinton Zulauf",
				"username": "Ally.Kulas",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 555,
				"name": "Ellis Lehner",
				"username": "Joy_Wunsch",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 78526,
				"name": "Roxanne Feil",
				"username": "Anastasia54",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 15470,
				"name": "Bryan Sanford",
				"username": "Jaiden_Flatley",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 8705,
				"name": "Charlotte Lindgren Sr.",
				"username": "Merlin54",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 82768,
				"name": "Vicki Aufderhar",
				"username": "Verlie_Muller",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 30301,
				"name": "Otis Hirthe Jr.",
				"username": "Katelin.Rempel",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 89471,
				"name": "Caroline Beatty",
				"username": "Jackie_White32",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 27849,
				"name": "Bryant Cronin",
				"username": "Giovani_Okuneva",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			},
			{
				"id": 71539,
				"name": "Travis Quigley",
				"username": "Cathrine.Renner",
				"createdAt": "2022-12-24T08:06:51.706Z",
				"updatedAt": "2022-12-24T08:06:51.706Z"
			}
		].forEach(user => this.users.push(user))

		this.tweets.splice(0);
		[{
			"id": 35475,
			"text": "eos optio sint",
			"userId": 30301,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 97833,
			"text": "quae numquam beatae",
			"userId": 27849,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 95367,
			"text": "praesentium reprehenderit assumenda",
			"userId": 71539,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 49814,
			"text": "accusantium excepturi voluptatum",
			"userId": 8705,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 4003,
			"text": "tenetur repellat veritatis",
			"userId": 78526,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 60917,
			"text": "voluptate laborum nemo",
			"userId": 27849,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 11151,
			"text": "tempora aspernatur hic",
			"userId": 89471,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 3171,
			"text": "officia reprehenderit optio",
			"userId": 15470,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 33097,
			"text": "nesciunt nobis ea",
			"userId": 30301,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}, {
			"id": 82344,
			"text": "laudantium voluptatibus ad",
			"userId": 30301,
			"createdAt": "2022-12-24T08:18:33.909Z",
			"updatedAt": "2022-12-24T08:18:33.909Z"
		}].forEach(tweet => this.tweets.push(tweet))

		this.followers.splice(0);
		[{
			"id": 47879,
			"userId": 71539,
			"followerId": 98858,
			"createdAt": "2022-12-24T08:29:30.040Z",
			"updatedAt": "2022-12-24T08:29:30.040Z"
		}, {
			"id": 30382,
			"userId": 27849,
			"followerId": 555,
			"createdAt": "2022-12-24T08:29:30.040Z",
			"updatedAt": "2022-12-24T08:29:30.040Z"
		}, {
			"id": 2604,
			"userId": 89471,
			"followerId": 78526,
			"createdAt": "2022-12-24T08:29:30.040Z",
			"updatedAt": "2022-12-24T08:29:30.040Z"
		}, {
			"id": 12327,
			"userId": 30301,
			"followerId": 15470,
			"createdAt": "2022-12-24T08:29:30.040Z",
			"updatedAt": "2022-12-24T08:29:30.040Z"
		}, {
			"id": 3224,
			"userId": 82768,
			"followerId": 8705,
			"createdAt": "2022-12-24T08:29:30.040Z",
			"updatedAt": "2022-12-24T08:29:30.040Z"
		}].forEach(follower => this.followers.push(follower))
	}
}

let twitterService = Object.freeze(new TwitterService())

export default twitterService
