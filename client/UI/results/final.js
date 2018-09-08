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
  'click #total'() {
    $('.total').each(function (i, e) {
      TSR = +$(e).siblings('.TSR').text()
      CPR = +$(e).siblings('.CPR').text()
      DLR = +$(e).siblings('.DLR').text()
      $(e).text(((TSR + CPR) * DLR).toFixed(3))
    })
  },
  'change input'(e) {
    value = $(e.currentTarget).val()
    Entry = $(e.currentTarget).parent().attr('id')
    Meteor.call('penalty', {
      Entry,
      value
    })
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
    if (rr.length > 3) {

      results = _.map(rr, r => {
        return r.value
      })
      results = _.sortBy(results, r => {
        return r
      })
      results = results.slice(1, results.length - 1)
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
UI.registerHelper('finalScoreTot', function (Entry) {
  pi = ProgramItems.findOne({
    active: true
  })
  if (pi) {
    Entry = +Entry
    rr = Results.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      Level: pi.Level,
      type: 'total',
      Entry
    })
    if (rr && rr.value) {
      return rr.value
    } else {
      $e = $('#final' + Entry)
      TSR = +($e.find('.TSR').text())
      CPR = +($e.find('.CPR').text())
      DLR = +($e.find('.DLR').text())
      value = ((TSR + CPR) * DLR).toFixed(3)
      Meteor.call('score', {
        Entry,
        value,
        type: 'total'
      })
      return value
    }
  }
});

Template.judgingFinalTechnic.helpers({

'click #total'() {
  $('.total').each(function (i, e) {
    TSR = +$(e).siblings('.TSR').text()
    CPR = +$(e).siblings('.CPR').text()
    DLR = +$(e).siblings('.DLR').text()
    $(e).text(((TSR + CPR) * DLR).toFixed(3))
  })
}
})
Template.judgingFinalTechnic.helpers({
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
  },
  difficulty(){
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      if (pi.Level=='Normal'){
        return 1.15
      }
      else {
        return 1.35
      }
    }


  }
})