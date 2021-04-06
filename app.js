console.log("starting");

const Twit = require('twit');

const config = require('./config');
let T = new Twit(config);

// Setting up a user stream
let stream = T.stream("user");

console.log(stream);


// Anytime someone replies to me:
stream.on('tweet', tweetEvent);

function tweetIt(txt) {
    let tweet = {
        status: txt
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err) {
            console.log("Something went wrong!");
        } else {
            console.log("It worked! :)");
        }
    }
}


function tweetEvent(eventMsg) {
    let replyTo = eventMsg.in_reply_to_screen_name;
    // let text = eventMsg.text;
    let from = eventMsg.user.screen_name;

    console.log(replyTo + ' ' + from);

    if (replyTo === "_MixMe_") {
        let newTweet = '@' + from + "thank you for tweeting at me! #nice";
        tweetIt(newTweet);
    }
}
















// THIS APP IS BUILT TO ALLOW USERS TO TWEET "@mixme" AND THEN MIXME WILL RESPOND WITH A TWEET WITH A LINK TO THEIR PERSONALIZED
// SPOTIFY PLAYLIST

// Listen for tweets that tweet at @mixme
// 2. When a user MENTIONS @mixme, get the tweet's id
// 3. IF the tweet's id IS NOT already in the database, then ADD the tweet id to the database, AND reply to the tweet with SPOTIFY info

// const express = require('express');
// const app = express();
// require('dotenv').config()


// const needle = require('needle');

// // const userId = 2244994945;
// const url = `https://api.twitter.com/2/users/${process.env.MY_USER_ID}/mentions`;

// // get the bearer token for authentication so that I can make requests to the Twitter API
// const bearerToken = process.env.BEARER_TOKEN;


// let userMentions = [];
// const getUserMentions = async () => {

//     let params = {
//         "max_results": 100,
//         // "tweet.fields": "created_at"
//     }

//     const options = {
//         headers: {
//             "User-Agent": "v2UserMentionssJS",
//             "authorization": `Bearer ${bearerToken}`
//         }
//     }

//     let hasNextPage = true;
//     let nextToken = null;
//     console.log("Retrieving mentions...");
//     while (hasNextPage) {
//         let resp = await getPage(params, options, nextToken);
//         if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
//             if (resp.data) {
//                 userMentions.push.apply(userMentions, resp.data);
//             }
//             if (resp.meta.next_token) {
//                 nextToken = resp.meta.next_token;
//             } else {
//                 hasNextPage = false;
//             }
//         } else {
//             hasNextPage = false;
//         }
//     }

//     console.dir(userMentions, {
//         depth: null
//     });

//     console.log(`Got ${userMentions.length} mentions for user ID ${process.env.MY_USER_ID}!`);

// }

// getUserMentions();

// // activate this function every hour
// // setTimeout(
// //     getUserMentions, 3600000
// // );

// const postUserMentions = async () => {

//     let params = {
//         in_reply_to_status_id
//         // "tweet.fields": "created_at"
//     }

//     const options = {
//         headers: {
//             "User-Agent": "v2UserMentionssJS",
//             "authorization": `Bearer ${bearerToken}`
//         }
//     }

//     let hasNextPage = true;
//     let nextToken = null;
//     console.log("Retrieving mentions...");
//     while (hasNextPage) {
//         let resp = await getPage(params, options, nextToken);
//         if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
//             if (resp.data) {
//                 userMentions.push.apply(userMentions, resp.data);
//             }
//             if (resp.meta.next_token) {
//                 nextToken = resp.meta.next_token;
//             } else {
//                 hasNextPage = false;
//             }
//         } else {
//             hasNextPage = false;
//         }
//     }

//     console.dir(userMentions, {
//         depth: null
//     });

//     console.log(`Got ${userMentions.length} mentions for user ID ${process.env.MY_USER_ID}!`);

// }

// postUserMentions();






// app.listen(5000, () => {
//     console.log(`Server has started on port 5000! And the answer is: ${bearerToken}`);
// });


