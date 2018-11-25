Template.final.events({
  'click .score'(e) {
    $('.score').removeClass('selectedScore')
    $(e.currentTarget).addClass('selectedScore')
    Session.set('numPads', null)
    if ($(e.currentTarget).hasClass('numpad')) {
      $("#skill").hide()
      $("#numPad").show()
    } else {
      $("#numPad").hide()
      $("#skill").show()

    }
  }
})
Template.final.onRendered(function () {
  $(".currentHeat").show()
  $(".all").show()
})
Template.skill.events({
  'click td'(e) {
    var $e = $(e.currentTarget)

    judge = Session.get("judge").letter
    type = $(".selectedScore").attr('type')
    Entry = +$(".selectedScore").parent().attr('id')
    value = +$e.text()
    Meteor.call("score", {
      judge,
      type,
      value,
      Entry
    })



    // $(".selectedScore").text($e.text())
    $e.addClass('button')
    setTimeout(() => {
      $e.removeClass('button')
    }, 300)
  }
})

Template.numPad.events({
  'click td'(e) {
    var $e = $(e.currentTarget)
    score = Session.get("numPads")
    if (!score) {
      Session.set("numPads", $e.text())
      setTimeout(() => {
        Session.set("numPads", null)
      }, 5000)

    } else {
      judge = Session.get("judge").letter
      type = $(".selectedScore").attr('type')
      value = +(score + "." + $e.text())
      Entry = +$(".selectedScore").parent().attr('id')

      Meteor.call("score", {
        judge,
        type,
        value,
        Entry
      })
      // $(".selectedScore").text(value)
      Session.set("numPads", null)

    }

    $e.addClass('button')
    setTimeout(() => {
      $e.removeClass('button')
    }, 300)
  }
})
Template.picker.onRendered(() => {
  Tracker.autorun(function () {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi && pi._id != Session.get("previousItem")) {
      Session.set("previousItem", pi._id)
      Session.set('toSelect', pi.On_next_round)
      Session.set("sended", false)
      Session.set("heatToDisplay", pi.heat || 1)
      Session.set("totalSelect", pi.On_next_round)
      Session.set("activeHeat", pi.heat)
    }
  })
})

Template.picker.helpers({
  sended() {
    return Session.get('sended')
  },
  GL() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      return pi.On_next_round > 0
    }
  },
  isFinal() {
    pi = ProgramElements.findOne({
      active: true
    })
    if (pi) {
      return pi.Marks
    }

  }
})
Template.final.helpers({
  technic() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      return pi.Level
    }
  },

  judge() {
    const judge = Session.get("judge")
    const functions = JudgesFunctions.findOne({
      letter: judge.letter
    })
    fullJudge = { ...judge,
      ...functions
    }
    Session.set("fullJudge", fullJudge)
    return fullJudge
  },
  participants() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      heat = Session.get("heatToDisplay") || pi.heat
      pii = ProgramItems.findOne({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level,
        heat
      })
      if (pii) {
        return pii.Entries
      }
    }
  }
})
Template.notFinal.onRendered(() => {
  $(".currentHeat").show()
  $(".all").show()
  $(".numPad").hide()
  $(".violation").show()


})
Template.notFinal.helpers({
  participants() {
    pe = ProgramElements.findOne({
      active: true
    })
    if (pe) {
      return pe.Participants.length
    }
  },
  toSelect() {
    pi = ProgramItems.findOne({
      active: true
    })
    judge = Session.get('judge')
    if (pi && judge) {
      judge = judge.letter
      selected = {}
      selected[judge] = 1
      alreadySelected = Results.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level,
        selected
      }).count()
      toSelect = pi.On_next_round - alreadySelected
      Session.set('toSelect', toSelect)
      if (!toSelect) {
        $('.send').show()
      } else {
        $('.send').hide()

      }
      return toSelect
    }
  },

  participants() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      heat = Session.get("heatToDisplay") || pi.heat
      return ProgramItems.findOne({
        heat,
        Dance: pi.Dance,
        Level: pi.Level,
        program_element: pi.program_element
      }).Entries;
    }
  }
})

UI.registerHelper('score', function (type, Entry) {
  judge = Session.get('judge').letter
  api = ProgramItems.findOne({
    active: true
  })
  Entry = +Entry
  if (api) {
    score = Results.findOne({
      program_element: api.program_element,
      Description: null,
      Entry,
      Dance: api.Dance,
      Level: api.Level
    })
    return (score && score.scores && score.scores[type] && score.scores[type][judge]) || "-.-"
  }
});
iterator = {
  "0": 1,
  "-1": 0,
  "1": -1,
  "undefined": 1
}


Template.notFinal.events({
  'click .selector'(e) {
    toSelect = Session.get("toSelect")
    if (toSelect > 0 || $(e.currentTarget).attr('state') !== "0") {
      const judge = Session.get("judge").letter
      const Entry = +e.currentTarget.id
      state = $(e.currentTarget).attr('state');
      value = state ? iterator[state] : 1
      console.log('state: ' + state)
      console.log('value: ' + value)
      Meteor.call('choose', {
        judge,
        Entry,
        value
      })
    }
  }
})

UI.registerHelper('selectedValue', function (Entry) {
  var {
    letter
  } = Session.get('judge')
  console.log(letter)
  console.log(arguments)
  pi = ProgramItems.findOne({
    active: true
  })
  Entry = +Entry
  result = Results.findOne({
    program_element: pi.program_element,
    Dance: pi.Dance,
    Level: pi.Level,
    Entry
  })
  console.log(result)
  return result && result.selected ? result.selected[letter] : ''

})

UI.registerHelper('class', (Entry) => {
  j = Session.get('judge')
  pi = ProgramItems.findOne({
    active: true
  })
  judge = j.letter
  Entry = +Entry
  console.log(judge, Entry)
  console.log(pi)
  result = Results.findOne({
    program_element: pi.program_element,
    Dance: pi.Dance,
    Level: pi.Level,
    Entry
  })
  console.log(result)

  if (result && result.selected && result.selected[judge]) {
    return result.selected[judge] == '+' ? 'slected' : 'maybe'
  } else {
    return ''
  }
})
Template.generalLook.onRendered(() => {
  $(".currentHeat").hide()
  $(".all").hide()
  $(".violation").hide()
})