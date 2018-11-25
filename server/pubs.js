Meteor.publish({
  dataByPin(PIN) {
    j = Judges.findOne({
      PIN
    })
    if (j) {
      var {
        program_element
      } = ProgramItems.findOne({
        active: true
      })
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
          program_element,
          byDance: false
        }),
        JudgesFunctions.find()
      ]
    } else {
      return
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