Meteor.publish({
  dataByPin(PIN){
    j= Judges.findOne({ PIN })
    if (j){
      // pi = ProgramItems.find({
      //   active: true
      // }).fetch()
      // pi = ProgramItems.find({
      //   active: true
      // }).fetch()
      
    //  / // console.log(pi)
      // console.log(pi.program_element)
      return [
        Judges.find({_id: j._id}),
        ProgramElements.find({}),
        ProgramItems.find({}),
        Results.find({ judge: j.letter }),
        JudgesFunctions.find()
      ]
    }
    else {
      // this.stop()
    }
  },
  all(id){
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
  athlethes(){
    return Athlethes.find()
  }
})