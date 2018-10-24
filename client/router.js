import {
  Router,
  RouteController
} from 'meteor/iron:router'

Router.configure({
  debug: false,
  layoutTemplate: 'navSide',
  loadingTemplate: 'loading',
  notFoundTemplate: "notFound",
  onBeforeAction: function () {
    Session.set('noFloatingChat', false)
    this.render('loading')
    this.next()
  }
})

Router.route('/login', {
  name: 'login',
  action: function () {
    this.render('login')
  }
})

Router.route('/picker', {
  name: 'picker',
  action: function () {
    this.render('picker')
  }
})
Router.route('/', {
  name: 'programs',
  waitOn: function(){
    return Meteor.subscribe('all');
  },
  action: function () {
    this.render('program')
  }
})
Router.route('/judges', {
  name: 'judjes',
  waitOn: function(){
    return Meteor.subscribe('all');
  },
  action: function () {
    this.render('judges')
  }
})
Router.route('/athlethes', {
  name: 'athlethes',
  waitOn: function(){
    return Meteor.subscribe('athlethes');
  },
  action: function () {
    this.render('athlethes')
  }
})
Router.route('/program/:id', {
  name: 'program',
  waitOn: function(){
    return Meteor.subscribe('all');
  },
  action: function () {
    Session.set('programId', this.params.id)
    this.render('program')
  }
})

Router.route('/activate', {
  name: 'activate',
  action: function () {
    this.render('activate')
  }
})