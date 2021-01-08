const { App } = require('deta');
const express = require('express');
const cors = require("cors");
const Feed = require("rss-in-json");

const app = App(express());

app.options("/stories/:username", cors());
app.disable('etag');
app.get("/stories/:username", cors(), async(req, res) => {
    const stories = await getPostsMedium(req.params.username);
	res.send(stories);
});

async function getPostsMedium(username) {
	let stories = {};
	await Feed.convert(`https://medium.com/feed/${username}`)
		.then(json => stories = json)
		.catch(err => console.log(err));

	return stories;
}

module.exports = app;
