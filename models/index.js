import User from "./user.js";
import Tweet from "./tweet.js";
import Follower from "./follower.js";


User.hasMany(Tweet)
Tweet.belongsTo(User)

User.hasMany(Follower)
Follower.belongsTo(User)


await User.sync({alter: true})
await Tweet.sync({alter: true})
await Follower.sync({alter: true})
export {User, Tweet, Follower}
