// ** D3 fetch to read the JSON file **//
function buildData(sample) {    
    d3.json("samples.json").then((data) => {
        console.log(data)
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        
        //**Chart div for #sample-metadata in index.html page**//
        var CHART = d3.select("#sample-metadata");

        //**Clear html Chart**// 
        CHART.html("");

        //**Object entries**//
        Object.entries(result).forEach(([key, value]) => {
            CHART.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

  function buildCharts(sample){
//** Data of interest **/
    d3.json('samples.json').then((data) =>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
//** Organizing data in variables **/
        var otu_ids= result.otu_ids;
        var otu_labels = result.out_labels;
        var sample_values = result.sample_values;

        //** Buuble chart **//

        var bubbleLayout = {
            title: "Bacterias per Sample",
            margin: { t: 0},
            xaxis: { 
                title: "OTU ID"
            },
            margin: {t: 30}

        };

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'magma'  
                    } 
            }
        ];

        
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    

        //** Bar chart**//
        var yvalues = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                y: yvalues,
                x: sample_values.slice(0, 10).reverse(),
                type:"bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacterias",
            margin: { t:30, l:159}
        };

        Plotly.newPlot("bar", barData, barLayout);
    });
}

function dataGrab() {
//** Function that uses the name of data to use in other functions **/
    var link = d3.select("#selDataset");

    d3.json("samples.json").then((data)=>{

    names = data.names;

    names.forEach((name)=>{
        link.append("option")
        .text(name)
        .property("value", name);
    });

    var bgn = names[0];
    buildData(bgn);
    buildCharts(bgn);
});

}
function optionChanged(otherOption) {
    buildData(otherOption);
    buildCharts(otherOption);
}
dataGrab();