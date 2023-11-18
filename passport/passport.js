const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://gym-api-omega.vercel.app/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);
function isLoggedInGoogle(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports.isLoggedInGoogle = isLoggedInGoogle;

//////////////////////////////////////Reference//////////////////////////////////////////////////
////////////////////https://github.com/kriscfoster/node-google-oauth-2///////////////////////////
