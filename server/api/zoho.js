String.prototype.replaceAll = function (search, replace) {
  return this.split(search).join(replace);
}
randomize = function (array) {
  return _.sortBy(array, e => {
    return Math.random()
  })
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
      pi.heat = +pi.heat || 1
      ProgramItems.insert(pi)
    })

    _.each(Program, pe => {
      // // pe.Entries = pe.Entries? pe.Entries.split(',') : []
      // pe.Entries = _.map(pe.Entries, e => {
      //   return +e
      // })

      Entries = pe.Entries;
      _.each(ProgramItems.find({
        program_element: pe.ID
      }, {
        sort: {
          Dance_order: 1,
          heat: 1
        }
      }).fetch(), pi => {
        if (pi.heat == 1) {
          ee = randomize(Entries)
        }

        ProgramItems.update(pi._id, {
          $set: {
            Entries: _.sortBy(ee.splice(0, pi.Entries.length), e => {
              return e
            })
          }
        })
      })

      ProgramElements.insert(pe)
    })


    _.each(judges, j => {
      Judges.insert(j)
    })


  }
})