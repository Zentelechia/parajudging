Template.login.events({
  'keyup #PIN'(){
    j=Judges.findOne({ PIN: +$("#PIN").val() })
    if (j){
      Session.set("judge",j)
      Router.go('/picker')
    }
  }
})