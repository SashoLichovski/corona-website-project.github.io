let newData = [];
axios.get(`https://covid-ca.azurewebsites.net/api/covid/history`,{
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then((response) => {
    let data = JSON.parse(response.data);
    console.log(data);

    // Bar char for each country on search (default chart is for Mk)
    let countryObject;
    let infectedWeek1 = 0;let infectedWeek2 = 0;let infectedWeek3 = 0;let infectedWeek4 = 0;let infectedWeek5 = 0;let infectedWeek6 = 0;let infectedWeek7 = 0;let infectedWeek8 = 0;
    let recoveredWeek1 = 0;let recoveredWeek2 = 0;let recoveredWeek3 = 0;let recoveredWeek4 = 0;let recoveredWeek5 = 0;let recoveredWeek6 = 0;let recoveredWeek7 = 0;let recoveredWeek8 = 0;
    let deathsWeek1 = 0;let deathsWeek2 = 0;let deathsWeek3 = 0;let deathsWeek4 = 0;let deathsWeek5 = 0;let deathsWeek6 = 0;let deathsWeek7 = 0;let deathsWeek8 = 0;

    function setInfectedValues(countryName){
        for (let i = 0; i < data.length; i++) {
            if (data[i].country == countryName) {
                countryObject = data[i];
                var infectedArr = Object.values(countryObject.timeline.cases);
                infectedWeek1 = parseInt(infectedArr[6]);
                infectedWeek2 = parseInt(infectedArr[13]) - parseInt(infectedArr[6]); 
                infectedWeek3 = parseInt(infectedArr[20]) - parseInt(infectedArr[13]);
                infectedWeek4 = parseInt(infectedArr[27]) - parseInt(infectedArr[20]);
                infectedWeek5 = parseInt(infectedArr[34]) - parseInt(infectedArr[27]);
                infectedWeek6 = parseInt(infectedArr[41]) - parseInt(infectedArr[34]);
                infectedWeek7 = parseInt(infectedArr[48]) - parseInt(infectedArr[41]);
                infectedWeek8 = parseInt(infectedArr[infectedArr.length-1]) - parseInt(infectedArr[48]);
                break;
            }
        }
    }
    function setRecoveredValues(countryName){
        for (let i = 0; i < data.length; i++) {
            if (data[i].country == countryName) {
                countryObject = data[i];
                var infectedArr = Object.values(countryObject.timeline.recovered);
                recoveredWeek1 = parseInt(infectedArr[6]);
                recoveredWeek2 = parseInt(infectedArr[13]) - parseInt(infectedArr[6]); 
                recoveredWeek3 = parseInt(infectedArr[20]) - parseInt(infectedArr[13]);
                recoveredWeek4 = parseInt(infectedArr[27]) - parseInt(infectedArr[20]);
                recoveredWeek5 = parseInt(infectedArr[34]) - parseInt(infectedArr[27]);
                recoveredWeek6 = parseInt(infectedArr[41]) - parseInt(infectedArr[34]);
                recoveredWeek7 = parseInt(infectedArr[48]) - parseInt(infectedArr[41]);
                recoveredWeek8 = parseInt(infectedArr[infectedArr.length-1]) - parseInt(infectedArr[48]);
                break;
            }
        }
    }
    function setDeathsValues(countryName){
        for (let i = 0; i < data.length; i++) {
            if (data[i].country == countryName) {
                countryObject = data[i];
                var infectedArr = Object.values(countryObject.timeline.deaths);
                deathsWeek1 = parseInt(infectedArr[6]);
                deathsWeek2 = parseInt(infectedArr[13]) - parseInt(infectedArr[6]); 
                deathsWeek3 = parseInt(infectedArr[20]) - parseInt(infectedArr[13]);
                deathsWeek4 = parseInt(infectedArr[27]) - parseInt(infectedArr[20]);
                deathsWeek5 = parseInt(infectedArr[34]) - parseInt(infectedArr[27]);
                deathsWeek6 = parseInt(infectedArr[41]) - parseInt(infectedArr[34]);
                deathsWeek7 = parseInt(infectedArr[48]) - parseInt(infectedArr[41]);
                deathsWeek8 = parseInt(infectedArr[infectedArr.length-1]) - parseInt(infectedArr[48]);
                break;
            }
        }
    }
    function generateGraph(countryName){
        setInfectedValues(countryName);
        setRecoveredValues(countryName);
        setDeathsValues(countryName);

        let chartContainer = document.getElementById('chartContainer');
        let infectedChartElement = document.createElement('canvas');
        infectedChartElement.id = 'infectedChart';
        chartContainer.appendChild(infectedChartElement);

        infectedChartElement.getContext('2d');
        let infectedChart = new Chart(infectedChartElement, {
            type: 'bar',
            data:{
                labels:['Jan 22 - Jan 29', 'Jan 30 - Feb 06', 'Feb 7 - Feb 14', 'Feb 15 - Feb 22', 'Feb 23 - Mar 01', 'Mar 02 - Mar 09', 'Mar 10 - Mar 17', 'Mar 17 - Today'],
                datasets:[{
                    label:'Infected',
                    data:[
                        infectedWeek1,
                        infectedWeek2,
                        infectedWeek3,
                        infectedWeek4,
                        infectedWeek5,
                        infectedWeek6,
                        infectedWeek7,
                        infectedWeek8,
                    ],
                    backgroundColor: 'blue',
                    borderWidth:1,
                    borderColor:'grey',
                    hoverBorderWidth:3,
                    hoverBorderColor:'black',
                    fill:true
                },{
                    label:'Recovered',
                    data:[
                        recoveredWeek1,
                        recoveredWeek2,
                        recoveredWeek3,
                        recoveredWeek4,
                        recoveredWeek5,
                        recoveredWeek6,
                        recoveredWeek7,
                        recoveredWeek8,
                    ],
                    backgroundColor: 'green',
                    borderWidth:1,
                    borderColor:'grey',
                    hoverBorderWidth:3,
                    hoverBorderColor:'black',
                    fill:false
                },{
                    label:'Deaths',
                    data:[
                        deathsWeek1,
                        deathsWeek2,
                        deathsWeek3,
                        deathsWeek4,
                        deathsWeek5,
                        deathsWeek6,
                        deathsWeek7,
                        deathsWeek8,
                    ],
                    backgroundColor: 'red',
                    borderWidth:1,
                    borderColor:'grey',
                    hoverBorderWidth:3,
                    hoverBorderColor:'black',
                    fill:false
                }]
            },
            options:{
                title:{
                    display:true,
                    text:`Covid-19 weekly infections in ${countryName}`,
                    fontSize:25
                },
                legend:{
                    position:'top'
                }
            }
        });
    }
    generateGraph('north macedonia');
    
    let graphSearch = document.getElementById('countryGraphSearch');
    let graphSearchValue;
    let chartContainer = document.getElementById('infectedChart');
    graphSearch.onkeypress = function(event){
        if (event.keyCode == 13) {
            document.getElementById('infectedChart').remove();
            graphSearchValue = graphSearch.value;
            generateGraph(graphSearchValue);
            graphSearch.value = '';
        }
    }
     
})
.catch(error => {
    console.log(error)
});



