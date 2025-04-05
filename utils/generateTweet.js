const {OpenAIApi, Configuration} = require('openai')

const configuration = new Configuration({
    apiKey : process.env.AI_API_KEY
})

const openai = new OpenAIApi(configuration);

module.exports.generateTweetFromTopics = async(topics) => {
    try {
        
        const response = await openai.createCompletion({
            model: "gpt3.5-turbo",
            prompt: `you are a professional tweet generator. Generate a viral tweet on topics: ${topics}. Keep the tweet humorouse and engaging with emojis`,
            max_tokens : 100
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        throw error
    }
}

module.exports.generateImageFromTweet = async (topics, tweet) => {
    try {
        
        const response = await openai.createImage( {
            prompt: `generate an image on topic: ${topics} based on the following tweet: ${tweet}`,
            n: 1,
            size: '1024x1024'
        })

        return response.data.data[0].url;
    } catch (error) {
        throw error
    }
}