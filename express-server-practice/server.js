const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

app.use((req, resp, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(
        `Method: ${req.method}, URL: ${req.baseUrl}${req.url}, Execution Time: ${delta} ms`
    );
});

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
    res.render("index", {
        title: "Blue Sunset",
        caption: "Blue Sunset",
    });
});

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
