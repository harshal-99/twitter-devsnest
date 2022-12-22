import express from 'express';
import morgan from 'morgan';

import {connectToDb} from "./config/db.js";
import userRouter from "./api/userRouter.js";
import tweetRouter from "./api/tweetRouter.js";
import populateDb from "./config/populateDb.js";

const app = express();

void connectToDb()
void populateDb()

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/user', userRouter)
app.use('/api/tweet', tweetRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
