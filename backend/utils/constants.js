import config from "config";

global.port = config.get("port");
global.domain = config.get("domain");
global.mongoUri = config.get("mongo.uri");
global.ACCESS_TOKEN_SECRET = config.get("ACCESS_TOKEN_SECRET");
global.REFRESH_TOKEN_SECRET = config.get("REFRESH_TOKEN_SECRET");
global.ROLES = config.get("ROLES");
