angular
  .module('nautilusApp')
  .controller('TestimonialsController', TestimonialsController);

  function TestimonialsController() {
    var vm = this;

    console.log('the Testimonials controller, it does nothing');

    this.fromCtrl = 'hello from Testimonials controller';
  }
