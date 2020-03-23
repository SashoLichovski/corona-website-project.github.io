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

    // function calculateWeeklyInfected(no1, no2){
    //     let sum;
    //     sum = no2 - no1;
    //     return sum;
    // }

    let countryObject;
    let week1 = 0;
    let week2 = 0;
    let week3 = 0;
    let week4 = 0;
    let week5 = 0;
    let week6 = 0;
    let week7 = 0;
    let week8 = 0;
    function generateGraph(countryName,timelineOption){
        for (let i = 0; i < data.length; i++) {
            if (data[i].country == countryName) {
                countryObject = data[i];
                var infectedArr = Object.values(countryObject.timeline[timelineOption]);
                week1 = parseInt(infectedArr[6]);
                week2 = parseInt(infectedArr[13]) - parseInt(infectedArr[6]); 
                week3 = parseInt(infectedArr[20]) - parseInt(infectedArr[13]);
                week4 = parseInt(infectedArr[27]) - parseInt(infectedArr[20]);
                week5 = parseInt(infectedArr[34]) - parseInt(infectedArr[27]);
                week6 = parseInt(infectedArr[41]) - parseInt(infectedArr[34]);
                week7 = parseInt(infectedArr[48]) - parseInt(infectedArr[41]);
                week8 = parseInt(infectedArr[infectedArr.length-1]) - parseInt(infectedArr[48]);
                break;
            }
        }
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
                        week1,
                        week2,
                        week3,
                        week4,
                        week5,
                        week6,
                        week7,
                        week8,
                    ],
                    backgroundColor: 'blue',
                    borderWidth:1,
                    borderColor:'grey',
                    hoverBorderWidth:3,
                    hoverBorderColor:'black'
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
    generateGraph('north macedonia','cases');

    // debugger;
    

    let graphSearch = document.getElementById('countryGraphSearch');
    let graphSearchValue;
    graphSearch.onkeypress = function(event){
        if (event.keyCode == 13) {
            let chartContainer = document.getElementById('infectedChart');
            chartContainer.remove();
            graphSearchValue = graphSearch.value;
            generateGraph(graphSearchValue, 'cases');
        }
    }
})
.catch(error => {
    console.log(error)
});



