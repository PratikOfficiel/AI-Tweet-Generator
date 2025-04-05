require('dotenv').config();
const express = require('express');
const {generateTweetFromTopic, generateImageFromTweet} = require("./utils/generateTweet.js");
const {validatePostTweet, validateTopics} = require('./utils/middlewares.js')
const {postTweet} = require("./utils/postTweets.js");

const app = express();

app.use(express.json())
app.use(express.static(__dirname+"/public"))

app.get('/', (req,res)=> {
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/generate-tweet', validateTopics,async(req,res)=> {
    try {
        const tweet = await generateTweetFromTopic(req.query.topics)
        res.status(200).json({
            tweet
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

app.get('/generate-tweet-with-image', validateTopics, async (req,res)=> {
    try {
        
        const tweet = await generateTweetFromTopic(req.query.topics);
        const imageUrl = await generateImageFromTweet(req.query.topics, tweet);

        res.status(200).json({
            tweet,
            imageUrl
        })
    } catch (error) {
        res.status(500).json({ 
            error
        })
    }
})

app.post('/post-tweet', validatePostTweet, async (req,res) => {
    try {
        
        const tweet = req.body.tweet;
        const imageUrl = req.body.image;

        await postTweet(tweet, imageUrl);

        res.status(200).json ({
            message: "Tweet successfully posted"
        })
    } catch (error) {
        res.status(400).json( {
            error
        })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})