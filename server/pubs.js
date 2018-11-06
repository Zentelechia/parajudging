Meteor.publish({
  dataByPin(PIN) {
    j = Judges.findOne({
      PIN
    })
    if (j) {
      return [
        Judges.find({
          _id: j._id
        }),
        ProgramElements.find({}),
        ProgramItems.find({}),
        Results.find({
          judge: j.letter
        }),
        JudgesFunctions.find()
      ]
    } else {
      // this.stop()
    }
  },
  elements() {
    return ProgramElements.find();

  },
  items(program_element) {
    return ProgramItems.find({
      program_element
    })

  },
  judging(program_item) {
    const {
      program_element
    } = ProgramItems.findOne(program_item);
    return [
      ProgramItems.find({
        program_element
      }),
      Results.find({
        program_element
      })
    ]
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