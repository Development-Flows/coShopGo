const { decodeJwt } = require("jose");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    try {
      token = token.split(" ")[1];
      const decodedToken = await decodeJwt(token);
      req.accessToken = decodedToken;
      next();
    } catch (e) {
      return res.status(401).send({ status: false, errorMessage: "Auth error" });
    }
  } else {
    return res.status(401).send({ status: false, errorMessage: "Token not found" });
  }

};
