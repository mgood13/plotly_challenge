// Initialize some variables that we will want to use later on, these are our global variables
var titleInit = d3.select("#userID");
var temptitle = titleInit.text();
var washFreq;

// Place a blank in the header in the panel containing the dropdown
titleInit.text(temptitle + " ---")

// Grab our data from the file THEN run everything else
d3.json("samples.json").then((sampleData) => {

    // Withdraw all of our data from the file for use in subsequent functions
    var names = sampleData.names;
    var mdata = sampleData.metadata;
    var samples = sampleData.samples;

    // Select our option and place a --- as the first item
    var select = d3.select("#selDataset");
    var firstElement = select.append("option")
    firstElement.text('---')

    //Loop through our names array and place an option in the dropdown for each of the IDs
    // Call the current name 'dataID'
    names.forEach((dataID)=>{
        var element = select.append("option");
        element.text(dataID);
    });


    // Run this code when a user makes a dropdown selection
    select.on('change', function() {

        // Take the title from the header and separate it out so that we can add our ID there
        var titletag = d3.select("#userID");
        var temp = titletag.text().split(' ');
        // This tosses out the old ID when we make a different selection. Without this you would get an increasing
        // list of IDs that you've previously selected.
        temp.pop();

        // Put the array back together
        temp = temp.join(" ")

        // Grab the user ID
        // This item controls most of the rest of the code because it drives all of the plots
        // this.value simply grabs the value property of the dropdown which is equal to the ID selected
        var userID = this.value

        // If the item selected is the --- then nothing happens
        if (userID == '---') {
        return;
        };
        // Add the user id to the title of the panel
        titletag.text(temp + " " +  userID)

        // This function populates the demographics table
        // Call the particular data associated with the ID 'patient'
        mdata.forEach((participant)=>{

            // Loop through the metadata object and find the data to match the participant
            if (userID == participant.id){

                // Select the list object in this panel
                var list = d3.select(".demographics");

                // Extract all of the data for the keys and values for this user
                var keys = Object.keys(participant);
                var values = Object.values(participant);

                // This loop is used to iterate through the arrays above
                for (var i=0; i < keys.length; i++){

                    // This switch statement controls the formatting for all the different elements
                    switch(i){
                        case 1:
                            var item = list.append('li');
                            var key = keys[i];

                            // This strange combination of commands makes the font bold for the key and then switches back to un bold
                            // for the key. This improves readability in the absence of bullet points.
                            // (Trust me it's ugly without the bolding)
                            // Otherwise this basically just capitalizes the first letter of the key
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.style("font-weight",700)
                            .text(key)
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 2:
                            var item = list.append('li');
                            var key = keys[i];

                            // Exact same as above, capitalize the first letter and bold the key
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.style("font-weight",700)
                            .text(key)
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 3:
                            var item = list.append('li');
                            var key = keys[i];

                            // Exact same as above, capitalize the first letter and bold the key
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.style("font-weight",700)
                            .text(key)
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 4:
                            var item = list.append('li');
                            var key = keys[i];

                            // Exact same as above, capitalize the first letter and bold the key
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.style("font-weight",700)
                            .text(key)
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 5:
                            var item = list.append('li');

                            // This item is different because the true key is: 'bbtype' which, in context makes sense but is mostly
                            // just vague. So we wrote it explicitly instead.
                            item.style("font-weight",700)
                            .text("Belly Button Type")
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 6:
                            var item = list.append('li');

                            // Save wash frequency for later
                            // We can use it outside this loop because we're editing a global variable.
                            washFreq = values[i];

                            // Similar to the previous we made the abbreviated key explicit
                            item.style("font-weight",700)
                            .text("Washing Frequency (Scrubs per week)")
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])

                        break;

                        default:
                            // The loop will include the id as the first item. This skips that value and clears the list for the next ID.
                            console.log('Skipping over ID')
                            d3.select(".demographics").selectAll('li').remove()

                    }
                };
            };
        });


        samples.forEach((sample) => {

            // Similar to before we loop through until we find the proper user
            if(userID == sample.id) {

                // We only want the first 10 data points from each of these arrays.
                var ids = sample.otu_ids.slice(0,10);
                var magnitudes = sample.sample_values.slice(0,10);
                var bactNames = sample.otu_labels.slice(0,10);

                // Variable for our modified strings
                var x_id = [];

                // Modify the id values from numbers to strings. By making them strings the plots become much cleaner.
                // Now the vertical axis is an ordered list of names instead of Plotly trying to place the IDs as meaningful values on
                // the vertical axis
                for (var i = 0; i< ids.length; i++){
                    x_id.push("OTU " + ids[i])
                };

                // The data is just the magnitude recorded for each of the 10 samples labelled by their ID from above.
                // the 'h' modifier shifts from a vertical bar chart to a horizontal one
                var data = [{
                x: magnitudes,
                y: x_id,
                type: "bar",
                orientation: 'h',
                text: bactNames
                }];

                // This titles the plot and then also reorders the values. This orders the chart from top to bottom which
                // is cleaner looking
                var layout = {
                yaxis: {autorange: 'reversed'},
                title: 'Most Common Bacteria Strains'
                };

                // Generate the plot
                Plotly.newPlot("bar", data,layout);


                // Create the plot for our wash frequency diagram
                var traceA = {

                // This is actually a normal pie chart with the middle cut out of it
                type: "pie",
                showlegend: false,

                // This dictates how large the doughnut hole is
                hole: 0.4,

                // Need to rotate the plot so that it covers the top of the circle not the side
                rotation: 90,

                // Separate out the slices
                values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],

                // Set the text for each slice
                text: ["0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7", "7-8","8-9",  ""],

                // Order them clockwise around the circle
                direction: "clockwise",

                // Make the text labels and place them inside the slices
                textinfo: "text",
                textposition: "inside",

                // Set the colors in a nice gradient
                // Thank you Gradient Generator: https://colordesigner.io/gradient-generator
                marker: {
                colors: ["#fafaf5", "#e8ebd1", "#d3dcaf", "#c8d59e", "#aec87e","#92bb5f","#82b550","#60a832","#319b09", "white"]
                },

                // Set the hover text
                labels: ["0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7", "7-8","8-9",  ""],
                hoverinfo: "label"
                };

                // The needle for our dial indicator needs to be drawn with a custom triangle. This is the default location which
                // is when the answer is 0 or null (yes one of the responses is actually null). It places the arrow at the far left.
                var givenPath = 'M 0.5 0.46 L 0.1 0.5 L 0.5 0.54 Z'

                /* This statement lays out the different cases for the triangle position. In fact there are only 4 specific cases.
                1. 0
                2. 1-4
                3. 5-8
                4. 9
                I'm sure I could have reduced this if I wanted to work out the math but this makes it easiest for my thought process.
                The position of the point of the needle is the easiest to evaluate since it's a simple trig equation using the triangle
                height of 0.4. For example: y = 0.4 * Math.sin(radians). The other corners of the triangle which reside inside of the
                central circle were more difficult. Luckily they're mathematically proportional to the values of the point. Then for each
                of these cases you add or subtract the x and y values from the center point of (0.5,0.5). This creates a triangle that rotates
                around the center to show a moving dial based upon wash frequency.
                */
                if (washFreq > 0 && washFreq <= 4){
                    var angle = 20 * washFreq;
                    var radians = angle * Math.PI/180;

                    var y = 0.4 * Math.sin(radians);
                    var x = 0.4 * Math.cos(radians);

                    var pointX = 0.5 - x;
                    var pointY = 0.5 + y;

                    var sX = y/10;
                    var sY = x/10;

                    var x1 = 0.5 + sX;
                    var y1 = 0.5 + sY;

                    var x2 = 0.5 - sX;
                    var y2 = 0.5 - sY;

                    givenPath = `M ${x1} ${y1} L ${pointX} ${pointY} L ${x2} ${y2}`

                }
                else if (washFreq > 4 && washFreq < 9) {
                    var angle = 20 * (9-washFreq);
                    var radians = angle * Math.PI/180;

                    var y = 0.4 * Math.sin(radians);
                    var x = 0.4 * Math.cos(radians);

                    var pointX = 0.5 + x;
                    var pointY = 0.5 + y;

                    var sX = y/10;
                    var sY = x/10;

                    var x1 = 0.5 + sX;
                    var y1 = 0.5 - sY;

                    var x2 = 0.5 - sX;
                    var y2 = 0.5 + sY;

                    givenPath = `M ${x1} ${y1} L ${pointX} ${pointY} L ${x2} ${y2}`

                }
                else if (washFreq == 0 || washFreq == null){
                    givenPath = 'M 0.5 0.46 L 0.1 0.5 L 0.5 0.54 Z'
                }
                else {
                    givenPath ='M 0.5 0.46 L 0.9 0.5 L 0.5 0.54 Z'
                };

                var layout={
                shapes: [
                            {
                            // Place the central circle at the center which is (0.5, 0.5)
                            type: 'circle',
                            x0: 0.45,
                            y0: 0.45,
                            x1: 0.55,
                            y1: 0.55,
                            fillcolor: '#73150C',
                            line: {width: 0}
                            },

                            {
                            // This path is for the triangle as described above
                            type:'path',
                            path: givenPath,
                            fillcolor: '#73150C',
                            line: {width: 0}
                            }
                        ],
                        title: {text:'Washing Frequency'}
                            }

                var data = [traceA];
                Plotly.newPlot("gauge", data,layout);

                // This creates the bubble plot at the bottom of the page
                var bubbleTrace = {

                    // The position of the bubbles are based upon ID and the number of that particular bacteria detected.
                    x: sample.otu_ids,
                    y: sample.sample_values,
                    mode: 'markers',
                    marker: {

                    // Set the size and color of the bubbles based upon their position on the graph
                    size: sample.sample_values,
                    color: sample.otu_ids
                    },
                    text: sample.otu_labels
                };

                var data = [bubbleTrace];

                // Label the bubble plot
                var layout = {
                title: 'Bacteria Population Bubble Chart',
                showlegend: false,
                xaxis:{title:{text:'OTU Labels'}},
                yaxis:{title:{text:'Number of Cultures Observed'}}
                };

                // Generate the plot
                Plotly.newPlot("bubble", data, layout);

                return;

            };
        });

});

});