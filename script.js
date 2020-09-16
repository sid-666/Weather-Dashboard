    // This is our API key. Add your own API key between the ""
    var APIKey = "6261fa55f519561be7caea838a0ef085";
    var cityname = $("input").val().trim()

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
  
        // Create CODE HERE to Log the queryURL
        console.log(queryURL)
        // Create CODE HERE to log the resulting object
        console.log(response)
        // Create CODE HERE to calculate the temperature (converted from Kelvin)
  
        // Create CODE HERE to transfer content to HTML
        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        // Create CODE HERE to dump the temperature content into HTML
  
      });