import {faker} from "@faker-js/faker";
import twitterService from "../service/twitter.service.js";
import fs from "fs";

let USERS = [
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
], TWEETS = [], FOLLOWERS = []


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
	/*	Array
			.from({length: 10}, createRandomUser)
			.forEach(user => {
				USERS.push(twitterService.createUser(user.name, user.username))
			})*/


	/*	let tweets = Array.from({length: 10}, createRandomTweet)
		twitterService.resetData()
		TWEETS = tweets.map(tweet => {
			return twitterService.createTweet(
				USERS.at(Math.floor(Math.random() * USERS.length)).id, tweet)
		})*/


/*	let start = 0, end = USERS.length - 1
	twitterService.resetData()
	while (start <= end) {
		const user = USERS.at(start)
		const follower = USERS.at(end)
		if (user.id !== follower.id) {
			FOLLOWERS.push(twitterService.followUser(user.id, follower.id))
		}
		start++
		end--
	}*/

/*	fs.writeFile('../data.json', JSON.stringify(FOLLOWERS), (err) => {
		if (err) {
			console.log(err)
		}
	})*/
}
