const {response} = require('../common/API_RESPONSE')

exports.handler = async event => {
  console.log('event',event)
  
  return response._200({message:'default'})
};