var XlsxTemplate = Npm.require('xlsx-template');
// import XlsxTemplate1 from 'xlsx-template';


Router.route('/results/download/:_id', function () {
  pe = ProgramElements.findOne({
    _id: this.params._id
  })
  if (pe) {
    var fs = Npm.require('fs');
    var path = Npm.require('path');
    var basepath = path.resolve('.').split('.meteor')[0];
    var res = this.response;
    console.log(XlsxTemplate )
    fs.readFile(basepath + 'templates/results.xlsx', function (err, data) {
      
      // Create a template
      var template = new XlsxTemplate(data);

      const title = `${pe.Program} ${pe.Event} ${pe.Gender} ${pe.Class}`;
      const filename = `${pe.Program}_${pe.Event}_${pe.Gender}_${pe.Class}`;
      const results = Results.find({
        program_element,
        type: 'total',
        value: {
          $not: 0
        }
      }, {
        fields: {
          Dance: 1,
          Entry: 1,
          Level: 1,
          value: 1
        }
      }).fetch()
      const obj = {
        title,
        results
      }

      // Replacements take place on first sheet
      var sheetNumber = 1;
      template.substitute(sheetNumber, obj);
      var data = template.generate({
        type: 'base64'
      });
      res.writeHead(200, [
        ['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        ['Content-Disposition', `inline; filename="${filename}.xlsx"`]
      ]);
      res.end(new Buffer(data, 'base64'));
    });
  } else {
    var res = this.response;
    res.writeHead(200);
    res.end('Program results not found')
  }

}, {
  where: 'server'
});