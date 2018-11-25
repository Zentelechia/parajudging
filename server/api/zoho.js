String.prototype.replaceAll = function (search, replace) {
  return this.split(search).join(replace);
}

Meteor.methods({
  fetch() {
    const programItemsURL = "https://creator.zoho.com/api/json/paradance/view/ProgramsItems?authtoken=9860e67f8a5563c47f9da9b7f4f4678b&scope=creatorapi&raw=true"
    const programElementsURL = "https://creator.zoho.com/api/json/paradance/view/Program?authtoken=9860e67f8a5563c47f9da9b7f4f4678b&scope=creatorapi&raw=true"
    const entriesURL = "https://creator.zoho.com/api/json/paradance/view/All_entries_local?authtoken=9860e67f8a5563c47f9da9b7f4f4678b&scope=creatorapi&raw=true"


    ProgramItems.remove({});

    ProgramElements.remove({});
    Results.remove({});
    Athlethes.remove({});
    Judges.remove({});

    // var {
    //   data
    // } = HTTP.get(entriesURL);

    data = Entries;
    _.each(Entries, a => {
      Athlethes.insert(a)
    })

    _.each(programs_items, pi => {
      ProgramItems.insert(pi)
    })

      _.each(Program, pe => {
      ProgramElements.insert(pe)
    })
    

    _.each(judges, j => {
      Judges.insert(j)
    })


  }
})