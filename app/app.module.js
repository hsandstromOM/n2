var angular = require('angular');
var uiRouter = require('angular-ui-router');

var nautilusApp = angular.module('nautilusApp', [
  'ui.router',
  'ngSanitize',
  'contentful',
  'hc.marked'
]);

nautilusApp.config(function($stateProvider, $urlRouterProvider, contentfulProvider) {

    contentfulProvider.setOptions({
      space: '80s1v057uxnv',
      accessToken: '361c4996eb1e9c4236cea0b5c21701c76f302ec59f42c1b5111d365c7faee500'
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: './app/components/home/homeView.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl'
        })

        .state('about', {
          url: '/about',
          templateUrl: './app/components/about/aboutView.html',
          controller: 'AboutController',
          controllerAs: 'aboutCtrl'
        })

        .state('customHomes', {
          url: '/customHomes',
          templateUrl: './app/components/customHomes/customHomesView.html',
          controller: 'CustomHomesController',
          controllerAs: 'customHomesCtrl'
        })

        .state('customHomesDetail', {
          url: '/customHomesDetail',
          templateUrl: './app/components/customHomesDetail/customHomesDetailView.html',
          controller: 'CustomHomesController',
          controllerAs: 'customHomesCtrl'
        })

        .state('homeMgmt', {
          url: '/homeMgmt',
          templateUrl: './app/components/homeMgmt/homeMgmtView.html',
          controller: 'HomeMgmtController',
          controllerAs: 'homeMgmtCtrl'
        })

        .state('news', {
          url: '/news',
          templateUrl: './app/components/news/newsView.html',
          controller: 'NewsController',
          controllerAs: 'newsCtrl'
        })

        .state('contact', {
          url: '/contact',
          templateUrl: './app/components/contact/contactView.html',
          controller: 'ContactController',
          controllerAs: 'contactCtrl'
        })

        .state('testimonials', {
          url: '/testimonials',
          templateUrl: './app/components/testimonials/testimonialsView.html',
          controller: 'TestimonialsController',
          controllerAs: 'testimonialsCtrl'
        })

        .state('careers', {
          url: '/careers',
          templateUrl: './app/components/careers/careersView.html',
          controller: 'CareersController',
          controllerAs: 'careersCtrl'
        })

        .state('clientLogin', {
          url: '/clientLogin',
          templateUrl: './app/components/clientLogin/clientLoginView.html',
          controller: 'ClientLoginController',
          controllerAs: 'clientLogin'
        });
});


require('./app.routes.js');
require('./components/home/homeController');

require('./components/about/aboutController');
require('./components/about/aboutService');

require('./components/customHomes/customHomesController');
require('./components/customHomes/customHomesService');

require('./components/homeMgmt/homeMgmtController');
require('./components/homeMgmt/homeMgmtService');

require('./components/news/newsController');
require('./components/news/newsService');

require('./components/contact/contactController');

require('./components/testimonials/testimonialsController');

require('./components/careers/careersController');
require('./components/careers/careersService');

require('./components/clientLogin/clientLoginController');

require('./shared/customHomeListing/customHomeListingDirective');

require('angular-sanitize/angular-sanitize');
require('angular-contentful/dist/angular-contentful.js');
require('angular-marked/dist/angular-marked.js');
