const fs = require('fs');

// Read the JSON file
fs.readFile('first.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Define the filtering criteria
    const filteredData = jsonData.filter(item => item.type == 'message');

    // Format the filtered data as an object with named keys
    const formattedData = {};
    filteredData.forEach(item => {
        formattedData[item.id] = {
            body:'body',
            country:'AU',
            date:item.date,
            images:[item.photo.split('/')[1]],
            link:item.text[3],
            title:item.text[0],
        }
    });
    // filteredData.forEach(item => {
    //     console.log(item.text[1].text)
    // })

    // Now, 'formattedData' contains the filtered and formatted JSON
    // console.log(formattedData);
    console.log(formattedData);

    // If you want to save the formatted data to a new JSON file:
    fs.writeFile('formattedData.json', JSON.stringify(formattedData, null, 4), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Formatted data saved to formattedData.json');
    });
});