const redisReadClient = require('../redisReadClient')
const redisWriteClient = require('../redisWriteClient')

module.exports.rateLimiter = (secondsWindow, allowedAPIHits, apiMessage) => async (req, res, next)=>{
    
    const ipAddress = req.headers["x-forwaded-for"] || req.connection.remoteAddress;

    if (ipAddress.substr(0,7)="::ffff:") {
        ipAddress = ipAddress.substr(7)
    }

    const numRequests = await redisWriteClient.incr(ipAddress+apiMessage);

    let ttl = secondsWindow;

    if (numRequests==1){
        await redisWriteClient.expire(ipAddress+apiMessage, secondsWindow);
    }
    else{
        ttl = await redisReadClient.ttl(ipAddress+apiMessage);
    }

    if (numRequests>allowedAPIHits){
        return res.status(503).json ({
            error: `API rate limit reached. Your limit will reset in ${ttl} seconds!!`
        })
    }

    next();
}
    