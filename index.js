/**
 * index.js
 * 
 * 1. Get data from API using Axios
 * 2. Format data in preparation for HighCharts
 * 3. Display data using HighCharts -->
 */

/**
 * Renders table rows
 * 
 * @param {array} data 
 * @param {string} id 
 */
const renderTable = (data, id) => {
    return document.getElementById(id).innerHTML = data.reduce((output, value) => {
        return output + `<tr><td>${value[0]}</td><td>${value[1]}</td></tr>`
    }, '')
}

/**
 * Renders content as a child of an element with ID
 * 
 * @param {string} content
 * @param {string} id 
 */
const renderHTML = (content, id) => document.getElementById(id).innerHTML = content

/**
 * Parse the response data from the API into a format that highcharts accepts
 * 
 * @param {array} data 
 */
const parseData = (data) => {
    return data.map((value) => [moment(value[0], 'YYYY-MM-DD').valueOf(), value[1]])
}

/**
 * Renders a HighChart as a child of an element with ID
 * 
 * @param {string} data
 * @param {string} id 
 */
const renderChart = function(data, id) {
    return Highcharts.chart(id, {
        title: {
            text: 'Bitcoin Historical Price'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Price in USD'
            }
        },
        series: [{
            name: 'Bitcoin (BTC)',
            data: parseData(data)
        }],
    });
}

/**
 * DOMContentLoaded event is fired once the DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() { 

    // Log to browser console
    console.log('DOM Ready')
    
    // Axios HTTP GET request
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json') 
        
        // Executes if the data is returned successfully
        .then(response => {
            
            // Turn the object returned by the API into an array
            const chartData = Object.entries(response.data['bpi'])
            
            renderTable(chartData, 'data')
            renderChart(chartData, 'chart')
            renderHTML(response.data['disclaimer'], 'disclaimer')
            renderHTML(response.data['time']['updated'], 'updated')
        })
        
        // Executes if an error occurs if code is not >= 200 && < 300
        .catch(error => { 
            console.error(error)
        })
        
        // Always occurs even if there is an error
        .finally(() => {
            console.log('Done Rendering')
        }); 
});