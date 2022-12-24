class Follower {
	constructor(id, userId, followerId) {
		this.id = id;
		this.userId = userId;
		this.followerId = followerId;
		const date = new Date()
		this.createdAt = date;
		this.updatedAt = date;
	}
}

export default Follower
