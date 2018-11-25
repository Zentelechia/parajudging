Template.modals.helpers({
  entry() {
    return Session.get('entry')
  }
})
Template.modals.events({
  'click #changeEntryNumberButton'() {
    const newEntry = newEntryNumber.value;
    const entry = Session.get('entry')
    ii = ProgramItems.find({
      program_element: Session.get('programId')
    }).fetch()
    _.each(ii, i => {
      Entries = i.Entries;
      if (_.contains(Entries, entry)) {
        Entries = _.union(Entries, newEntry);
      }
      Entries = _.without(Entries, entry);

      ProgramItems.update(i._id, {
        $set: {
          Entries
        }
      })
    });
    $("#changeEntryNumber").modal('hide');
    return false;
  }
})