// Middleware function to check user authorization tokens
authmiddleware = (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).json({ success: "OPTIONS" });
    }
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userid = token.split(".")[0];
    const user = Users.findById(userid); // Assuming Users is a model you have

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let expiryFlag = false;
    for (const tokens of user.authTokens) {
      if (tokens.token === token) {
        const expiryTimeObject = new Date(tokens.expiry);
        if (new Date() <= expiryTimeObject) {
          expiryFlag = true;
        } else {
          deleteAuthToken(tokens, userid); // Assuming deleteAuthToken is defined
        }
        break;
      }
    }

    if (!expiryFlag) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authmiddleware;
