const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');
const Jetpack = require('./src/Entity/Jetpack');

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

document.getElementById('edit').onclick = () =>{
  name = document.getElementById('EditNom').value;
  image = document.getElementById('EditImage').value;
  id = document.getElementById('edit-id').value;

  jetpackService.edit(id,name,image).then(jetpack => {

  });
  $('#modalEdit').modal('hide');
}

document.getElementById('book').onclick = () =>{
  id = document.getElementById('book-id').value;
  jetpackService.reserver(id).then(jetpack => {
      let html =
        '<div class="card" style="width: 18rem;">\n' +
        '  <img src="'+ jetpack.image +'" class="card-img-top" alt="..." id="book-image-'+jetpack.id+'" value="'+ jetpack.image +'">\n' +
        '  <div class="card-body">\n' +
        '    <h5 class="card-title" id="book-name-'+jetpack.id+'" value="' + jetpack.name + '">' + jetpack.name + '</h5>\n' +
        '  </div>\n' +
        '</div>';
      document.getElementById('cardColumnBook').innerHTML +=html;
      document.getElementById('cardColumnAvailable').innerHTML = "";
  });
  $('#modalReserver').modal('hide');
}

editJetpack = function (id) {
  /// Rajouter dans le modal edit les valeur de nom et url + un hidden avec l'id du jetpack a edit grace au bouton
  document.getElementById('EditNom').value = document.getElementById('edit-name-'+id+'').innerHTML;
  document.getElementById('EditImage').value = document.getElementById('edit-image-'+id+'').src;
  document.getElementById('edit-id').value = id;
}

search = function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    let backgroundColorStartDate = "white";
    let backgroundColorEndDate = "white";
    if(isValidDates(startDate, endDate)) {
        jetpackService.searchJetpack(startDate, endDate).then(jetpacks => {
            document.getElementById('cardColumnAvailable').innerHTML = "";
            jetpacks.forEach((jetpack) => {
                let html =  '';
                  html +=
                      '<div class="card" style="width: 18rem;">\n' +
                      '  <img src="'+ jetpack.image +'" class="card-img-top" alt="..." id="book-image-'+jetpack.id+'" value="'+ jetpack.image +'">\n' +
                      '  <div class="card-body">\n' +
                      '    <h5 class="card-title" id="book-name-'+jetpack.id+'" value="' + jetpack.name + '">' + jetpack.name + '</h5>\n' +
                      '    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalReserver" id="'+jetpack.id+'" onclick="ReserverJetpack(this.id)" > Reserver </button>\n' +
                      '  </div>\n' +
                      '</div>';
                document.getElementById('cardColumnAvailable').innerHTML +=html;

            });
        });
    }else{
         backgroundColorStartDate = "red";
         backgroundColorEndDate = "red";
    }

    document.getElementById('startDate').style.backgroundColor = backgroundColorStartDate;
    document.getElementById('endDate').style.backgroundColor = backgroundColorEndDate;
};

isValidDates = function (startDate, endDate) {
    return new Date(startDate) <= new Date(endDate);
};

ReserverJetpack = function (id){
  document.getElementById('BookName').innerHTML = document.getElementById('book-name-'+id+'').innerHTML;
  document.getElementById('book-id').value = id;
}

