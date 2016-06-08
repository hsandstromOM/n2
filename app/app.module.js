var angular = require('angular');
var uiRouter = require('angular-ui-router');


var nautilusApp = angular.module('nautilusApp', ['ui.router']);

nautilusApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: './app/components/home/homeView.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })

        .state('about', {
          url: '/about',
          templateUrl: './app/components/about/aboutView.html',
          controller: 'AboutController',
          controllerAs: 'about'
        })

        .state('customHomes', {
          url: '/customHomes',
          templateUrl: './app/components/customHomes/customHomesView.html',
          controller: 'CustomHomesController',
          controllerAs: 'customHomes'
        })

        .state('customHomesDetail', {
          url: '/customHomesDetail',
          templateUrl: './app/components/customHomesDetail/customHomesDetailView.html',
          controller: 'CustomHomesDetailController',
          controllerAs: 'customHomesDetail'
        })

        .state('homeMgmt', {
          url: '/homeMgmt',
          templateUrl: './app/components/homeMgmt/homeMgmtView.html',
          controller: 'HomeMgmtController',
          controllerAs: 'homeMgmt'
        })

        .state('news', {
          url: '/news',
          templateUrl: './app/components/news/newsView.html',
          controller: 'NewsController',
          controllerAs: 'news'
        })

        .state('contact', {
          url: '/contact',
          templateUrl: './app/components/contact/contactView.html',
          controller: 'ContactController',
          controllerAs: 'contact'
        })

        .state('testimonials', {
          url: '/testimonials',
          templateUrl: './app/components/testimonials/testimonialsView.html',
          controller: 'TestimonialsController',
          controllerAs: 'testimonials'
        })

        .state('careers', {
          url: '/careers',
          templateUrl: './app/components/careers/careersView.html',
          controller: 'CareersController',
          controllerAs: 'careers'
        })

        .state('clientLogin', {
          url: '/clientLogin',
          templateUrl: './app/components/clientLogin/clientLoginView.html',
          controller: 'ClientLoginController',
          controllerAs: 'clientLogin'
        });
});

require('./components/home/homeController');

require('./components/about/aboutController');

require('./components/customHomes/customHomesController');
require('./components/customHomes/customHomesService');

require('./components/customHomesDetail/customHomesDetailController');

require('./components/homeMgmt/homeMgmtController');

require('./components/news/newsController');

require('./components/contact/contactController');

require('./components/testimonials/testimonialsController');

require('./components/careers/careersController');

require('./components/clientLogin/clientLoginController');

require('./shared/customHomeListing/customHomeListingDirective');
