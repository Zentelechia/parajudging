Tracker.autorun(()=>{
  // Meteor.subscribe('dataByPin', Session.get('pin'))
})
Template.login.events({
  'keyup #PIN'() {
    pin = $("#PIN").val()
    if (pin.length > 4) {
      Session.set("pin", +pin)
    }
  }
})
Template.login.helpers({
  judge() {
    j = Judges.findOne()
    if (j) {
      Session.set('judge', j)
      if (j.letter=='CH'){
        Router.go('/activate')

      }else {

        Router.go('/picker')
      }
    }
  }
})
Template.subscribe.helpers({
  sub(){
    Meteor.subscribe('elements');
    Meteor.subscribe('dataByPin', Session.get('pin'))
  }
})
