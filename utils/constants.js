import config from "config";

global.port = config.get("port");
global.domain = config.get("domain");
global.mongoUri = config.get("mongo.uri");
