'use strict';

/**
 * @api {<%= httpMethod %>} <%= routePrefix.replace('/api/v1', '') %><%= actionPath %> <%= apiDescription %>
 * @apiName <%= apiName %>
 * @apiGroup <%= apiGroup %>
 *
 */
module.exports = function(req, res) {

  res.json({hello: 'world!'});

};
