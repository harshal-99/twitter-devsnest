import express from 'express';
import morgan from 'morgan';
import userRouter from "./api/userRouter.js";
import tweetRouter from "./api/tweetRouter.js";
import twitterService from "./service/twitter.service.js";

const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/user', userRouter)
app.use('/api/tweet', tweetRouter)
app.use('/api/reset', (req, res) => {
	twitterService.resetData()
	res.status(200).json({message: 'Data reset'})
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
