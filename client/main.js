Template.login.events({
  'keyup #PIN'() {
    pin = $("#PIN").val()
    if (pin.length > 3) {
      Session.set("pin", +pin)
    }
  }
})
Template.login.helpers({
  judge() {
    j = Judges.findOne()
    if (j) {
      Session.set('judge', j)
      if (j.letter == 'CH') {
        Router.go('/activate')

      } else {

        Router.go('/picker')
      }
    }
  }
})
Template.zubscribe.helpers({
  zelper(){
    Meteor.subscribe('dataByPin', Session.get('pin'))
    return " "
  }
});