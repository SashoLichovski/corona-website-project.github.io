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

    let countryObject;
    let week1 = 0;
    let week2 = 0;
    let week3 = 0;
    let week4 = 0;
    let week5 = 0;
    let week6 = 0;
    let week7 = 0;
    let week8 = 0;
    function generateGraph(countryName){
        for (let i = 0; i < data.length; i++) {
            if (data[i].country == countryName) {
                countryObject = data[i];
                var infectedArr = Object.values(countryObject.timeline.cases);
                week1 = parseInt(infectedArr[6]);
                week2 = parseInt(infectedArr[13]);
                week3 = parseInt(infectedArr[20]);
                week4 = parseInt(infectedArr[27]);
                week5 = parseInt(infectedArr[33]);
                week6 = parseInt(infectedArr[40]);
                week7 = parseInt(infectedArr[47]);
                week8 = parseInt(infectedArr[infectedArr.length-1]);
                break;
            }
        }
        let infectedChartElement = document.getElementById('infectedChart').getContext('2d');
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
    generateGraph('north macedonia');

    // debugger;
    

    let graphSearch = document.getElementById('countryGraphSearch');
    let graphSearchValue;
    graphSearch.onkeypress = function(event){
        if (event.keyCode == 13) {
            let infectedChartElement = document.getElementById('infectedChart');
            // infectedChartElement.remove();
            graphSearchValue = graphSearch.value;
            generateGraph(graphSearchValue);
        }
    }
})
.catch(error => {
    console.log(error)
});



