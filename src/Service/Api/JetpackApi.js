const JetpackApi = require('../../Entity/Jetpack');
module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetpacks() {
        return this.httpClient.fetch('/jetpacks', {}).then(rows => {

            return rows.map(row => {
                let jetpack = new JetpackApi();
                jetpack.id = row.id;
                jetpack.name = row.name;
                jetpack.image = row.image;
                return jetpack
            });
        });
    }

    save(name,image) {
        return this.httpClient.fetch('/jetpacks', {method:'POST',body:"name="+name+"&image="+image+""}).then(row => {
              let jetpack = new JetpackApi();
              jetpack.id = row.id;
              jetpack.name = row.name;
              jetpack.image = row.image;
              return jetpack;
        });
    }

    edit(id,name, image) {
        return this.httpClient.fetch('/jetpacks', {method:'POST',body:"name="+name+"&image="+image+"&id="+id+""}).then(row => {
              let jetpack = new JetpackApi();
              jetpack.id = row.id;
              jetpack.name = row.name;
              jetpack.image = row.image;
              return jetpack;
        });
    }

    searchJetpack(startDate, endDate){
        return this.httpClient.fetch('/jetpacks/search',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "startDate=" + startDate + "&endDate=" + endDate
            }

        ).then(rows => {
            return rows.map(row => {
                let jetpack = new JetpackApi();
                jetpack.id      = row.id;
                jetpack.name    = row.name;
                jetpack.image   = row.image;

                return jetpack
            });
        });
    }

    reserver(id) {
        return this.httpClient.fetch('/jetpacks', {method:'POST',body:"id="+id}).then(row => {
              let jetpack = new JetpackApi();
              jetpack.id = row.id;
              jetpack.name = row.name
              jetpack.image = row.image;
              return jetpack;
        });
    }
};

