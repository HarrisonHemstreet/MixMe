CREATE DATABASE mixme;

CREATE TABLE tweets(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    tweet_id VARCHAR(99) NOT NULL,
    tweet_text VARCHAR(300) NOT NULL,
);

-- 1. Check if the tweet has already been added to the database if not, then...
-- 2. Add tweet + id to database + queue up this tweet to have SPOTIFY + TWITTER's API respond to said tweet with a playlist

-- THE QUEUE should be a new database similar to the TWEETS database. HOWEVER, a couple actions should take place...
-- 1. the data should be PUSHED into an ARRAY
-- 2. AFTER the data has been used by spotify + twitter, THEN...
-- 3. UNSHIFT the data from the ARRAY