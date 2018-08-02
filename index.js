var search = require(__dirname + '/search.js');

exports.handler = async (event, context) => {
  search.crwalImages(event.q, function(results){
    context.done(null, results);
  });
};