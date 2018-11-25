Template.nav.helpers({
  heat() {
    return ProgramItems.findOne({
      active: true
    })
  }
})
Template.nav.events({
  'keyup #filter'() {
    Session.set('filter', document.getElementById('filter').value)
  }
})

Template.nav.onCreated(function(){
  Meteor.subscribe('elements');
  Meteor.subscribe('all');
})