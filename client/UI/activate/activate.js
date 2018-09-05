Template.activate.onRendered(()=>{
  pe = ProgramElements.findOne({active: true})
  if (pe){
    Session.set("programElement",pe.ID)
  }
  $( ".sortable" ).sortable({
    placeholder: "ui-state-highlight",
    stop: function( event, ui ) {
      $(".sortable li").each((i,e)=>{
        ProgramElements.update($(e).attr('id'),{$set: {order: $(e).index()+1}})
      })
    }
  });
  $( ".sortable" ).disableSelection();
})
Template.activate.helpers({

  elements(){
    return ProgramElements.find({},{sort: {order: 1, Event: 1, Program: 1, Gender: 1, Class: 1, Description: -1}}).fetch()
  },
  items(){
    program_element=Session.get("programElement")
    if (program_element){
      Session.set("items",true)
      return ProgramItems.find({ program_element },{sort: {Dance_order: 1, Level: -1,  heat: 1}}).fetch()
    }
    else {
      Session.set("items",false)
    }



  }
})

UI.registerHelper('winner', function(_id, number) {
  pi = ProgramItems.findOne(_id)
  if (ProgramItems.findOne({program_element: pi.program_element, Dance: pi.Dance, Level: pi.Level, winners: number})) {
    return 'winner'
  }
});
Template.activate.events({
  'change input'(e){
    id = $(e.currentTarget).parent().attr('id')
    console.log(id)
    ProgramElements.update( id, {$set: {name: e.currentTarget.value}})
  },
  'click #addElement'(){
    ProgramElements.insert({name: 'new program element'})
  },
  'sortchange #sortable'(){
    console.log('changed')
  },
  'click .activateElement'(e){
    pe = ProgramElements.findOne({active: true})
    if (pe){
      ProgramElements.update(pe._id,{$set: {active:false}})
    }
    
    id = $(e.currentTarget).parent().attr('id')
    pe = ProgramElements.findOne(id)
    Session.set('programElement', pe.ID)
    ProgramElements.update(id,{$set: {active: true}})
  },
  'click .activateItem'(e){
    pe = ProgramItems.findOne({active: true})
    if (pe){
      ProgramItems.update(pe._id,{$set: {active:false}})
    }
    
    id = $(e.currentTarget).parent().attr('id')
    pi = ProgramItems.findOne(id)
    Session.set('programItem', pi._id)
    ProgramItems.update(id,{$set: {active: true,  activated: true}})
    console.log(pi)
  }
})

Template.judging.helpers({
  items(){
    return Session.get("items")
  },
  entries(){
    pi = ProgramItems.findOne({active: true})
    if (pi){
      pp = ProgramItems.find({program_element: pi.program_element, Dance: pi.Dance, level: pi.level}).fetch()
      flat = _.flatten(_.map(pp,p=>{return p.Entries}))
      return _.sortBy(flat,f=>{return +f})

    }
  }
})

UI.registerHelper('voice',(number, judge)=>{
  pi = ProgramItems.findOne({active: true})
    if (pi){
      pp = ProgramItems.findOne({program_element: pi.program_element, Dance: pi.Dance, level: pi.level, selected: judge+""+number})
      return pp?"+":""
    } 
})
UI.registerHelper('total',()=>{})