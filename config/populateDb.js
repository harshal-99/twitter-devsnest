import {faker} from "@faker-js/faker";
import {Follower, Tweet, User} from "../models/index.js";

const createRandomUser = () => {
	return {
		name: faker.name.fullName(),
		username: faker.internet.userName(),
	}
}

const createRandomTweet = () => {
	return faker.lorem.words()

}

const populateDb = async () => {
	let users = Array.from({length: 10}, createRandomUser)
	users = await User.bulkCreate(users)
	users = users.map(user => user.toJSON())

	let tweets = Array.from({length: 10}, createRandomTweet)

	tweets = tweets.map(tweet => {
		return {
			text: tweet,
			userId: users.at(Math.floor(Math.random() * users.length)).id,
		}
	})
	tweets = await Tweet.bulkCreate(tweets)
	tweets = tweets.map(tweet => tweet.toJSON())
	// console.log(tweets)

	let start = 0, end = users.length - 1
	let followers = []
	while (start <= end) {
		const user = users.at(start)
		const follower = users.at(end)
		if (user.id !== follower.id) {
			followers.push(await Follower.create({
				userId: user.id,
				followerId: follower.id
			}))
		}
		start++
		end--
	}
	followers = followers.map(follower => follower.toJSON())
	// console.log(followers)
}

export default populateDb
