const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../database/queries.js");

passport.use(
  new Strategy(async (username, password, done) => {
    const user = await db.getUserByEmail(username);
    try {
      if (!user) {
        return done(null, false);
      } else {
        if (await !bcrypt.compare(password, user.hash)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      }
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
