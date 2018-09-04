notFinal=[
  {heat: 1, 
    participants: [
  
    {_id: "123", number: 23, maybe: true},
    {_id: "1123", number: 56, maybe: true},
    {_id: "11123", number: 11},
    {_id: "2123", number: 24, selected: true},
    {_id: "3123", number: 34},
    {_id: "4123", number: 99},
    {_id: "5123", number: 20},
    {_id: "6123", number: 40}
    ]
  },
  {heat: 2, 
    participants: [
  
    {_id: "123", number: 223, maybe: true},
    {_id: "1123", number: 256, maybe: true},
    {_id: "11123", number: 211},
    {_id: "2123", number: 224, selected: true},
    {_id: "3123", number: 234},
    {_id: "4123", number: 299},
    {_id: "5123", number: 220},
    {_id: "6123", number: 240}
    ]
  },
  {heat: 3, 
    participants: [
  
    {_id: "123", number: 323, maybe: true},
    {_id: "1123", number: 356, maybe: true},
    {_id: "11123", number: 11},
    {_id: "2123", number: 324, selected: true},
    {_id: "3123", number: 334},
    {_id: "4123", number: 399},
    {_id: "5123", number: 320},
    {_id: "6123", number: 340}
    ]
  }
  ]
  final =[
    {heat: 1, 
      participants: [
    
      {_id: "123", number: 23, maybe: true},
      {_id: "1123", number: 56, maybe: true},
      {_id: "11123", number: 11}
     ]
    }
  ]
Session.set("totalSelect", 7)
Session.set("heatToDisplay",0)
Session.set("activeHeat",1)

Template.final.events({
  'click .score'(e){
    $('.score').removeClass('selectedScore')
    $(e.currentTarget).addClass('selectedScore')

    if ($(e.currentTarget).hasClass('numpad')){
      $("#skill").hide()
      $("#numPad").show()
    }
    else {
      $("#numPad").hide()
      $("#skill").show()

    }
  }
})
Template.final.onRendered(function(){
$(".currentHeat").hide()
$(".all").hide()
})
Template.skill.events({
  'click td'(e){
    var $e=$(e.currentTarget)
    $(".selectedScore").text($e.text())
    $e.addClass('button')
    setTimeout(()=>{
      $e.removeClass('button')
    },300)
  }
})

Template.numPad.events({
  'click td'(e){
    var $e=$(e.currentTarget)
    score = Session.get("numPads")
    if (!score){
      Session.set("numPads",$e.text())
    } else {
      $(".selectedScore").text(score+"."+$e.text())
      Session.set("numPads", null)

    }

    $e.addClass('button')
    setTimeout(()=>{
      $e.removeClass('button')
    },300)
  }
})
Template.picker.helpers({
  isFinal(){
    return Session.get('final')
  }
})
Template.final.helpers({
  judge(){
    const judge = Session.get("judge") 
    const functions = JudgesFunctions.findOne({letter: judge.letter})
    return  {...judge, ...functions}
  },
  item(){
    pi = ProgramItems.findOne({ active: true })
    Session.set('programItem',pi)
    return pi
  },
  heats(){
    const item = Sesison.get('programItem')

    // return Heats.find({ item }).fetch()
  },
  participants(){
    const programItem =  Session.get("programItem")
    heat = Session.get("heatToDisplay")
    return programItem[heat].participants;
  }
})
Template.notFinal.onRendered(()=>{
  $(".currentHeat").show()
  $(".all").show()
  $(".numPad").hide()

})
Template.notFinal.helpers({
  toSelect(){
    return Session.get('toSelect')
  },
  participants(){
    const programItem =  Session.get("programItem")
    heat = Session.get("heatToDisplay")
    return programItem[heat].participants;
  }
})

UI.registerHelper('score', function(scoreType, participant) {
  
  return scoreType=='skill'?"1.0":"5.0"
});
Template.notFinal.events({
  'click .selector'(e){
    toSelect=Session.get("toSelect")
    totalSelect = Session.get("totalSelect")
    stop = (toSelect==0)
    id=e.currentTarget.id
    programItem = Session.get("programItem")
    heatToDisplay = Session.get('heatToDisplay')
    var n =0
    for (var i=0; i<programItem[heatToDisplay].participants.length;i++){
      p = programItem[heatToDisplay].participants[i]
      if (p._id==id){
        if (p.maybe){
          if (!stop){
            programItem[heatToDisplay].participants[i].maybe=false;
            programItem[heatToDisplay].participants[i].selected=true;
          }
        }
        else if (p.selected){
          programItem[heatToDisplay].participants[i].selected=false;
        }
        else {
          if (!stop)
          programItem[heatToDisplay].participants[i].maybe=true;
        }
      }
      if (programItem[heatToDisplay].participants[i].selected) n++;
    }
    Session.set("toSelect",totalSelect-n)
    if (n==totalSelect) {
      $(".send").show()
    } else {
      $(".send").hide()
    }
    
    Session.set("programItem",programItem)

  }
})