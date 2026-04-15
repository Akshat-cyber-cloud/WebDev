import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import type { IUser } from '../types/user.types.js';

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL as string,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;


          if (!email) {
            return done(new Error('No email found in Google profile'), undefined);
          }

          // Find user by googleId or email
          let user = await User.findOne({
            $or: [
              { googleId: profile.id },
              { email: email }
            ]
          });

          if (user) {
            // Update googleId if it's a legacy user logging in via Google
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }

          // Create new user if not found
          user = await User.create({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
          });

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }

    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;
