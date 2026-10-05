const http = require("http");
const fs = require("fs");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
	const url = new URL(request.url, "http://127.0.0.1");

	const hello = url.searchParams.get("hello");
	const hasHello = url.searchParams.has("hello");
	const hasUsers = url.searchParams.has("users");

	if (hasHello) {
		if (!hello) {
			response.writeHead(400, {
				"Content-Type": "text/plain",
			});

			response.end("Enter a name");
			return;
		}

		response.writeHead(200, {
			"Content-Type": "text/plain",
		});

		response.end(`Hello, ${hello}.`);
		return;
	}

	if (hasUsers) {
		const users = getUsers();

		response.writeHead(200, {
			"Content-Type": "application/json",
		});

		response.end(users);

		return;
	}

	if (!url.search) {
		response.writeHead(200, {
			"Content-Type": "text/plain",
		});

		response.end("Hello, World!");
		return;
	}

	response.writeHead(500);
	response.end();
});

server.listen(3003, "127.0.0.1", () => {
	console.log("Server started: http://127.0.0.1:3003");
});
