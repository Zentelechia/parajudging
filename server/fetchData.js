const zohoApp = 'https://creator.zohopublic.com/venture/paradance/json/'
const programItemsURL=`${zohoApp}ProgramsItems/gSRsVvBbXU4UE9kRErP0aMwNvVSF0zm7JM4rvXSPD9hVuDaw3GJsfQRU5xDPjvS0qEGnekVaqv4pqaE8MWVW4eUYyHBWyKH30kmg`
// const championshipURL=`${zohoApp}All_Championships/KXrGmGGtvx0pdDJTnWKYbuX5jE2xe3DObz1p9OmnsMsXCKghyHZSEw7b839YtvWm2Am3kzFZdBWmu0kv11qJ5k76O58KGvh7Ge5m`
const programElementsURL=`${zohoApp}Program/zgrDy3W8nhrXSAKAAaskyNwwrtDUb5CUu1p4wYZvSxrdkaVy7O5NmGjNtPZvmGb4uPgBD6e5eJ5TxGF0uYk9armFvPVrrrC2aVXr`
// const judgesFunctionsURL=`${zohoApp}Judges_functions_Report/P6XyjjYZqUF2RrYr7syqFCCEvznzM4P6RbwDx2vTdOK9KQEteAZtSrQuMgxQzH5PdTsjZ4qV3YYyCDO11FD84kHx9649UGNnYjHY`
var flag=true
    flag = false 




String.prototype.replaceAll = function(search, replace){
  return this.split(search).join(replace);
}
if (flag){
ProgramItems.remove({})
ProgramElements.remove({name: {$exists: false}})
  var { data} = HTTP.get(programItemsURL)
//   // const cs=HTTP.get(championshipURL)
  // const pe=HTTP.get(programElementsURL)
//   // const { data } =HTTP.get(championshipURL)
//   // Judges.insert(data)
//   // judges=data.Championships[0]["Judges.Judge"]
//   // console.log(judges)
// console.log(_.keys(data))
_.each(data.programs_items,pi=>{
  
  delete pi["Entries.Number"]
  ProgramItems.insert(pi)
  // console.log(pi)
})


var {content}  = HTTP.get(programElementsURL)
content=content.replaceAll('"ID":','"ID":"')
content=content.replaceAll('}','"}')
content =content.replace(']"}',']}')

// console.log(content)
data = JSON.parse(content)
// console.log(result)



// console.log(data.program_elements)
_.each(data.program_elements,pe=>{
  // console.log(pe.ID)
  ProgramElements.insert(pe)
})
}



// judges=Judges.findOne()
// jj=judges.Championships[0].Organizer.split(',')
// _.map(jj,j=>{
// ju=j.split(';')
// Judges.insert({name: ju[0].trim(), letter: ju[1].trim()})
// }) 