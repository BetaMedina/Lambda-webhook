const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
  async get(ID,TableName){
    const parameters = {
      TableName,
      Key:{
        ID
      }
    }
    const data = await documentClient.get(parameters).promise()
    if(!data||!data.Item){
      throw new Error('There was an error fetching data for id')
    } 
    return data.Item
  },

  async write(data,TableName){
    if(!data.ID){
      throw new Error('No item on the data')
    }
    const parameters = {
      TableName,
      Item:data
    }
    console.log(parameters)
    const createdata = await documentClient.put(parameters).promise()

    if(!createdata){
      throw new Error('data has not been created in Dynamo')
    }
    return data
  },

  async delete(ID,TableName){
    const parameters = {
      TableName,
      Key:{
        ID
      }
    }
    return documentClient.delete(parameters).promise()
  },
}

module.exports={Dynamo}