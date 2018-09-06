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
UI.registerHelper('finalScore', function(judge, Entry) {
  pi = ProgramItems.findOne({
    active: true
  })
  if (pi) {
    Entry = +Entry
    r=Results.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      judge,
      Entry
    })
    if (r){
      return r.value
    }
  }
  
})

UI.registerHelper('finalScoreRes', function(argument) {
  
})

UI.registerHelper('finalScorePen', function(argument) {
  
});
UI.registerHelper('finalScoreTot', function(argument) {
  
});