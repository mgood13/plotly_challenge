var titleInit = d3.select("#userID");
var temptitle = titleInit.text();
titleInit.text(temptitle + " ---")
console.log('test')

d3.json("samples.json").then((sampleData) => {
    var names = sampleData.names;
    var mdata = sampleData.metadata;
    var samples = sampleData.samples;

    var select = d3.select("#selDataset");
    var firstElement = select.append("option")
    firstElement.text('---')

    names.forEach((dataID)=>{
        var element = select.append("option");
        element.text(dataID);
    });
console.log("what about here")


    select.on('change', function() {
    d3.select("#tempList").selectAll('li').remove()
        var titletag = d3.select("#userID");
        var temp = titletag.text().split(' ');
        temp.pop();
        temp = temp.join(" ")
        var userID = this.value
        if (userID == '---') {
        return;

        };
        titletag.text(temp + " " +  userID)

        console.log("anything?")
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
                            item.text(key + ": " + values[i])
                        break;

                        case 2:
                            var item = list.append('li');
                            var key = keys[i];
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.text(key + ": " + values[i])
                        break;

                        case 3:
                            var item = list.append('li');
                            var key = keys[i];
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.text(key + ": " + values[i])
                        break;

                        case 4:
                            var item = list.append('li');
                            var key = keys[i];
                            key = key.charAt(0).toUpperCase() + key.slice(1);
                            item.text(key + ": " + values[i])
                        break;

                        case 5:
                            var item = list.append('li');
                            item.text("Belly Button Type: " + values[i])
                        break;

                        case 6:
                            var item = list.append('li');
                            item.text("Washing Frequency (Scrubs per week): " + values[i])

                        break;

                        default:
                            console.log('Skipping over ID')
                            d3.select(".demographics").selectAll('li').remove()





                    }
                };
            };
        });

        console.log('print this')
        samples.forEach((sample) => {

            var templist = d3.select("#tempList");
            console.log('HERE')
            if(userID == sample.id) {
                var ids = sample.otu_ids.slice(0,10);
                var magnitudes = sample.sample_values.slice(0,10);
                var bactNames = sample.otu_labels.slice(0,10);
                console.log("HELLO:" + magnitudes)

                var data = [{
                values: magnitudes,
                labels: ids,
                type: "bar"
                }];

                var layout = {
                height: 600,
                width: 800
                };

                Plotly.newPlot("bar", data,layout);



                /*
                for (var j=0; j < ids.length; j++){
                    var post = templist.append('li');
                    post.text("ID: " + ids[j] + " Value: " + magnitudes[j] + " Name: " + bactNames[j])

                };
                */
            };
        });


});







});