Template.programElement.onCreated(function () {
  // $('.sortable').sortable({
  //   connectWith: '.sortable',
  //   placeholder: 'ui-state-highlight',
  //   receive: function (event, ui) {
  //     var sourceList = ui.sender;
  //     var targetList = $(this);
  //   },
  //   stop: function (event, ui) {
  //     $('.sortable a').each((i, e) => {
  //       ProgramElements.update($(e).attr('id'), {
  //         $set: {
  //           order: $(e).index() + 1
  //         }
  //       })
  //     })
  //   }
  // }).disableSelection()
})
Template.elements.helpers({
  programElements() {
    q = {}
    let filter = Session.get('filter')
    if (filter) {
      q = {
        $or: [{
            Event: {
              $regex: filter,
              $options: 'i'
            }
          },
          {
            Program: {
              $regex: filter,
              $options: 'i'
            }
          }
        ]
      }
    }
    return ProgramElements.find(q, {
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
    var opts = {
      sort: {
        Dance_order: 1,
        Level: -1,
        heat: 1
      }
    }
    const itemId = Session.get('itemId')
    const programId = Session.get('programId')
    if (itemId) {
      pi = ProgramItems.findOne(itemId)
      if (pi) {
        var {
          program_element
        } = pi
      }
    } else {
      program_element = programId
    }
    return ProgramItems.find({
      program_element
    }, opts).fetch()

  }
})
Template.heats.helpers({
  items() {
    var opts = {
      sort: {
        Dance_order: 1,
        Level: -1,
        heat: 1
      }
    }
    return ProgramItems.find({}, opts).fetch()

  }
})
Template.programElement.events({
  'click .activate'(e, t) {
    var id = t.data.data._id;
    Meteor.call('activateElement', t.data.data._id, (e, r) => {
      if (!e) {
        const {
          ID
        } = ProgramElements.findOne(id)
        Router.go(`/program/${ID}`)
      }
    });
  }
})
Template.programItem.events({
  'click .activate'(e, t) {
    var id = t.data.data._id;
    Meteor.call('activateItem', t.data.data._id, (e, r) => {
      if (!e) {
        Router.go(`/item/${id}`)
      }
    });
  }
})

Template.programItem.events({
  'click .change'(e, t) {
    const entry = $(e.currentTarget).parent().attr('entry');
    Session.set('entry', entry)
    $("#itemChangeNumber").modal('show')
  },
  'click .remove'(e, t) {
    const entry = $(e.currentTarget).parent().attr('entry');
    Session.set('entry', entry)
    $("#itemRemoveNumber").modal('show')
  }
})

Template.heats.onCreated(function () {
  setInterval(function () {
    e = document.getElementById("activetrue")
    if (e) {
      e.scrollIntoView()
    }
  }, 5000)
})

UI.registerHelper('Ath',(Number)=>{
  Number=+Number
  A = Athlethes.findOne({Number});
  if (A) {
    return A.Athlete_1Local_name + " и " +A.Athlete_2Local_name
  }
})