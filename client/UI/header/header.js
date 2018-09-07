Template.header.helpers({
  judge(){
    return Judges.findOne()
  },
  title(){
    pi = ProgramItems.findOne({ active: true })
    if (pi){
      pi.heat = Session.get('heatToDisplay')
      return pi
    }
  }
})
Template.header.events({
'click .judge'(){
  Meteor.subscribe('dataByPin',null)
  Session.set('pin',null)
  Router.go('/')
},
'click .switch'(){
  if (Session.get('final')){
    Session.set('final',false)
    Session.set("programItem",notFinal)

  }  
  else { 
    Session.set('final',true)
    Session.set("programItem",final)
  }
}
})