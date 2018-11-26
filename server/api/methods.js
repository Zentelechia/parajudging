Meteor.methods({
  'activateElement'(id) {
    ProgramElements.update({
      active: true
    }, {
      $set: {
        active: false
      }
    })
    ProgramElements.update(id, {
      $set: {
        active: true
      }
    });
    pe = ProgramElements.findOne(id);
    ProgramItems.update({
      active: true
    }, {
      $set: {
        active: false
      }
    });


    var opts = {
      sort: {
        Dance_order: 1,
        Level: -1,
        heat: 1
      }
    }
    pi = ProgramItems.findOne({
      program_element: pe.ID
    }, opts)
    ProgramItems.update(pi._id, {
      $set: {
        active: true
      }
    })

  },
  activateItem(id) {

    pi = ProgramItems.findOne(id);
    ProgramItems.update({
      active: true
    }, {
      $set: {
        active: false
      }
    })
    ProgramItems.update(id, {
      $set: {
        active: true
      }
    })

    ProgramElements.update({
      active: true
    }, {
      $set: {
        active: false
      }
    })
    ProgramElements.update({
      ID: pi.program_element
    }, {
      $set: {
        active: true
      }
    })
  },
  choose({
    judge,
    Entry,
    value
  }) {
    console.log(arguments)
    api = ProgramItems.findOne({
      active: true
    })
    results = Results.findOne({
      Entry,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    })
    value = value ? value : 0
    selected = results && results.selected ? results.selected : {}
    selected[judge] = value
    total = 0;
    _.each(_.keys(selected), k => {
      selected[k] == 1 ? total++ : 0
    })
    Results.upsert({
      Entry,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    }, {
      $set: {
        selected,
        total
      }
    });
    result = Results.findOne({
      Entry,
      program_element: api.program_element,
      total: true,
      Level: api.Level
    });

    dances = result && result.dances ? result.dances : {}
    danceFirstLetter = api.Dance[0]
    dances[danceFirstLetter] = dances[danceFirstLetter] ? dances[danceFirstLetter] + 1 : 1
    Results.upsert({
      Entry,
      program_element: api.program_element,
      total: true,
      Level: api.Level
    }, {
      $set: {
        dances
      }
    });
  },
  clearScores() {
    Results.remove({})
  },
  score({
    judge,
    Entry,
    value,
    type
  }) {
    console.log(arguments)
    api = ProgramItems.findOne({
      active: true
    })
    score = Results.findOne({
      Entry,
      byDance: false,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    })


    scores = score && score.scores ? score.scores : {}
    scores[type] = scores[type] || {}
    scores[type][judge] = value
    scores.RES = scores.RES || {}
    if (api.level) {
      scores.RES.DL = api.Level == 'Normal' ? 1.15 : 1.35
    }
    if (_.keys(scores[type]).length > 3) {
      results = _.map(_.keys(scores[type]), k => {
        return scores[type][k]
      })
      results = _.sortBy(results, r => {
        return r
      })
      results = results.slice(1, results.length - 1)
      sum = 0
      _.each(results, r => {
        sum += r
      })
      RES = (sum / results.length).toFixed(3)
      scores.RES[type] = +RES;
    }
    if (_.keys(scores.RES).length == 3) {
      scores.TOTAL = (((+scores.RES.CP) + (+scores.RES.TS)) * (+scores.RES.DL) - (+(scores.penalty || 0))).toFixed(3)
    }

    console.log(scores)
    id = Results.upsert({
      Entry,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level,
      byDance: false
    }, {
      $set: {
        scores
      }
    });

    if (scores.TOTAL) {
      scoresByDance = {}
      scoresByDance[api.Dance] = scores.TOTAL

      id = Results.upsert({
        Entry,
        program_element: api.program_element,
        Level: api.Level,
        byDance: true
      }, {
        $set: scoresByDance
      });
    }
  },

  penalty({
    Entry,
    penalty
  }) {
    api = ProgramItems.findOne({
      active: true
    })
    Entry = +Entry
    score = Results.findOne({
      Entry,
      byDance: false,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level
    })
    TOTAL = null;
    if (score && score.scores && _.keys(score.scores.RES).length == 3) {
      TOTAL = (((+score.scores.RES.CP) + (+score.scores.RES.TS)) * (+score.scores.RES.DL) - (+(score.penalty || 0))).toFixed(3)
    }

    id = Results.upsert({
      Entry,
      program_element: api.program_element,
      Dance: api.Dance,
      Level: api.Level,
      byDance: false
    }, {
      $set: {
        penalty,
        TOTAL
      }
    });
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
        Entry = +ent.splice(index, 1)[0]

        Meteor.call("choose", {
          judge,
          Entry,
          value: 'selected'
        })
      }

    })
  },
  clearEmptyTotals() {
    Results.remove({
      value: '0.000'
    })
  },
  allResults() {
    ee = ProgramElements.find().fetch()
    names = {}
    _.each(ee, e => {
      names[e.ID] = `${e.Event} ${e.Program} ${e.Gender} ${e.Class}`
    })
    rr = Results.find({}, {
      fields: {
        _id: 0,
        Championship: 0,
        Dance_order: 0,
        Entries: 0,
        Marks: 0,
        Stage: 0,
        active: 0,
        order: 0
      }
    }).fetch()
    for (var i = 0; i < rr.length; i++) {
      rr[i].name = names[rr[i].program_element]
      delete rr[i].program_element
    }
    return rr
  }
})