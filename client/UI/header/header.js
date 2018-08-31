Template.header.helpers({
  judge(){
    return {lastname: 'Viktor podreznik'}
    return Judges.findOne({PIN: Session.get('PIN')})
  },
  title(){
    return 'Combi -> Standard -> Final'
  }
})
Template.header.events({
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