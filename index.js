const { App } = require('deta');
const express = require('express');
const got = require("got");

const app = App(express());

app.disable('etag');
app.get('/posts/:username', async(req, res) => {
    const posts = await getPostsMedium(req.params.username);
	res.send(posts);
});

async function getPostsMedium(username) {
	try {
		const rss_url = await got(`https://feed2json.org/convert?url=https://medium.com/feed/${username}`);
		return (JSON.parse(rss_url.body));
	}
	catch(rss_url) {
		return 404;
	}

}

module.exports = app;
