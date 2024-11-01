function getTokenFromHeader(req) {
  if (!req.headers.authorization) {
    return undefined;
  }
  const token = req.headers.authorization.split(" ")[1];
  return token;
}

module.exports = { getTokenFromHeader };
