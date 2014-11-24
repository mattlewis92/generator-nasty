'use strict';

/**
 * @api {<%= httpMethod %>} <%= actionPath.replace('/api/v1', '') %> <%= apiDescription %>
 * @apiName <%= apiName %>
 * @apiGroup <%= apiGroup %>
 *
 */
module.exports = function(req, res) {

  res.json({hello: 'world!'});

};
