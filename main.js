let tittel = document.getElementById('tittel');
let pris = document.getElementById('pris');
let skatt = document.getElementById('skatt');
let annonser = document.getElementById('annonser');
let rabatt = document.getElementById('rabatt');
let total = document.getElementById('total');
let telle = document.getElementById('telle');
let kategori = document.getElementById('kategori');
let sendeinn = document.getElementById('sendeinn');

let mood = 'skape';
let tmp;

// få totalt
function getTotal()
{
    if(pris.value != ''){
        let result = (+pris.value + +skatt.value + +annonser.value)
         - +rabatt.value;
        total.innerHTML = result;
        total.style.background = '#003151';
    }else{
        total.innerHTML = '';
        total.style.background = '#F1C40F';
    }
}






// lage produkt

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
} 



sendeinn.onclick = function(){
    let newPro = {
        tittel:tittel.value,
        pris:pris.value,
        skatt:skatt.value,
        annonser:annonser.value,
        rabatt:rabatt.value,
        total:total.innerHTML,
        telle:telle.value,
        kategori:kategori.value,
    }
    if(mood === 'skape'){
        if(newPro.telle > 1){
            for(let i = 0; i < newPro.telle; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[   tmp   ] = newPro
        mood = 'skape';
        sendeinn.innerHTML = 'skape';
        telle.style.display = 'blokkere';

    }
    
    




    localStorage.setItem('product',    JSON.stringify(dataPro)        )
    
    clearData()
    showData()
}







function clearData(){
    tittel.value ='';
    pris.value = '';
    skatt.value = '';
    annonser.value = '';
    rabatt.value = '';
    total.innerHTML = '';
    telle.value = '';
    kategori.value = '';
}




function showData()
{
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table +=`
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].tittel}</td>
            <td>${dataPro[i].pris}</td>
            <td>${dataPro[i].skatt}</td>
            <td>${dataPro[i].annonser}</td>
            <td>${dataPro[i].rabatt}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].kategori}</td>
            <td>
            <button onclick="oppdateData(${i})" id="Oppdate">Oppdate</button>
            </td>
            <td>
            <button onclick="deleteData( ${i})" id="slette">slette</button>
            </td>
        </tr>
        `
        
       
        
    }


    document.getElementById('tbody').innerHTML = table;
    let btnDlette = document.getElementById('slettealle');
    if(dataPro.length > 0){
        btnDlette.innerHTML = `
        <button onclick="slettealle()">Slette Alle (${dataPro.length})</button>
        `
    }else{
        btnDlette.innerHTML = '';
    }
}
showData()



// slette

function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

function slettealle(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// Oppdater
function oppdateData(i){
    tittel.value = dataPro[i].tittel;
    pris.value = dataPro[i].pris;
    skatt.value = dataPro[i].skatt;
    annonser .value = dataPro[i].annonser; 
    rabatt.value = dataPro[i].rabatt;
    getTotal()
    telle.style.display = 'none';
    kategori.value = dataPro[i].kategori;
    sendeinn.innerHTML = 'oppdate';
    mood = 'oppdate';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}



// Søk
let søkMood = 'tittel';

function getsøkMood(id)
{
    let søk = document.getElementById('søk');
    if(id == 'søkTittel'){
        søkMood = 'tittel';
        søk.placeholder = 'Søk etter Tittel';
    }else{
        søkMood = 'Kategori';
        søk.placeholder = 'Søk etter Kategori';
    }
søk.focus()    
    
}













// ren dara