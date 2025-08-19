const auth = require("basic-auth");
const db = require("./db");

function basicAuth(req, res, next) {
  const credentials = auth(req);
  if (!credentials || !credentials.name || !credentials.pass) {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Access denied");
  }

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [credentials.name, credentials.pass],
    (err, user) => {
      if (err) return next(err);
      if (!user) {
        res.set("WWW-Authenticate", 'Basic realm="example"');
        return res.status(401).send("Invalid credentials");
      }
      req.user = user;
      next();
    }
  );
}

module.exports = basicAuth;