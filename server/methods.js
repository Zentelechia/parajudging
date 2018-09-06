Meteor.methods({
  choose({
    judge,
    Entry
  }) {
    api = ProgramItems.findOne({
      active: true
    })

    Results.insert({
      Entry,
      judge,
      vote: 1,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level,
    })


    pi = ProgramItems.findOne({
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level,
      Entries: Entry
    })
    judging = judge + "" + Entry

    if (_.contains(pi.maybe, judging)) {
      ProgramItems.update(pi._id, {
        $pull: {
          maybe: judging
        }
      })
    } else if (_.contains(pi.selected, judging)) {
      ProgramItems.update(pi._id, {
        $push: {
          maybe: judging
        },
        $pull: {
          selected: judging
        }
      })
    } else {
      ProgramItems.update(pi._id, {
        $push: {
          selected: judging
        }
      })
    }
    ppi = ProgramItems.find({
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level,
    }).fetch()
    selected = 0
    toSelect = 0
    _.each(ppi, pi => {
      toSelect = pi.On_next_round
      _.each(pi.selected, s => {
        if (s && s.indexOf(judge) == 0) {
          selected++
        }
      })
    })

     return toSelect - selected
  },
 score({judge, Entry, value,  type}){
    console.log(arguments)
    api = ProgramItems.findOne({
      active: true
    })
    Results.remove({
      type,
      judge,
      Entry,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    })
    id = Results.insert({
      type, 
      judge,
      value,
      Entry,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level,
    })
    console.log(id)
 },
  vote() {
    judges = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    api = ProgramItems.findOne({
      active: true
    })
    pi = ProgramItems.find({
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    }).fetch()
    ProgramItems.update({
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    }, {
      $unset: {
        selected: null,
        maybe: null
      }
    }, {
      multi: true
    })
    Results.remove({
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    })
    toSelect = api.On_next_round
    entries = _.flatten(_.map(pi, p => {
      return p.Entries
    }))
    console.log(toSelect)
    console.log(entries)
    _.each(judges, judge => {
      var ent = _.clone(entries)
      // console.log(ent)
      for (var i = 0; i < toSelect; i++) {
        index = ~~(Math.random() * (ent.length))
        Entry = ent.splice(index, 1)[0]

        Meteor.call("choose", {
          judge,
          Entry
        })
      }

    })
  }
})