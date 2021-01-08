const { App } = require('deta');
const express = require('express');
const got = require("got");
const cors = require("cors");

const app = App(express());

app.options("/posts/:username", cors());
app.disable('etag');
app.get("/posts/:username", cors(), async(req, res) => {
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
