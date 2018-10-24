Template.judges.helpers({
  judges(){
    return Judges.find().fetch()
  }
})

Template.athlethes.helpers({
  athlethes(){
    return Athlethes.find().fetch()
  }
})