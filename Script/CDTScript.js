
// Overview for each country
axios.get('https://covid-ca.azurewebsites.net/api/covid/countries', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then((response) => {
    let data = JSON.parse(response.data);
    console.log(data);

    // General overivew world wide
    let wwsTodayCases = document.getElementById('wwsTodayCases');
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].todayCases
    }
    wwsTodayCases.innerText = sum.toString();
    sum = 0;
    let wwsTodayDeaths = document.getElementById('wwsTodayDeaths');
    for (let i = 0; i < data.length; i++) {
        sum += data[i].todayDeaths
    }
    wwsTodayDeaths.innerText = sum.toString();
    sum = 0;
    let wwsCritical = document.getElementById('wwsCritical');
    for (let i = 0; i < data.length; i++) {
        sum += data[i].critical
    }
    wwsCritical.innerText = sum.toString();
    sum = 0;
    let wwsCases = document.getElementById('wwsCases');
    for (let i = 0; i < data.length; i++) {
        sum += data[i].cases;       
    }
    wwsCases.innerText = sum.toString();
    sum = 0;
    let wwsDeaths = document.getElementById('wwsDeaths');
    for (let i = 0; i < data.length; i++) {
        sum += data[i].deaths;        
    }
    wwsDeaths.innerText = sum.toString();
    sum = 0;
    let wwsRecovered = document.getElementById('wwsRecovered');
    for (let i = 0; i < data.length; i++) {
        sum += data[i].recovered;        
    }
    wwsRecovered.innerText = sum.toString();
    // Getting MK statistics
    let mkStatisticInfo;
    for (let i = 0; i < data.length; i++) {
        if (data[i].country == 'North Macedonia') {
            mkStatisticInfo = data[i]
            break;
        }
    }
    let mksCases = document.getElementById('mksCases');
    mksCases.innerText = mkStatisticInfo.cases;
    let mksDeaths = document.getElementById('mksDeaths');
    mksDeaths.innerText = mkStatisticInfo.deaths;
    let mksRecovered = document.getElementById('mksRecovered');
    mksRecovered.innerText =mkStatisticInfo.recovered;
    let mksTodayCases = document.getElementById('mksTodayCases');
    mksTodayCases.innerText = mkStatisticInfo.todayCases;
    mksTodayDeaths.innerText = mkStatisticInfo.todayDeaths;
    mksCritical.innerText = mkStatisticInfo.critical;

    // All countries statistics
    let acTBody = document.getElementById('allCountriesTBody');
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        acTBody.appendChild(tr);
        let tdCountry = document.createElement('td');
        tdCountry.innerText = data[i].country;
        tdCountry.className = 'countryTableRow';
        let tdCases = document.createElement('td');
        tdCases.innerText = data[i].cases;
        tdCases.className = 'countryTableRow';
        let tdTodayCases = document.createElement('td');
        tdTodayCases.innerText = data[i].todayCases;
        tdTodayCases.className = 'countryTableRow';
        let tdDeaths = document.createElement('td');
        tdDeaths.innerText = data[i].deaths;
        tdDeaths.className = 'countryTableRow';
        let tdTodayDeaths = document.createElement('td');
        tdTodayDeaths.innerText = data[i].todayDeaths;
        tdTodayDeaths.className = 'countryTableRow';
        let tdRecovered = document.createElement('td');
        tdRecovered.innerText = data[i].recovered;
        tdRecovered.className = 'countryTableRow';
        let tdCritical = document.createElement('td');
        tdCritical.innerText = data[i].critical;
        tdCritical.className = 'countryTableRow';
        tr.appendChild(tdCountry);
        tr.appendChild(tdCases);
        tr.appendChild(tdTodayCases);
        tr.appendChild(tdDeaths);
        tr.appendChild(tdTodayDeaths);
        tr.appendChild(tdRecovered);
        tr.appendChild(tdCritical);
        let trHead = document.getElementById('trHead');
        let header = [];
        tr.onmouseover = function(){
            if (tr.previousElementSibling != null) {
                tr.className = 'bg-light';
                tr.style.color = 'black';
                tr.previousElementSibling.className = 'bg-info';
                for (let i = 0; i < tr.cells.length; i++) {
                    header.push(tr.previousElementSibling.children[i].innerText)
                    tr.previousElementSibling.children[i].innerText = trHead.children[i].innerText;
                } 
            }
        }
        tr.onmouseout = function(){
            if (tr.previousElementSibling != null) {
                tr.className = '';
                tr.style.color = 'white';
                tr.previousElementSibling.className = '';
                for (let i = 0; i < tr.cells.length; i++) {
                    tr.previousElementSibling.children[i].innerText = header[i];
                }
            }
        }
        header = [];
    }
})
.catch(error => {
    console.log(error)
})


