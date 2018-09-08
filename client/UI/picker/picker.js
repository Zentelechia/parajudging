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
    pi = ProgramItems.findOne({
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
  participants(){
    pe = ProgramElements.findOne({active:true})
    if (pe){
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
      selected = Results.find({
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level,
        value: 'selected',
        judge
      }).count()
      toSelect = pi.On_next_round - selected
      Session.set('toSelect', toSelect)
      if (!toSelect) {
        $('.send').show()
      }
      else {
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
        program_element: pi.program_element,
        Dance: pi.Dance,
        Level: pi.Level,
        heat
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
  // console.log(arguments)
  score = Results.findOne({
    type,
    judge,
    Entry,
    program_element: api.program_element,
    Dance: api.Dance,
    Level: api.Level
  })
  return (score && score.value) || "-.-"


  // scoreType == 'skill' ? "1.0" : "5.0"
});
Template.notFinal.events({
  'click .selector'(e) {
    toSelect = Session.get("toSelect")
    if (toSelect > 0 || $(e.currentTarget).hasClass('selected')) {


      const judge = Session.get("judge").letter
      const Entry = +e.currentTarget.id
      value = 'selected'
      if ($(e.currentTarget).hasClass('selected')) {
        value = 'maybe'
      }
      if ($(e.currentTarget).hasClass('maybe')) {
        value = ''
      }
      Meteor.call('choose', {
        judge,
        Entry,
        value
      })
    }
  }

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
    judge,
    Entry
  })
  console.log(result)

  if (result) {
    return result.value
  }
})
Template.generalLook.onRendered(() => {
  $(".currentHeat").hide()
  $(".all").hide()
  $(".violation").hide()
})