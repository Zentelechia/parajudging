import {Router, RouteController} from 'meteor/iron:router'

Router.route('/', {
  name: 'login',
  action: function() {
    this.render('login')
  }
})

Router.route('/picker', {
  name: 'picker',
  action: function() {
    this.render('picker')
  }
})

Router.route('/activate', {
  name: 'activate',
  action: function() {
    this.render('activate')
  }
})