let searchInputValue;
let searchInput = document.getElementById('countrySearch');
let searchBtn = document.getElementById('searchBtn');
searchInput.onkeypress = function(event){
    if (event.keyCode == 13) {
        generateCountryInfo()
    }
}

function generateCountryInfo(){
    searchInput.disabled = true;
    searchInputValue = searchInput.value;
    console.log(searchInputValue);
    searchInput.value = '';

    let singleCountryContianer = document.getElementById('singleCountryContianer');
    let countryInfo = document.createElement('div');
    countryInfo.className = 'countryInfoContainer';
    singleCountryContianer.appendChild(countryInfo);

    let countryHeader = document.createElement('div');
    countryHeader.innerText = searchInputValue + ' statistics';
    countryHeader.className = 'countryHeader';
    countryInfo.appendChild(countryHeader);

    let table = document.createElement('table')
    table.style.margin = 'auto';
    table.className = 'table table-striped table-dark'
    countryHeader.appendChild(table);
    let tHead = document.createElement('thead')
    table.appendChild(tHead);
    let tr = document.createElement('tr');
    tHead.appendChild(tr)

    let thCases = document.createElement('th');
    thCases.className = 'countryTableHead';
    thCases.innerText = 'Вкупно заболени';
    let thTodayCases = document.createElement('th');
    thTodayCases.className = 'countryTableHead';
    thTodayCases.innerText = 'Денешни случаи';
    let thDeaths = document.createElement('th');
    thDeaths.className = 'countryTableHead';
    thDeaths.innerText = 'Починати';
    let thTodayDeaths = document.createElement('th');
    thTodayDeaths.className = 'countryTableHead';
    thTodayDeaths.innerText = 'Денеска починати';
    let thRecovered = document.createElement('th');
    thRecovered.className = 'countryTableHead';
    thRecovered.innerText = 'Излечени';
    let thCritical = document.createElement('th');
    thCritical.className = 'countryTableHead';
    thCritical.innerText = 'Критични';

    tr.appendChild(thCases);
    tr.appendChild(thTodayCases);
    tr.appendChild(thDeaths);
    tr.appendChild(thTodayDeaths);
    tr.appendChild(thRecovered);
    tr.appendChild(thCritical);
    
    let allCountriesTable = document.getElementById('allCountriesTable');
    for (let i = 0; i < allCountriesTable.rows.length; i++) {
        if (allCountriesTable.rows[i].cells[0].innerText.toLowerCase() == searchInputValue.toLowerCase()) {
            let tBody = document.createElement('tbody');
            table.appendChild(tBody);
            let bodyTr = document.createElement('tr');
            tBody.appendChild(bodyTr);
            let tdCases = document.createElement('td');
            tdCases.className = 'countryTableHead';
            tdCases.innerText = allCountriesTable.rows[i].cells[1].innerText;
            let tdTodayCases = document.createElement('td');
            tdTodayCases.className = 'countryTableHead';
            tdTodayCases.innerText = allCountriesTable.rows[i].cells[2].innerText;
            let tdDeaths = document.createElement('td');
            tdDeaths.className = 'countryTableHead';
            tdDeaths.innerText = allCountriesTable.rows[i].cells[3].innerText;
            let tdTodayDeaths = document.createElement('td');
            tdTodayDeaths.className = 'countryTableHead';
            tdTodayDeaths.innerText = allCountriesTable.rows[i].cells[4].innerText;
            let tdRecovered = document.createElement('td');
            tdRecovered.className = 'countryTableHead';
            tdRecovered.innerText = allCountriesTable.rows[i].cells[5].innerText;
            let tdCritical = document.createElement('td');
            tdCritical.innerText = allCountriesTable.rows[i].cells[6].innerText;
            tdCritical.className = 'countryTableHead';

            bodyTr.appendChild(tdCases);
            bodyTr.appendChild(tdTodayCases);
            bodyTr.appendChild(tdDeaths);
            bodyTr.appendChild(tdTodayDeaths);
            bodyTr.appendChild(tdRecovered);
            bodyTr.appendChild(tdCritical);
            break;
        }    
    }


    let closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close';
    closeBtn.className = 'btn btn-success closeCountryInfo';

    countryInfo.appendChild(closeBtn);
    closeBtn.onclick = function(){
        searchInput.disabled = false;
        countryInfo.remove();
    }
}







