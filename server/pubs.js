Meteor.publish({
  heats() {
    pi = ProgramItems.findOne({
      active: true
    })
    if (pi) {
      program_element = pi.program_element
      return ProgramItems.find({
        program_element
      })
    }
  },
  dataByPin(PIN) {
    j = Judges.findOne({
      PIN
    })
    if (j) {
      var pi = ProgramItems.findOne({
        active: true
      })
      program_element = pi.program_element

      return [
        Judges.find({
          _id: j._id
        }),
        ProgramElements.find({
          ID: program_element
        }),
        ProgramItems.find({
          program_element
        }),
        Results.find({
          program_element
        })
      ]
    } else {
      return []
    }
  },
  items(program_element) {
    return ProgramItems.find({
      program_element
    })

  },
  elements() {
    return ProgramElements.find()
  },
  judging(program_item) {
    const {
      program_element
    } = ProgramItems.findOne(program_item);
    return Results.find({
      program_element
    })
  },
  all(id) {
    pe = ProgramElements.findOne({
      active: true
    })
    return [
      Judges.find({}),
      ProgramElements.find({}),
      ProgramItems.find({}),
      // Results.find({}),
      JudgesFunctions.find({}),
      HeatsTable.find({})
    ]
  },
  athlethes() {
    return Athlethes.find()
  }
})