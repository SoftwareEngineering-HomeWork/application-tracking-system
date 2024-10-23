function getUserIdFromHeader(req) {
    const headers = req.headers;
    const userId = headers.userid;
    return userId;
}

module.exports=getUserIdFromHeader;