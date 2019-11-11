const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);



jetpackService.getJetpacks().then(jetpacks => {
    let html =  ' <div class="card-columns" id="cardColumn">\n';
    jetpacks.forEach((jetpack) => {
        html +=
            '<div class="card" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="..." id="edit-image-'+jetpack.id+'" value="'+jetpack.image+'">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title" id="edit-name-'+jetpack.id+'" value="' + jetpack.name + '">' + jetpack.name + '</h5>\n' +
            '    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalEdit"  id="'+jetpack.id+'" onclick="editJetpack(this.id)" > Edit </button>\n' +
            '  </div>\n' +
            '</div>\n'

    });
    html +='</div>';
    document.getElementById('jetpacks').innerHTML = html;

});

document.getElementById('save').onclick = () =>{

  name = document.getElementById('nom').value;
  image = document.getElementById('image').value;

  jetpackService.save(name,image).then(jetpack => {
    //alert(jetpack.id);
      let html =  '';
          html +=
              '<div class="card" style="width: 18rem;">\n' +
              '  <img src="'+ jetpack.image +'" class="card-img-top" alt="..." id="edit-image-'+jetpack.id+'" value="'+ jetpack.image +'">\n' +
              '  <div class="card-body">\n' +
              '    <h5 class="card-title" id="edit-name-'+jetpack.id+'" value="' + jetpack.name + '">' + jetpack.name + '</h5>\n' +
              '    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalEdit" id="'+jetpack.id+'" onclick="editJetpack(this.id)" > Edit </button>\n' +
              '  </div>\n' +
              '</div>';
      //alert(html);
      document.getElementById('cardColumn').innerHTML += html;

  });
  $('#modalCreate').modal('hide');

}

