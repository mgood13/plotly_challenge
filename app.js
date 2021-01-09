var titleInit = d3.select("#userID");
var temptitle = titleInit.text();
titleInit.text(temptitle + " 940")

d3.json("samples.json").then((sampleData) => {
    var names = sampleData.names;
    var mdata = sampleData.metadata;
    var samples = sampleData.samples;

    var select = d3.select("#selDataset");

    names.forEach((dataID)=>{
        var element = select.append("option");
        element.text(dataID);
    });



    select.on('change', function() {
        var titletag = d3.select("#userID");
        var temp = titletag.text().split(' ');
        temp.pop();
        temp = temp.join(" ")
        titletag.text(temp + " " +  this.value)
});







});