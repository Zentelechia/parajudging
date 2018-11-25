Template.judging.helpers({
  entries() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      return Results.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level
      }, {
        sort: {
          total: -1,
          Entry: 1
        }
      }).fetch()
    } else {
      return []
    }
  }
})

Template.notFinalResults.events({
  'click .notFinalResultsRow'({
    currentTarget
  }) {
    next = $(currentTarget).index() + 1
    entries = Session.get("itemResults")
    if (entries.length) {
      pass = _.map(entries.slice(0, next), e => {
        return e.Entry
      })
      redance = _.map(entries.slice(next - entries.length), e => {
        return e.Entry
      })
      pi = ProgramElements.findOne({
        active: true
      })

      ProgramElements.update(pi._id, {
        $set: {
          On_next_round: next
        }
      })
      pp = ProgramElements.find({
        Event: pi.Event,
        Program: pi.Program,
        Gender: pi.Gender,
        Class: pi.Class,
        order: {
          $gt: pi.order
        }
      }, {
        sort: {
          order: 1
        }
      }).fetch()
      var next_round_changed
      var on_next_round
      console.log("There are %s rounds after", pp.length)
      if (pp.length == 2) {
        next_round_changed = (pp[0].On_next_round == redance.length)
        on_next_round = pass
        ProgramElements.update(pp[0]._id, {
          $set: {
            Entries: redance,
            Participants: redance.length, //Problem wheb we have 2nd round
            On_next_round: pp[1].On_next_round - pass.length
          }
        })

        p = _.clone(pp[0])
        replan = ProgramItems.find({
          program_element: pp[0].ID
        }, {
          sort: {
            Dance_order: 1
          }
        }).fetch()
        console.log(replan)
        _.each(replan, r => {
          ProgramItems.remove(r._id)
        })
        dances = _.unique(_.map(replan, r => {
          return r.Dance
        }))
        console.log(dances)
        k = 0;
        _.each(dances, d => {
          k++
          heats = HeatsTable.findOne({
            number: pp[0].Participants + ""
          })
          heatsList = heats.formula6.split(",")
          heat = 1;
          participants = randomize(redance)
          for (var i = 0; i < heatsList.length; i++) {
            console.log(1)
            ProgramItems.insert({
              program_element: p.ID,
              Event: p.Event,
              Program: p.Program,
              Description: p.Description,
              Entries: participants.splice(0, heatsList[i]),
              Dance: d,
              Class: p.Class,
              heat,
              Dance_order: k,
              Level: p.Level,
              On_next_round: p.On_next_round
            })
            heat++
          }

        })







        ProgramElements.update(pp[1]._id, {
          $set: {
            Entries: pass
          }
        })

      }
      if (pp.length == 1) {
        ProgramElements.update(pp[0]._id, {
          $push: {
            Entries: pass
          }
        })
      }
    }
  }
})
Template.notFinalResults.helpers({
  onNextRound() {
    if (Session.get('programElement')) {
      pi = ProgramElements.findOne({
        active: true
      })
      return pi.On_next_round
    }
  },
  dances() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      return _.unique(ProgramItems.find({
        program_element: pi.program_element
      }).map((r) => {
        return r.Dance
      }))
    }
  },

  entries() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      return pi.Entries;
    }
    if (pi) {
      results = []
      dances = _.unique(ProgramItems.find({
        program_element: pi.program_element
      }).map((r) => {
        return r.Dance
      }))

      _.each(pe.Entries, Entry => {
        Entry = +Entry
        entry = {
          Entry
        }
        _.each(dances, Dance => {
          entry[Dance] = Results.find({
            program_element: pi.program_element,
            Entry,
            Dance,
            value: 'selected'
          }).count()
        })
        entry.total = Results.find({
          program_element: pi.program_element,
          Entry,
          value: 'selected'
        }).count()
        results.push(entry)
      })
      results = _.sortBy(results, r => {
        return -r.total
      })
      for (var i = 0; i < results.length; i++) {
        results[i].i = i + 1
      }
      Session.set("itemResults", results)
      return results
    }
  }
})
UI.registerHelper('inDance', (results, dance) => {
  return results[dance]

})
UI.registerHelper('voice', (Entry, judge) => {
  pi = Session.get('activeProgramItem');

  if (pi) {
    Entry = +Entry
    pp = Results.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      value: 'selected',
      Description: pi.Description,
      judge,
      Entry,
      value: 'selected'
    })
    return pp ? '+' : ''
  }
})
UI.registerHelper('total', (Entry) => {

  pi = Session.get('activeProgramItem');
  if (pi) {
    Entry = +Entry
    return Results.find({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      value: 'selected',
      Entry

    }).count()
  }

})
UI.registerHelper('firstLetter', (str) => {
  return str[0]
})