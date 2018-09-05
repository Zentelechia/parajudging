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
    if (!Session.get('judge')){
      Router.go("/")
    }
    this.render('picker')
  }
})

Router.route('/activate', {
  name: 'activate',
  action: function() {

    this.render('activate')
  }
})