// THIS APP IS BUILT TO ALLOW USERS TO TWEET "@mixme" AND THEN MIXME WILL RESPOND WITH A TWEET WITH A LINK TO THEIR PERSONALIZED
// SPOTIFY PLAYLIST

// Listen for tweets that tweet at @mixme
// 2. When a user MENTIONS @mixme, get the tweet's id
// 3. IF the tweet's id IS NOT already in the database, then ADD the tweet id to the database, AND reply to the tweet with SPOTIFY info

const express = require('express');
const app = express();
require('dotenv').config()


const needle = require('needle');

const userId = 2244994945;
const url = `https://api.twitter.com/2/users/${userId}/mentions`;

// get the bearer token for authentication so that I can make requests to the Twitter API
const bearerToken = process.env.BEARER_TOKEN;


let userMentions = [];
const getUserMentions = async () => {
    
    let params = {
        "max_results": 100,
        // "tweet.fields": "created_at"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserMentionssJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving mentions...");
    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                userMentions.push.apply(userMentions, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    console.dir(userMentions, {
        depth: null
    });

    console.log(`Got ${userMentions.length} mentions for user ID ${userId}!`);

}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}
getUserMentions()
// let answer = getUserMentions();







app.listen(5000, () => {
    console.log(`Server has started on port 5000! And the answer is: ${bearerToken}`);
});