Template.judgingFinal.helpers({
  entries() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      pp = ProgramItems.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level
      }).fetch()
      flat = _.flatten(_.map(pp, p => {
        return p.Entries
      }))
      return _.sortBy(flat, f => {
        return +f
      })

    }
  }
})
Template.judgingFinal.events({
  'change input'(e){
      value =$(e.currentTarget).val()
      Entry=$(e.currentTarget).parent().attr('id')
      Meteor.call('penalty', {Entry, value})
  }
})
UI.registerHelper('finalScore', function (judge, type, Entry) {
  pi = ProgramItems.findOne({
    active: true
  })
  if (pi) {
    Entry = +Entry
    r = Results.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      type,
      judge,
      Entry
    })
    if (r) {
      return r.value
    }
  }

})

UI.registerHelper('penalty', function (Entry) {
  pi = ProgramItems.findOne({
    active: true
  })
  if (pi) {
    Entry = +Entry
    r = Results.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      type: 'penalty',
      Entry
    })
    if (r) {
      return r.value
    }
  }

})
UI.registerHelper('finalScoreRes', function (type, Entry) {
  pi = ProgramItems.findOne({
    active: true
  })
  if (pi) {
    Entry = +Entry
    rr = Results.find({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      type,
      Entry
    }).fetch()
    if (rr.length>3) {

      results = _.map(rr, r => {
        return r.value
      })
      results = _.sortBy(results,r=>{return r})
      results = results.slice(1,results.length-1)
      sum = 0
      _.each(results, r => {
        sum += r
      })
      sum = sum / results.length
      return sum.toFixed(3)
    }
  }

})

UI.registerHelper('finalScorePen', function (argument) {

});
UI.registerHelper('finalScoreTot', function (argument) {

});