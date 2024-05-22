# wiki-client description

This is the client for the Harkawiki! 

## Features

Features include:
- Creation of posts
- Anonymity
- Markdown support

In the future, I plan to add editing with passkeys, upvoting, and comments (along with potentially some censorship due to the inappropriate nature of some posts).

## Development process

After a friend suggested to me this "social experiment", I started coding over the weekend. By Wednesday night of May 15, 2024, I deployed the app on vercel and it went semi-viral, garnering over 70 posts. Unfortunately, due to an exploit, a user was able to clear the whole database. I wasn't too bothered by this, however, because some posts had very vulgar content and no incentives to return.

## Update Log

### Version 1.1.1: May 20, 2024

I implemented a form of authentication in order to make requests to my backend. Developers must provide a secret key in order to make requests; at the moment, I am the only individual who has access to said key.

### Version 1.2.0: May 21, 2024

A profanity filter was added for titles and error messages were added.