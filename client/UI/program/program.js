Template.programElementsList.helpers({
  programElements() {
    return ProgramElements.find({}, {
      sort: {
        order: 1,
        Event: 1,
        Program: 1,
        Gender: 1,
        Class: 1,
        Description: -1
      }
    }).fetch()
  }
})
Template.programItemsList.helpers({
  items() {
    program_element = Session.get('programId')
    if (program_element) {
      return ProgramItems.find({
        program_element
      }, {
        sort: {
          Dance_order: 1,
          Level: -1,
          heat: 1
        }
      }).fetch()
    }
  }
})