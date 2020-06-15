d3.json("samples.json").then(function test(data){
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
    console.log(slicedData);
    console.log(slicedLabels);
    var sliced_labels = slicedLabels.map(item=>`OTU ID:${item}`);
    console.log(sliced_labels);

    var trace1 = {
        x: reversedData,
        y: sliced_labels,
        type: "bar",
        orientation: "h"
    }

    var data = [trace1];
    
    var layout = {
    height: 1000,
    width: 1000,
    };
    
      Plotly.newPlot("bar", data, layout);

// Adding MetaData to Panel

var panel = d3.select("#sample-metadata");
var test_object = sample_metadata[0]
// console.log(sample_metadata[0]);
// console.log(Object.entries(sample_metadata[0]));
Object.entries(test_object).forEach(([key,value])=>{
    panel.append("p").text(`${key}:${value}`);
});


});


    // Inside names_var: you have an id, nothing else
    // Inside samples_var: you have otu_id's , sample_values, otu_labels
    // Inside metadata_var: you have information about patient (ethnicity, gender, age, location)