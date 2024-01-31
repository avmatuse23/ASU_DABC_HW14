// 1.	Use the D3 library to read in samples.json from the URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init() {
// Create Test Subject ID No dropdown menu
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  // Create a list of Test Subjects IDs
  test_subject_id_list = data.names;
  console.log(test_subject_id_list);

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Append each Test Subject ID to an array
  test_subject_id_list.forEach((id) => {
    dropdownMenu.append("option").text(id).property("value",id);
  });

  // Call the function to update the webpage with default plot
  plotsUpdate();

});
}

// On change to the Test Subject ID number call plots_update()
d3.selectAll("#selDataset").on("change", plotsUpdate);

function plotsUpdate() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a var
  let sample_id_selected = dropdownMenu.property("value");
// ??? Need to create a wrap up function for sample_id input

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

// Find index of dropdownmenue selected value
  let index = data.names.indexOf(sample_id_selected);

  // 2.	Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  // Create arrays for bar chart
  let sample_values = Object.values(data.samples[index].sample_values.slice(0,10).reverse());
  let sample_otu_id = Object.values(data.samples[index].otu_ids.slice(0,10).reverse());
  let sample_labels = Object.values(data.samples[index].otu_labels.slice(0,10).reverse());
  console.log(sample_values);
  console.log(sample_otu_id);
  console.log(sample_labels);

  // Create an array of strings for sample values 
  let sample_otu_id_labels = sample_otu_id.map((item, index) => `OTU ${sample_otu_id[index]}`);
  console.log(sample_otu_id_labels);

  // Trace for bar chart
  let trace1 = {
    x: sample_values,
    y: sample_otu_id_labels,
    text: sample_labels,
    name: "OTU",
    type: "bar",
    orientation: "h"
  };

  // Data array
  let data_bar = [trace1];

  // Apply a tittie to the layout
  let layout = {
    title: "10 OTUs found in that Individual",
    margine: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", data_bar, layout);

  // ????  How to do drop down menu  ????

  // 3.	Create a bubble chart that displays each sample.
  //  Use otu_ids for the x values.
  // Use sample_values for the y values.
  // Use sample_values for the marker size.
  // Use otu_ids for the marker colors.
  // Use otu_labels for the text values.

    // Create arrays for bubble chart
    let sample_values_b = Object.values(data.samples[index].sample_values);
    let sample_otu_id_b= Object.values(data.samples[index].otu_ids);
    let sample_labels_b = Object.values(data.samples[index].otu_labels);
    console.log(sample_values_b);
    console.log(sample_otu_id_b);
    console.log(sample_labels_b);

    // Trace for bubble chart
    let trace2 = {
      x: sample_otu_id_b,
      y: sample_values_b,
      text: sample_labels,
      mode: 'markers',
      marker: {
        size: sample_values_b,
        color: sample_otu_id_b,
        colorscale: 'Earth'
      }
    };
  
    // Data array
    let data_bubble = [trace2];
  
    // Apply a tittie to the layout
    let layout2 = {
      title: "Samples",
      height: 600,
      width: 600
    };
  
  // Render the plot to the div tag with id "bubble"
     Plotly.newPlot("bubble", data_bubble, layout2);

  // 4.	Display the sample metadata, i.e., an individual's demographic information.
  // ??? Don't understand the question. Is it the same as question 5 ??? 

  // 5.	Display each key-value pair from the metadata JSON object somewhere on the page.
  // Create arrays for Demographic Info
  let metadata = data.metadata[index];
  console.log(metadata);

  // Clear "sample-metadata" div from previous metatadata 
  d3.select("#sample-metadata").html(""); 

  // Find values for each metadata entery
  let id = metadata.id;
  console.log(metadata.id);
  let ethnicity = metadata.ethnicity;
  let gender = metadata.gender;
  let age = metadata.age;
  let location = metadata.location;
  let bbtype = metadata.bbtype;
  let wfreq = metadata.wfreq;

  // Display each key-value pair from the metadata
  d3.select("#sample-metadata").append("h3").text(`id: ${id}`); 
  d3.select("#sample-metadata").append("h3").text(`ethnicity: ${ethnicity}`);
  d3.select("#sample-metadata").append("h3").text(`gender: ${gender}`); 
  d3.select("#sample-metadata").append("h3").text(`age: ${age}`); 
  d3.select("#sample-metadata").append("h3").text(`location: ${location}`); 
  d3.select("#sample-metadata").append("h3").text(`bbtype: ${bbtype}`); 
  d3.select("#sample-metadata").append("h3").text(`wfreq: ${wfreq}`); 

});
}

// Call the function
init();