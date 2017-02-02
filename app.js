function LoadAdditionalData() {
    //create the queryUrl to be used in the service call
    var query = "https://smontel.github.io/ParcEtJardin/ParcsEtJardins.json";
    console.log(query);
    var filter = "";
    var queryUrl = query + filter;
    console.log(queryUrl);
    //make jquery call to service
    $.getJSON(queryUrl, null, AdditionalData_Loaded);
}
//callback method
function AdditionalData_Loaded(data) {
    console.log(data); //affiche tout les elements de la BDD
    var container = document.getElementById("cities");
    var ul = document.createElement('UL'); //creer une liste
    container.appendChild(ul); //ajoute la liste dans la div cities de mon HTML

    var collectorville = {}; //creer un objet collecteur (chaque nom de ville sera initialisé en tant que keys de l'objet, avec une valeur nulle)
    for (let parcinfo of data.d) {
        let villeduParc = parcinfo.ville;
        if (collectorville[villeduParc] == undefined) {
            collectorville[villeduParc] = [];
        }
        let villeConcatene = villeduParc;
        villeConcatene = villeConcatene.replace(/ /g, "_");
        newparcinfo = {};
        newparcinfo['villeConcatene'] = villeConcatene;
        newparcinfo['nomduParc'] = parcinfo.raisonsociale;
        collectorville[villeduParc].push(newparcinfo);

    }
    let listville = Object.keys(collectorville); //creer une liste contenant toutes les keys de mon objet collecteur
    listville.sort();

    for (var i = 0; i < listville.length; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
        li.className += "ville";
        let villeConcatene = listville[i];
        villeConcatene = villeConcatene.replace(/ /g, "_");
        li.id += villeConcatene;
        li.innerHTML = listville[i]; //ajoute dans la liste les keys de mon objet collecteur
        let ul2 = document.createElement('UL');
        let div = $("#NomParc");
        div.append(ul2);
        ul2.className += 'Parclist ';
        ul2.className += villeConcatene;
        for (var j = 0; j < Object.keys(collectorville[listville[i]]).length; j++) {
            var li2 = document.createElement('li');
            ul2.appendChild(li2);
            li2.innerHTML = collectorville[listville[i]][j]['nomduParc'];
            li2.className += "Parc";
        }
    }
    $(".ville").click(function() {
        $('#NomParc ul').removeClass("shown");
        let commun = "." + $(this).attr('id');
        $(commun).addClass("shown");
        console.log($(this).attr('id'));
    });

    $(".Parc").click(function() {
        let div = $(".infoParc");
        var monTexte = this.innerText || this.textContent;
        for (let parcinfo of data.d) {
            if (monTexte == parcinfo.raisonsociale) {
                let h = document.createElement('h2');
                let p1 = document.createElement('p');
                let p = document.createElement('p');
                let p3 = document.createElement('p');
                h.innerHTML = parcinfo.raisonsociale;
                if (parcinfo.ligneadresse1 !== undefined) {
                    p.innerHTML = "Adresse : " + parcinfo.ligneadresse1 + " " + parcinfo.codepostal + " " + parcinfo.ville;
                }
                if (parcinfo.numro !== undefined && parcinfo.typedevoie !== undefined && parcinfo.voie !== undefined) {
                    p.innerHTML = "Adresse : " + parcinfo.numro + " " + parcinfo.typedevoie + " " + parcinfo.voie + " " + parcinfo.codepostal + " " + parcinfo.ville;
                } else if (parcinfo.typedevoie !== undefined && parcinfo.voie !== undefined) {
                    p.innerHTML = "Adresse : " + parcinfo.typedevoie + " " + parcinfo.voie + " " + parcinfo.codepostal + " " + parcinfo.ville;
                } else if (parcinfo.voie !== undefined) {
                    p.innerHTML = "Adresse : " + parcinfo.voie + " " + parcinfo.codepostal + " " + parcinfo.ville;
                }
                if (parcinfo.tlphone !== "00 00 00 00 00") {
                    let tel =  parcinfo.tlphone;
                  //  tel.replace(↵, /);
                    p1.innerHTML = "n° de téléphone : " + parcinfo.tlphone;
                }
                if (parcinfo.mail !== undefined){
                  p3.innerHTML = "e-mail : " + parcinfo.mail;
                }
                div.empty();
                div.append(h);
                div.append(p);
                div.append(p1);
                div.append(p3);
            }
        }

    })
}

//add cell contents to the table
function AddCellContents(data, cell, id) {
    var td = document.createElement('TD');
    var dataCell = data[cell][id];
    td.appendChild(document.createTextNode(dataCell));
    return td;
}
$(document).ready(function() {
    LoadAdditionalData();
    console.log("dom rdy");


});
