UI.registerHelper('eq',(a,b)=>{
  return a==b
})
Template.footer.helpers({
  heats(){
    return Session.get('programItem')
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
    item = Session.get('item')
    judge = Session.get('judge')
    participants = Session.get('selectParticipans')
    selected = []
    _.each(participants, p=>{if (p.selected) selected.push(p) })
    Meteor.call('violation',Session.get('judge'))

  },
  'click .currentHeat'(){
    Session.set('currentHeat',Session.get('activeHeat'))
  },
  'click .all'(){
    $('#heatSelector').show()
  },
  'click .heat'(e){
    Session.set('heatToDisplay',e.currentTarget.id-1)
    $('#heatSelector').hide()

  }
})