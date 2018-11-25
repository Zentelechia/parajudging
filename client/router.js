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
  layoutTemplate: 'full',
  name: 'login',
  action: function () {
    this.render('login')
  }
})

Router.route('/picker', {
  name: 'picker',
  layoutTemplate: 'full',
  onBeforeAction(){
    if (!Session.get('pin')){
      Router.go('/login')
    }
    this.next()
  },
  action: function () {
    this.render('picker')
  }
})
Router.route('/', {
  name: 'main',
  template: 'elements',
  layoutTemplate: 'navSide'
})
Router.route('/judges', {
  name: 'judjes',
  action: function () {
    this.render('judges')
  }
})
Router.route('/athlethes', {
  name: 'athlethes',
  waitOn: function () {
    return Meteor.subscribe('athlethes');
  },
  action: function () {
    this.render('athlethes')
  }
})
Router.route('/program/:id', function () {
  const id = this.params.id;
  Session.set('itemId', null);
  Session.set('programId', id);

  this.layout('navSide2');
  this.wait(Meteor.subscribe('items', id));

  this.render('elements');
  this.render('items', {
    to: "second"
  });
})

Router.route('/item/:id', function () {
  const id = this.params.id;
  Session.set('itemId', this.params.id);

  this.layout('navSide3');

  this.wait(Meteor.subscribe('judging', id));

  this.render('elements');
  this.render('items', {
    to: "second"
  });
  this.render('results', {
    to: "third"
  });
})

Router.route('/activate', {
  name: 'activate',
  action: function () {
    this.render('activate')
  }
})