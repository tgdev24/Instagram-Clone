let express = require("express");
let graphqlHTTP = require("express-graphql");
let {buildSchema } = require("graphql");
let cors = require("cors");
let bodyParser = require("body-parser");
let Pusher = require("pusher");
let Multipart = require("connect-multiparty")

var pusher = new Pusher({
  appId: '600119',
  key: 'a401d12a383ba3c41d69',
  secret: '2547cef462e335e9da70',
  cluster: 'us2',
  encrypted: true
});

//add middleware
let multipartMiddleWare = new Multipart();

let schema = buildSchema(`
	type User {
		id: String!
		nickname: String!
		avatar: String!
	}
	type Post {
		id: String!
		user: User!
		caption : String!
		image : String!
	}
	type Query{
		user(id: String) : User!
		post(user_id: String, post_id: String) : Post!
		posts(user_id: String) : [Post]
	}
	`);

let userslist = {
	a: {
		id: "a",
		nickname: "Obama",
		avatar: "https://www.sohh.com/wp-content/uploads/Screen-Shot-2017-01-11-at-9.04.10-AM.png"
	}, 
	b: {
		id:"b",
		nickname: "Leo",
		avatar: "https://data.whicdn.com/images/306805584/large.jpg"
	}
};

let postslist = {
	a: {
		a: {
			id: "a",
			user: userslist["a"],
			caption: "President combined with OVO rapper Drake", 
			image: "https://www.sohh.com/wp-content/uploads/Screen-Shot-2017-01-11-at-9.04.10-AM.png"
		},
		b: {
			id: "b",
			user: userslist["a"],
			caption: "The Wolf of Wall Street actor",
			image: "https://data.whicdn.com/images/306805584/large.jpg"
		}
	}
};

let root = {
	user: function({id}){
		return userslist[id];
	},
	post: function({user_id, post_id}){
		return postslist[user_id][post_id];
	},
	posts: function({user_id}){
		return Object.values(postslist[user_id]);
	}
};

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema, 
		rootValue: root, 
		graphiql: true
	})
);
app.post('/newpost', multipartMiddleWare, (req,res) => {
	let post = {
		user: {
			nickname: req.body.name,
			avatar: req.body.avatar
		}
		image: req.body.image,
		caption: req.body.caption
	}

	pusher.trigger("posts-channel", "new-post", {
		post
	});
	return res.json({status: "Post created"});
});

app.listen(4000);

