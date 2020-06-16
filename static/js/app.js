d3.json("samples.json").then(function init(data){
    // console.log(data);
    // Testing Data Output
    var entries = Object.entries(data);
    console.log(entries)
    var sample_metadata = entries[1][1];
    console.log(sample_metadata);
    var sample_object_entries = entries[2][1];
    console.log(sample_object_entries);
    console.log(sample_object_entries[0].sample_values)
    console.log(sample_object_entries[0].otu_ids)
    var names_var = data.names;
    console.log(names_var);

    // Creating Dropdown Menu with Values from data.names
    Object.entries(names_var).forEach(([key,value])=>{
    d3.select("#selDataset").append("option").text(value)});

    // Slicing the top 10 from the sample_values
    var slicedData = sample_object_entries[0].sample_values.slice(0, 10);
    var slicedLabels = sample_object_entries[0].otu_ids.slice(0, 10);
    
    var reversedData = slicedData.reverse();
    // console.log(slicedData);
    // console.log(slicedLabels);
    
    var sliced_labels = slicedLabels.map(item=>`OTU ID:${item}`);
    // console.log(sliced_labels);

    var trace1 = {
        x: reversedData,
        y: sliced_labels,
        type: "bar",
        orientation: "h"
    }

    var data = [trace1];
    
    var layout = {
    height: 900,
    width: 900,
    };
    
      Plotly.newPlot("bar", data, layout);

      var trace2 = {
        x: sliced_labels,
        y: reversedData,
        mode: 'markers',
        // marker: {
        //   size: [reversedData.min, reversedData.max]
        // }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'Marker Size',
        showlegend: false,
        height: 900,
        width: 900
      };
      
      Plotly.newPlot('bubble', data2, layout2);

// Adding MetaData to Panel

var panel = d3.select("#sample-metadata");
var test_object = sample_metadata[0]
// console.log(sample_metadata[0]);
// console.log(Object.entries(sample_metadata[0]));
Object.entries(test_object).forEach(([key,value])=>{
    panel.append("p").text(`${key}:${value}`);
});



});

// d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged(selectedData){
    d3.json("samples.json").then(function (data){
    
    var entries = Object.entries(data);
    var sample_metadata = entries[1][1];
    var sample_object_entries = entries[2][1];
    var sample_ids = entries[0][1];
    console.log(selectedData);
    console.log(sample_object_entries);

    var i = 0;
    var panel = d3.select("#sample-metadata");
    panel.html("");
    var x = [];
    var y = [];

    sample_ids.forEach((value)=>{
        if (value === selectedData){
            // console.log(i);
            // Use i to slice entries and get all the data wanted in the panel
            // append data to the panel
            var test_object = sample_metadata[i];
            Object.entries(test_object).forEach(([key,value])=>{
                panel.append("p").text(`${key}:${value}`);
    
            });
        }

        

            
            i = i+1;
    
        });
    sample_object_entries.forEach((object)=>{
    // console.log(value);
        if (object.id === selectedData){
            // succesfully pulled correct object from the samples dictionary
            console.log(object);
            // successfully returned the correct id from dropdown menu
            console.log(selectedData);
            new_x = object.sample_values.slice(0,10);
            console.log(new_x);
            new_y = object.otu_ids.slice(0,10);
            console.log(new_y);
            var sliced_labels = new_y.map(item=>`OTU ID:${item}`)
            var trace1 = {
                x: new_x,
                y: sliced_labels,
                type: "bar",
                orientation: "h"
            }
        
            var data = [trace1];
            
            var layout = {
            height: 900,
            width: 900,
            };
            
              Plotly.newPlot("bar", data, layout);

    };
    // updatePlotly(x,y);    
    });
    });
    };
// function updatePlotly(x,y){
//     Plotly.restyle("bar", trace1.x,trace1,y,[new_data]);
// };     
    // if (dataset == '941'){
    //     var panel = d3.select("#sample-metadata");
    //     var test_object = sample_metadata[1];
    //     panel.html("");
    //     Object.entries(test_object).forEach(([key,value])=>{
    //         panel.append("p").text(`${key}:${value}`);

        // if (dataset == sample_ids[1]){
        // var panel = d3.select("#sample-metadata");
        // var test_object = sample_metadata[1];
        // panel.html("");
        // Object.entries(test_object).forEach(([key,value])=>{
        //     panel.append("p").text(`${key}:${value}`);
    
            // var bar = d3.select("bar");
    // });
    
    // Plotly.restyle("bar")
    // console.log(sample_object_entries);
    // var bar = d3.select("bar");

    // Inside names_var: you have an id, nothing else
    // Inside samples_var: you have otu_id's , sample_values, otu_labels
    // Inside metadata_var: you have information about patient (ethnicity, gender, age, location)