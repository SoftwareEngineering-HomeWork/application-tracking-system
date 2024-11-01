const Users = require("../models/User");

function deleteAuthToken(tokenToDelete, userId) {
  return Users.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      const authTokens = user.authTokens.filter(
        (token) => token !== tokenToDelete,
      );
      user.authTokens = authTokens;
      return user.save();
    })
    .then(() => "Token deleted successfully")
    .catch((err) => {
      throw new Error(`Error deleting token: ${err.message}`);
    });
}

module.exports = { deleteAuthToken };
