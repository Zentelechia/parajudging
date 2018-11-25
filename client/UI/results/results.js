var randomize = function (array) {
  return _.sortBy(array, e => {
    return Math.random()
  })
}
Template.results.onRendered(() => {
  Meteor.subscribe('all')
  pe = ProgramElements.findOne(Session.get('itemId'))
  if (pe) {
    Session.set('programElement', pe.ID)
  }
 
})

Template.results.helpers({
  heat() {
    return ProgramItems.findOne(Session.get('itemId'))
  },
  technic() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      return pi.Level
    }
  },
  generalLook() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      pe = ProgramElements.findOne({ID: pi.program_element})

      if (pe && pe.Description.indexOf("General") > -1) {
        return true
      }
    }
  },
  final() {

    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      pe = ProgramElements.findOne({
        ID: pi.program_element
      })
      if (pe) {
        return pe.Marks
      }
    }
  },
  items() {
    return true;
  }
})

Template.results.events({
  'change input'(e) {
    id = $(e.currentTarget).parent().attr('id')
    console.log(id)
    ProgramElements.update(id, {
      $set: {
        name: e.currentTarget.value
      }
    })
  },
  'click #addElement'() {
    ProgramElements.insert({
      name: 'new program element'
    })
  },

  'click .activateElement'(e) {
    pe = ProgramElements.findOne({
      active: true
    })
    if (pe) {
      ProgramElements.update(pe._id, {
        $set: {
          active: false
        }
      })
    }

    id = $(e.currentTarget).parent().attr('id')
    pe = ProgramElements.findOne(id)
    Session.set('programElement', pe.ID)
    ProgramElements.update(id, {
      $set: {
        active: true
      }
    })
  },
  'click .activateItem'(e) {
    pe = ProgramItems.findOne({
      active: true
    })
    if (pe) {
      ProgramItems.update(pe._id, {
        $set: {
          active: false
        }
      });

    }

    id = $(e.currentTarget).parent().attr('id')
    pi = ProgramItems.findOne(id)
    Session.set('programItem', pi._id)
    ProgramItems.update(id, {
      $set: {
        active: true,
        activated: true
      }
    });
    Session.get('activeProgramItem', pi);
  }
})