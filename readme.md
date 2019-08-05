# Groupme Bot
This bot's main function is to send a dad joke to the group every day at a
specific time. It currently runs daily at `0805` via cron job. I would like to
keep it running from cron as its simple and easy but I might setup a scheduler
with this new code that I am writing.

## Setup
change `example.env` to `.env` and change the contents to
```.env
NODE_ENV=production
BOT_ID=<Your bot's ID>
```
Add a cronjob for `5 8 * * * /usr/bin/node <path/to/index.js>`
