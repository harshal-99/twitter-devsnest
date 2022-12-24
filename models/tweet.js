class Tweet {
	constructor(id, text, userId) {
		this.id = id;
		this.text = text;
		this.userId = userId;
		const date = new Date()
		this.createdAt = date;
		this.updatedAt = date;
	}
}

export default Tweet
