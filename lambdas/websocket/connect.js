const { response } = require("../common/API_RESPONSE");
const { Dynamo } = require("../common/DYNAMO");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);

  const {
    connectionId: connectionID,
    domainName,
    stage,
  } = event.requestContext;

  const data = {
    ID: connectionID,
    date: Date.now(),
    menssage: [],
    domainName,
    stage,
  };
  await Dynamo.write(data, tableName);

  return response._200({ menssage: "connected" });
};
