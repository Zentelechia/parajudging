UI.registerHelper('eq',(a,b)=>{
  return a==b
})
Template.footer.helpers({
  heats(){
    api = ProgramItems.findOne({active: true})
    if (api){
      return ProgramItems.find({heat: {$lte: api.heat},program_element: api.program_element, Dance: api.Dance, Level: api.Level},{sort: {heat: 1}}).fetch()
    }
  },
  activeHeat(){
    return Session.get('activeHeat')
  }
})
Template.footer.events({
  'click .violation'(){
    item = Session.get('item')
    judge = Session.get('judge')

    Meteor.call('violation',{ item, judge })
  },
  'click .send'(){
    Session.set("sended",true)
    Meteor.call('send',Session.get('judge'))

  },
  'click .currentHeat'(){
    api=ProgramItems.findOne({active: true})
    if (api){
      Session.set('heatToDisplay', api.heat)
    }
  },
  'click .all'(){
    $('#heatSelector').show()
  },
  'click .heat'(e){
    Session.set('heatToDisplay',+e.currentTarget.id)
    $('#heatSelector').hide()

  }
})