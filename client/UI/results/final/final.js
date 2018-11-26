Template.judgingFinal.helpers({
  entries() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      var entries = pi.Entries;
      return Results.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level
      }).fetch();

    }
    return []
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
    penalty = $(e.currentTarget).val()
    Entry = $(e.currentTarget).parent().attr('id')
    Meteor.call('penalty', {
      Entry,
      penalty
    })
  }
})
Template.finalScores.helpers({
  dances() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      return _.unique(_.map(ProgramItems.find({
        program_element: pi.program_element,
        byDance: false
      }, {
        sort: {
          Dance_order: 1
        }
      }).fetch(), pi => {
        return pi.Dance
      }))
    }
  },
  entries() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      var entries = pi.Entries;
      return Results.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level,
        byDance: false
      }, {
        sort: {
          TOTAL: 1,
          Entry: -1
        }
      }).fetch();

    }
    return []
  }

})
UI.registerHelper('finalScore', function (judge, type, Entry) {
  pi = ProgramItems.findOne(Session.get('itemId'))
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


UI.registerHelper('finalScoreRes', function (type, Entry) {
  pi = ProgramItems.findOne(Session.get('itemId'))
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

Template.judgingFinalTechnic.helpers({
  entries() {
    pi = ProgramItems.findOne(Session.get('itemId'))
    if (pi) {
      var entries = pi.Entries;
      return Results.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level,
        byDance: false
      }).fetch();

    }
    return []
  }
})