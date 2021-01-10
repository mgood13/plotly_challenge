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
        mdata.forEach((participant)=>{
            if (userID == participant.id){
                var list = d3.select(".demographics");
                var keys = Object.keys(participant);
                var values = Object.values(participant);

                for (var i=0; i < keys.length; i++){
                    switch(i){
                        case 1:
                            var item = list.append('li');
                            var key = keys[i];
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
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.style("font-weight",700)
                            .text(key)
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 5:
                            var item = list.append('li');
                            item.style("font-weight",700)
                            .text("Belly Button Type")
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])
                        break;

                        case 6:
                            var item = list.append('li');
                            washFreq = values[i];
                            item.style("font-weight",700)
                            .text("Washing Frequency (Scrubs per week)")
                            .append("tspan")
                            .style("font-weight", 300)
                            .text(": " + values[i])

                        break;

                        default:
                            console.log('Skipping over ID')
                            d3.select(".demographics").selectAll('li').remove()





                    }
                };
            };
        });


        samples.forEach((sample) => {

            var templist = d3.select("#tempList");
            if(userID == sample.id) {
                var ids = sample.otu_ids.slice(0,10);
                var magnitudes = sample.sample_values.slice(0,10);
                var bactNames = sample.otu_labels.slice(0,10);
                var x_id = [];


                for (var i = 0; i< ids.length; i++){
                    x_id.push("OTU " + ids[i])
                };


                var data = [{
                x: magnitudes,
                y: x_id,
                type: "bar",
                orientation: 'h',
                text: bactNames
                }];

                var layout = {
                yaxis: {autorange: 'reversed'},
                title: 'Most Common Bacteria Strains'
                };

                Plotly.newPlot("bar", data,layout);



                var traceA = {
                type: "pie",
                showlegend: false,
                hole: 0.4,
                rotation: 90,
                values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
                text: ["0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7", "7-8","8-9",  ""],
                direction: "clockwise",
                textinfo: "text",
                textposition: "inside",
                marker: {
                colors: ["#fafaf5", "#e8ebd1", "#d3dcaf", "#c8d59e", "#aec87e","#92bb5f","#82b550","#60a832","#319b09", "white"]
                },
                labels: ["0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7", "7-8","8-9",  ""],
                hoverinfo: "label"
                };

                var givenPath = 'M 0.5 0.46 L 0.1 0.5 L 0.5 0.54 Z'

                console.log(washFreq)
                console.log(typeof washFreq)


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
                            type: 'circle',
                            x0: 0.45,
                            y0: 0.45,
                            x1: 0.55,
                            y1: 0.55,
                            fillcolor: '#73150C',
                            line: {width: 0}
                            },

                            {
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

                var ids = sample.otu_ids.slice(0,10);
                var magnitudes = sample.sample_values.slice(0,10);
                var bactNames = sample.otu_labels.slice(0,10);


                var bubbleTrace = {
                    x: sample.otu_ids,
                    y: sample.sample_values,
                    mode: 'markers',
                    marker: {
                    size: sample.sample_values,
                    color: sample.otu_ids
                    },
                    text: sample.otu_labels
                };

                var data = [bubbleTrace];
                console.log(data)

                var layout = {
                title: 'Bacteria Population Bubble Chart',
                showlegend: false,
                xaxis:{title:{text:'OTU Labels'}},
                yaxis:{title:{text:'Magnitude'}}
                };

                Plotly.newPlot("bubble", data, layout);



                return;



            };
        });



});







});