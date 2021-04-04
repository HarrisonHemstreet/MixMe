// THIS APP IS BUILT TO ALLOW USERS TO TWEET "@mixme" AND THEN MIXME WILL RESPOND WITH A TWEET WITH A LINK TO THEIR PERSONALIZED
// SPOTIFY PLAYLIST

// Listen for tweets that tweet at @mixme
// 2. When a user MENTIONS @mixme, get the tweet's id
// 3. IF the tweet's id IS NOT already in the database, then ADD the tweet id to the database, AND reply to the tweet with SPOTIFY info

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())


app.listen(5000, () => {
    console.log("Server has started on port 5000!");
})