const URL = require('url').URL;

const validateTopics = (req,res,next) => {

    const topics = req.query.topics

    if (!topics || topics.split(" ").length >3) {
        return res.status(400).json({
            error: ""
        })
    }

    next()
}

const validatePostTweet = (req,res,next) => {

    const tweet = req.body.tweet;
    const imageUrl = req.body.image;

    if (!tweet || !tweet.length) {
        return res.status(400).json({ 
            error: "Invalid tweet"
        })
    }

    if (imageUrl) {

        try {
            new URL(imageUrl)
        } catch (error) {
            res.status(400).json( {
                error: "please provide a valid image url"
            })
        }
    }

    next();
}

module.exports = {
    validatePostTweet,
    validateTopics
}
