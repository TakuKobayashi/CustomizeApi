var GoogleSearch = require(__dirname + '/google_search.js');
var google_search = new GoogleSearch();

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event));
  google_search.searchImages(event.q).then(function(results){
    context.done(null, results);
  });
};