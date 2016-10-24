var api_key = process.env.api_key || 'be114d521d8940e1b03aaed7cc810422';

var giveKey = function(){
  return api_key;
};

module.exports = giveKey;