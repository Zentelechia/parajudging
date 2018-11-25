String.prototype.replaceAll = function (search, replace) {
  return this.split(search).join(replace);
}

Meteor.methods({
  fetch() {
    const zohoApp = 'https://creator.zohopublic.com/venture/paradance/json/'
    const programItemsURL = `${zohoApp}ProgramsItems/gSRsVvBbXU4UE9kRErP0aMwNvVSF0zm7JM4rvXSPD9hVuDaw3GJsfQRU5xDPjvS0qEGnekVaqv4pqaE8MWVW4eUYyHBWyKH30kmg`
    // const championshipURL=`${zohoApp}All_Championships/KXrGmGGtvx0pdDJTnWKYbuX5jE2xe3DObz1p9OmnsMsXCKghyHZSEw7b839YtvWm2Am3kzFZdBWmu0kv11qJ5k76O58KGvh7Ge5m`
    const programElementsURL = `${zohoApp}Program/HNwPFZCXrBC2qVqKDs3jAjd5KMn8GFAxCf4rq68aFXCJWDqjspjCX5w5BEbBTqkV5VsAs5VrQFde1rPf7ZBR35ajzyJ9pZ3Er1HH`
    // const judgesFunctionsURL=`${zohoApp}Judges_functions_Report/P6XyjjYZqUF2RrYr7syqFCCEvznzM4P6RbwDx2vTdOK9KQEteAZtSrQuMgxQzH5PdTsjZ4qV3YYyCDO11FD84kHx9649UGNnYjHY`
    const entriesURL = `${zohoApp}All_entries_local/7x3ms926YqMB15brY7ffJKkDXPeg9deVATFEBPTCVgqPGDVe5bKXygRfqRnpOhwg0TEgW7tzwKPV2kB4XPtQWy4EpnFgWBSe1Hsg`
    const judgesURL = `${zohoApp}All_Adjudicators/JsUSxeATqsmz0q7zmM6r3VyPrEJRR6p8bdtACOK7tTkHTXRr0gTWDm0HUWbBsduR4rgh2DA2yJb1qxZQSsuXnfMySETg6wXSpJOx`

    ProgramItems.remove({});

    ProgramElements.remove({});
    Results.remove({});
    Athlethes.remove({});
    Judges.remove({});

    // var {
    //   data
    // } = HTTP.get(entriesURL);

    data = Entries;
    _.each(data.All_entries_local, a => {
      Athlethes.insert(a)
    })


    // var {
    //   data
    // } = HTTP.get(programItemsURL);

    _.each(programItems.ProgramsItems, pi => {
      delete pi["Entries.Number"]
      ProgramItems.insert(pi)
    })

    var {
      data
    } = HTTP.get(programElementsURL);

    console.log(_.keys(data));

    _.each(Program, pe => {
      ProgramElements.insert(pe)
    })
    console.log(ProgramElements.find().count())

    var {
      data
    } = HTTP.get(judgesURL);

    console.log(_.keys(data));
    _.each(data.Judges, j => {
      Judges.insert(j)
    })


  }
})