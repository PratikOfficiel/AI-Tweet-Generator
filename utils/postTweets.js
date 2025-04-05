const axios = require("axios");
const {TwitterApi, TweetRetweetersUsersV2Paginator} = require('twitter-api-v2');
const fs = require('fs');

const downloadImage = async(imageUrl) => {
    try {
        
        const response = await axios( {
            url: imageUrl,
            method: "GET",
            responseType: "stream"
        });

        const writer = fs.createWriteStream(savePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject)=> {
            writer.on('finish', resolve);
            writer.on('error',reject);
        })

    } catch (error) {
        throw error;
    }
}

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN, 
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET, 
  });

module.exports.postTweet = async (tweet, imageUrl) => {
    try {
        
        if (imageUrl) {
            await downloadImage(imageUrl);
            const mediaId = await twitterClient.v1.uploadMedia(imageUrl);
            const response = await twitterClient.v1.tweet(tweet,{media_ids:[mediaId]});
            return response;
        }
        else{
            const response = await twitterClient.v1.tweet(tweet);
            return response;
        }


    } catch (error) {
        throw error
    }
}