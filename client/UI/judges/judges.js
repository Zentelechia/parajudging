Template.judges.helpers({
  judges(){
    return Judges.find().fetch()
  }
})

Template.athlethes.helpers({
  athlethes(){
    q = {}
    let filter = Session.get('filter')
    if (filter) {
      q = {
        $or: [{
          Athlete_1Local_name: {
              $regex: filter,
              $options: 'i'
            }
          },
          {
            Athlete_2Local_name: {
              $regex: filter,
              $options: 'i'
            }
          },
          {
            Requestlub_organization_name: {
              $regex: filter,
              $options: 'i'
            }
          },
          {
            RequestSingle_Line2: {
              $regex: filter,
              $options: 'i'
            }
          },
          
        ]
      }
    }
    return Athlethes.find(q,{sort: {Number: 1}}).fetch()
  }
})