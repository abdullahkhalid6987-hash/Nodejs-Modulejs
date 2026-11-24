import GoogleStrategy from "passport-google-oidc";
import passport from "passport";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      console.log("Issuer:", issuer);
      console.log("Google Profile:", profile);

      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        picture: profile.photos?.[0]?.value,
      };
      return cb(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});