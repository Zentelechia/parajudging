import {Router, RouteController} from 'meteor/iron:router'
// Router.configure({
//   loadingTemplate: "loading",
//   layoutTemplate: "applicationLayout",
//   onBeforeAction: function() {
//     if (!Meteor.userId() && this.route._path=="/login"){
//       Router.go("/login")
//     }
//     else if(!Meteor.userId()){
//       Router.go("/carousel")
//     }
//     $m=$('.modal')
//     if ($m.length){
//       $m.modal().modal('close')
//     }
//     $('.button-collaps').sideNav('hide')
//     this.next()
//   }
// })
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