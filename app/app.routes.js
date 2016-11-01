var uiRouter = require('angular-ui-router');

var nautilusApp = angular.module('nautilusRouter', ['ui.router']);

nautilusApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider

      .state('home', {
          url: '/',
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
        url: '/custom-home-construction',
        templateUrl: './app/components/customHomes/customHomesView.html',
        controller: 'CustomHomesController',
        controllerAs: 'customHomesCtrl'
      })

      .state('customHomesDetail', {
        url: '/custom-home-construction/:customHomeTitle',
        templateUrl: './app/components/customHomesDetail/customHomesDetailView.html',
        controller: 'CustomHomesController',
        controllerAs: 'customHomesCtrl',
        params: {
          customHomeID: null,
        },
      })

      .state('homeMgmt', {
        url: '/home-management-services',
        templateUrl: './app/components/homeMgmt/homeMgmtView.html',
        controller: 'HomeMgmtController',
        controllerAs: 'homeMgmtCtrl'
      })

      .state('news', {
        url: '/news/:topic/:keyword',
        templateUrl: './app/components/news/newsView.html',
        controller: 'NewsController',
        controllerAs: 'newsCtrl'
      })

      .state('newsDetail', {
        url: '/news/:topic/:keyword/:postTitle',
        templateUrl: './app/components/news/newsDetailView.html',
        controller: 'NewsController',
        controllerAs: 'newsCtrl',
        params: {
          postID: null,
        },
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
      });
});

require('./components/main/mainController');
require('./components/main/mainService');

require('./components/home/homeController');
require('./components/home/homeService');

require('./components/about/aboutController');
require('./components/about/aboutService');

require('./components/customHomes/customHomesController');
require('./components/customHomes/customHomesService');

require('./components/homeMgmt/homeMgmtController');
require('./components/homeMgmt/homeMgmtService');

require('./components/news/newsController');
require('./components/news/newsService');

require('./components/contact/contactController');
require('./components/contact/contactService');

require('./components/testimonials/testimonialsController');
require('./components/testimonials/testimonialsService');

require('./components/careers/careersController');
require('./components/careers/careersService');

require('./shared/trustUrl.filter.js');
