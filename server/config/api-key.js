// var api_key = process.env.api_key;

var api_key = process.env.api_key || '05ba9bcdb55743a2ab522a4ebc7cf711';
//Legacy Group: note - your API key will go on the right side of the
//"OR" logic above. Line 1 that we have here is what's used on
//our deployed site, which had the api_key separate stored as a config var

var giveKey = function(){
  return api_key;
};

module.exports = giveKey;
