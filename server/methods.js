Meteor.methods({
  choose({
    judge,
    number
  }) {
    api = ProgramItems.findOne({
      active: true
    })
    pi = ProgramItems.findOne({
      program_element: api.program_element,
      Dance: api.Dance,
      level: api.level,
      Entries: number
    })
    judging = judge + "" + number

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
      level: api.level,
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



    pp = ProgramItems.find({
      program_element: api.program_element,
      Dance: api.Dance,
      level: api.level
    }).fetch()

    ProgramItems.update({
      program_element: api.program_element,
      Dance: api.Dance,
      level: api.level
    }, {
      $unset: {
        winners: null
      }
    }, {
      multi: true
    })

    winners = {}
    _.each(pp, p => {
      _.each(p.selected, s => {
        if (!winners[s.slice(1)]) {
          winners[s.slice(1)] = 0
        }
        winners[s.slice(1)]++
      })
    })
    ww = []
    _.each(_.keys(winners), k => {
      ww.push({
        number: k,
        score: winners[k]
      })
    })
    ww = _.sortBy(ww, w => {
      return -w.score
    })
    ww = ww.slice(0, toSelect)
    ww = _.map(ww, w => {
      return w.number
    })
    ProgramItems.update({
      program_element: api.program_element,
      Dance: api.Dance,
      level: api.level
    }, {
      $set: {
        winners: ww
      }
    })
    console.log(ww)
    return toSelect - selected
  }
})