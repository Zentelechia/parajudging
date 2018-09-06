Meteor.publish({
  dataByPin(PIN){
    j= Judges.findOne({ PIN })
    if (j){
      pi = ProgramItems.findOne({
        active: true
      })
      return [
        Judges.find({_id: j._id}),
        ProgramElements.find({ ID: pi.program_element }),
        ProgramItems.find({ program_element: pi.program_element}),
        Results.find({ program_element: pi.program_element, judge: j.letter }),
        JudgesFunctions.find()
      ]
    }
    else {
      this.stop()
    }
  },
  all(){
     pe = ProgramElements.findOne({
      active: true
    })
        return [
          Judges.find({}),
          ProgramElements.find({}),
          ProgramItems.find({}),
          Results.find({}),
          JudgesFunctions.find({}),
          HeatsTable.find({})
        ]
  }
})