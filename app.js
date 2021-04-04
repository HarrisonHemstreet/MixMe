// THIS APP IS BUILT TO ALLOW USERS TO TWEET "@mixme" AND THEN MIXME WILL RESPOND WITH A TWEET WITH A LINK TO THEIR PERSONALIZED
// SPOTIFY PLAYLIST

// Listen for tweets that tweet at @mixme
// 2. When a user MENTIONS @mixme, get the tweet's id
// 3. IF the tweet's id IS NOT already in the database, then ADD the tweet id to the database, AND reply to the tweet with SPOTIFY info

const express = require('express');
const app = express();
// const cors = require('cors');
// const { Pool, Client } = require("pg");
// const axios = require('axios');
// const Twitter = require('twitter');

// require("dotenv/config");
// const twit = require("./twit");


// const apikey = process.env.CONSUMER_KEY;
// const apiSecret = process.env.COMSUMER_SECRET;
// const accessToken = process.env.ACCESS_TOKEN;
// const accessTokenSecret = process.env.TOKEN_SECRET;

// const client = new Twitter({
//     consumer_key: apikey,
//     consumer_secret: apiSecret,
//     access_token_key: accessToken,
//     access_token_secret: accessTokenSecret,
// });

// let params = {screen_name: 'MixMe'};
// client.get('statuses/user_timeline')



// // const pool = require('./db')



// const pool = new Pool({
//     user: "hhemstreet",
//     password: "password",
//     host: "localhost",
//     port: "5432",
//     database: "mixme"
// });

// const baseTURLMentionUserName = "https://api.twitter.com/2";

// setTimeout(
//     axios.get('https://api.twitter.com/2/users/by/username/?twitterUsername')
// )



// // MIDDLEWARE
// app.use(cors());
// app.use(express.json());

// ROUTES

// listens via setTimeout() for new mentions


// 


const needle = require('needle');

const userId = 2244994945;
const url = `https://api.twitter.com/2/users/${userId}/mentions`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
// const bearerToken = process.env.BEARER_TOKEN;
const bearerToken = "AAAAAAAAAAAAAAAAAAAAAIMWOQEAAAAApMYV0lo6DqGj2YvZ1OekSgWBE00%3DxsL9RJXtVawT4XsEKS1J6izjYY8RjuZcn9e8uUhGJyVWf2oaH8";
// this is the ID for @TwitterDev
let userMentions = [];
const getUserMentions = async () => {
    
    let params = {
        "max_results": 100,
        "tweet.fields": "created_at"
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
    console.log(`Server has started on port 5000! And the answer is: ${userMentions}`);
});