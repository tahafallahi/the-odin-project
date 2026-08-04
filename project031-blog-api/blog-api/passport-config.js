import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as AnonymousStrategy } from "passport-anonymous";
import { prisma } from "./prisma/prisma.js";
import bcrypt from "bcrypt";

var opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = process.env.JWT_SECRET;

passport.use(new AnonymousStrategy());

passport.use(
  new JwtStrategy(opt, async function (jwt_payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.sub },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    username,
    password,
    done,
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: username },
      });

      if (user) {
        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (isPasswordValid) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }),
);
