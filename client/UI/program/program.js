Template.elements.helpers({
  programElements() {
    return ProgramElements.find({}, {
      sort: {
        order: 1,
        Event: 1,
        Program: 1,
        Gender: 1,
        Class: 1,
        Description: -1
      }
    }).fetch()
  }
})
Template.items.helpers({
  items() {
    return ProgramItems.find({}, {
      sort: {
        Dance_order: 1,
        Level: -1,
        heat: 1
      }
    }).fetch()
  }
})
Template.programElement.events({
  'click .activate'(e,t){
    var id=t.data.data._id;
    console.log(t);
    Meteor.call('activateElement',t.data.data._id,(e,r)=>{
      if (!e){
        const { ID } = ProgramElements.findOne(id)
        Router.go(`/program/${ID}`)
      }
    });
  }
})
Template.programItem.events({
  'click .activate'(e,t){
    var id=t.data.data._id;
    console.log(t);
    Meteor.call('activateItem',t.data.data._id,(e,r)=>{
      if (!e){
        Router.go(`/item/${id}`)
      }
    });
  }
})