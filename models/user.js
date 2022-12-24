class User {
	constructor(id, name, username) {
		this.id = id;
		this.name = name;
		this.username = username;
		const date = new Date()
		this.createdAt = date;
		this.updatedAt = date;
	}
}

export default User
