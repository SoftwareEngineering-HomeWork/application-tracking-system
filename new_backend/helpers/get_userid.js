function getUserIdFromHeader(req) {
  if (!req.headers) {
    return undefined;
  }
  const headers = req.headers;
  const userId = headers.userid;
  return userId;
}

module.exports = getUserIdFromHeader;
