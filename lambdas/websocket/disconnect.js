const {response} = require('../common/API_RESPONSE')
const {Dynamo} = require('../common/DYNAMO')

const tableName = process.env.tableName
exports.handler = async event => {
  console.log('event',event)

  const{connectionId: connectionID} = event.requestContext

  await Dynamo.delete(connectionID,tableName)
  
  return response._200({message:'disconnected'})
};