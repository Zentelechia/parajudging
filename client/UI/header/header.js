
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
  Session.set('pin',null)
  Router.go('/')
},
'click .switch'(){
    var el = document.documentElement,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen 
    ;

    rfs.call(el);
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