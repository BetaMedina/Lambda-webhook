const { response } = require("../common/API_RESPONSE");
const { Dynamo } = require("../common/DYNAMO");
const {send} = require("../common/WebSocketMessage")

const tableName = process.env.tableName;

exports.handler = async (event) => {
  const { connectionId: connectionID } = event.requestContext;

  const body = JSON.parse(event.body);

  try {
    const record = await Dynamo.get(connectionID, tableName);
    const { menssage, domainName, stage } = record;

    menssage.push(body.menssage);

    const data = {
      ...record,
      menssage,
    };

    await Dynamo.write(data, tableName);

    await send({domainName, stage, connectionID, menssage:'Updated'});
    return response._200({ menssage: "got a message" });
  } catch (err) {
    console.log(err);
  }

};
