
notFinal = [{
    heat: 1,
    participants: [

      {
        _id: "123",
        number: 23,
        maybe: true
      },
      {
        _id: "1123",
        number: 56,
        maybe: true
      },
      {
        _id: "11123",
        number: 11
      },
      {
        _id: "2123",
        number: 24,
        selected: true
      },
      {
        _id: "3123",
        number: 34
      },
      {
        _id: "4123",
        number: 99
      },
      {
        _id: "5123",
        number: 20
      },
      {
        _id: "6123",
        number: 40
      }
    ]
  },
  {
    heat: 2,
    participants: [

      {
        _id: "123",
        number: 223,
        maybe: true
      },
      {
        _id: "1123",
        number: 256,
        maybe: true
      },
      {
        _id: "11123",
        number: 211
      },
      {
        _id: "2123",
        number: 224,
        selected: true
      },
      {
        _id: "3123",
        number: 234
      },
      {
        _id: "4123",
        number: 299
      },
      {
        _id: "5123",
        number: 220
      },
      {
        _id: "6123",
        number: 240
      }
    ]
  },
  {
    heat: 3,
    participants: [

      {
        _id: "123",
        number: 323,
        maybe: true
      },
      {
        _id: "1123",
        number: 356,
        maybe: true
      },
      {
        _id: "11123",
        number: 11
      },
      {
        _id: "2123",
        number: 324,
        selected: true
      },
      {
        _id: "3123",
        number: 334
      },
      {
        _id: "4123",
        number: 399
      },
      {
        _id: "5123",
        number: 320
      },
      {
        _id: "6123",
        number: 340
      }
    ]
  }
]
final = [{
  heat: 1,
  participants: [

    {
      _id: "123",
      number: 23,
      maybe: true
    },
    {
      _id: "1123",
      number: 56,
      maybe: true
    },
    {
      _id: "11123",
      number: 11
    }
  ]
}]

Template.final.events({
  'click .score'(e) {
    $('.score').removeClass('selectedScore')
    $(e.currentTarget).addClass('selectedScore')

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
  $(".currentHeat").hide()
  $(".all").hide()
})
Template.skill.events({
  'click td'(e) {
    var $e = $(e.currentTarget)
    $(".selectedScore").text($e.text())
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
    } else {
      $(".selectedScore").text(score + "." + $e.text())
      Session.set("numPads", null)

    }

    $e.addClass('button')
    setTimeout(() => {
      $e.removeClass('button')
    }, 300)
  }
})
Template.picker.onRendered(() => {

  Tracker.autorun(function(){
    pi = ProgramItems.findOne({active: true})
    if (pi && pi._id!=Session.get("previousItem")){
      Session.set("previousItem",pi._id)
      Session.set('toSelect',pi.On_next_round)
      Session.set("sended",false)
      Session.set("heatToDisplay", pi.heat||1)
    }
  })

  
  pi = ProgramItems.findOne({
    active: true
  })
  if (pi) {

    Session.set("totalSelect", pi.On_next_round)
    Session.set("heatToDisplay", pi.heat)
    Session.set("activeHeat", pi.heat)
  }
})
Template.picker.helpers({
  toSelect(){
    return 
  },
  sended(){
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
  judge() {
    const judge = Session.get("judge")
    const functions = JudgesFunctions.findOne({
      letter: judge.letter
    })
    return { ...judge,
      ...functions
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
Template.notFinal.onRendered(() => {
  $(".currentHeat").show()
  $(".all").show()
  $(".numPad").hide()
  $(".violation").show()


})
Template.notFinal.helpers({
  toSelect() {
    ts = Session.get('toSelect')
    if (ts === 0) {
      $(".send").show()
    } else {
      $(".send").hide()

    }

    return Session.get('toSelect')
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

UI.registerHelper('score', function (scoreType, participant) {

  return scoreType == 'skill' ? "1.0" : "5.0"
});
Template.notFinal.events({
  'click .selector'(e) {
    toSelect = Session.get("toSelect")
    if (toSelect > 0 || $(e.currentTarget).hasClass('selected_true')) {


      const judge = Session.get("judge").letter
      const number = e.currentTarget.id
      Meteor.call("choose", {
        judge,
        number
      }, function (e, r) {
        if (!e) {
          Session.set("toSelect", r)

        } else {
          console.log(e)
        }
      })
    }
  }

})

UI.registerHelper('class', (number) => {
  j = Session.get('judge')
  pi = ProgramItems.findOne({
    active: true
  })
  judge = j.letter + "" + number
  if (ProgramItems.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      level: pi.level,
      maybe: judge
    })) {
    return 'maybe_true'
  }
  if (ProgramItems.findOne({
      program_element: pi.program_element,
      Dance: pi.Dance,
      level: pi.level,
      selected: judge
    })) {
    return 'selected_true'
  }
})
Template.generalLook.onRendered(() => {
  $(".currentHeat").hide()
  $(".all").hide()
  $(".violation").hide()
})