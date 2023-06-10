import passport from 'passport';
import dotenv from 'dotenv';
import passportGoogle from 'passport-google-oauth20';

dotenv.config();

/* Create The Google Strategy */
const GoogleStrategy = passportGoogle.Strategy;

export const middlewarePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((user, done) => {
    done;
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
      },
      (accessToken, reeefreshToke, profile, done) => {
        return done(null, profile);
      }
    )
  );
};
