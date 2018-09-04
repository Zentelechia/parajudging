Template.activate.onRendered(()=>{
  pe = ProgramElements.findOne({active: true})
  if (pe){
    Session.set("programElement",pe.ID)
  }
})
Template.activate.helpers({
  elements(){
    return ProgramElements.find({},{sort: {Event: 1, Program: 1, Gender: 1, Class: 1, Description: -1}}).fetch()
  },
  items(){
    program_element=Session.get("programElement")
    if (program_element){
      return ProgramItems.find({ program_element },{sort: {Dance_order: 1, Level: -1,  heat: 1}}).fetch()
    }


    
  }
})


Template.activate.events({
  'click button'(e){
    pe = ProgramElements.findOne({active: true})
    if (pe){
      ProgramElements.update(pe._id,{$set: {active:false}})
    }
    
    id = $(e.currentTarget).parent().attr('id')
    pe = ProgramElements.findOne(id)
    Session.set('programElement', pe.ID)
    ProgramElements.update(id,{$set: {active: true}})
  }
})