const AWS = require("aws-sdk");

const create = (domainName, stage) => {
  const endpoint = `${domainName}/${stage}`;
  return new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint,
  });
};

const send = ({domainName, stage, connectionID, menssage}) => {
  const websocket = create(domainName, stage)

  const postParams = {
    Data:menssage,
    ConnectionId:connectionID
  }

  return websocket.postToConnection(postParams).promise()
};

module.exports = { send };
