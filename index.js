/**
 * index.js
 * 
 * 1. Get data from API using Axios
 * 2. Format data in preparation for HighCharts
 * 3. Display data using HighCharts -->
 */

/**
 * Parse the response data from the API into a format that highcharts accepts
 * 
 * @param {array} data 
 */
const parseData = function(data) {
    return Object.entries(data).map((value) => [moment(value[0], 'YYYY-MM-DD').valueOf(), value[1]])
}

/**
 * Renders a table from an array
 * 
 * @param {array} data 
 */
const renderTable = function(data) {
    const html = Object.entries(data).reduce((string, value) => string + `<tr><td>${value[0]}</td><td>${value[1]}</td></tr>`, '')
    document.getElementById('data').innerHTML = html;
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
            
            const rawData = response.data['bpi']
            renderTable(rawData);

            const chartData = parseData(rawData);
            console.log(chartData);
        })
        
        // Executes if an error occurs if code is not >= 200 && < 300
        .catch(error => { 
            console.error(error)
        })
        
        // Always occurs even if there is an error
        .finally(() => {
            console.log('Done')
        }); 
});