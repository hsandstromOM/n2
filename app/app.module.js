var angular = require('angular');

var nautilusApp = angular.module('nautilusApp', [
  'nautilusRouter',
  'ngResource',
  'slugifier',
  'ngSanitize',
  'contentful',
  'hc.marked'
]);

nautilusApp.config(function(contentfulProvider) {

    contentfulProvider.setOptions({
      space: '80s1v057uxnv',
      accessToken: '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500'
    });

});

require('./app.routes.js');

require('angular-sanitize/angular-sanitize.js');
require('angular-slugify/angular-slugify.js');
require('angular-resource/angular-resource.js');
require('angular-contentful/dist/angular-contentful.js');
require('angular-marked/lib/angular-marked.js');
