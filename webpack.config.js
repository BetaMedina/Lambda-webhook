const glob = require('glob');
const path = require('path');

module.exports = {
  entry:glob.sync('./lambdas/**/**.js').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
 },{}),
  target: 'node',
  mode: 'production',
}