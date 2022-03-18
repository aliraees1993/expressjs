const https = require("https");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const { verify } = require("crypto");

const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
    callbackURL: "/auth/google/callback",
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

const app = express();

const PORT = 3000;

app.use(helmet());
app.use(
    cookieSession({
        name: "session",
        maxAge: 1000 * 60 * 60 * 24,
        keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    })
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: "You must log in!",
        });
    }
    next();
}

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["email"],
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/failure",
        successRedirect: "/",
        session: true,
    }),
    (req, res) => {
        console.log("Google called us back");
    }
);

app.get("/auth/logout", (req, res) => {
    req.logout();
    return res.redirect("/");
});

app.get("/secret", checkLoggedIn, (req, res) => {
    return res.send(`Your personal secret value is 42!`);
});

app.get("/failure", (req, res) => {
    return res.send(`Failed to login`);
});

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

https
    .createServer(
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
