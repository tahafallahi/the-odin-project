import passport from "passport";
import Strategy from "passport-local";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

passport.use(
  new Strategy(async (username, password, done) => {
    if (!process.env.DUMMY_HASH) {
      throw new Error("DUMMY_HASH env var is required");
    }

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      const hash = user ? user.hashed_password : process.env.DUMMY_HASH;
      const isValid = await bcrypt.compare(password, hash);

      if (!user || !isValid) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    done(null, user);
  } catch (err) {
    done(err);
  }
});
