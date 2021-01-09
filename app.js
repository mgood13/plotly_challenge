d3.json("samples.json").then((sampleData) => {
    var names = sampleData.names;
    var mdata = sampleData.metadata;
    var samples = sampleData.samples;

    var select = d3.select("#selDataset");

    names.forEach((dataID)=>{
        var element = select.append("option");
        element.text(dataID)
    });









});