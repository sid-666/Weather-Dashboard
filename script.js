    var currentweather = $("#todayweather")
    var Weeksweather = $("#weekforecast")
    // This is our API key. Add your own API key between the ""
    var APIKey = "e5d3d883d923c69ea77aa69a9e9734ab";
    var newSPI = "6261fa55f519561be7caea838a0ef085"
    var cityname;
    // Here we are building the URL we need to query the database
    var today = new Date();
    var dd = today.getDate();
    

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
    dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'/'+dd+'/'+yyyy;
    

    $("#searchbutton").click(function(){
        cityname = $(".input").val().trim()
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+newSPI
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              // Create CODE HERE to log the resulting object
            console.log(response)
            var latitude = response.coord.lat
            var longitude = response.coord.lon
            return $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourlydaily&appid="+ newSPI
            }).then(function(response){
                console.log(41)
                // Todays weather data
                var iconurl = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png"
                 $("#wicon").attr("src", iconurl)
                currentweather.find("#cheader").text(`${cityname} ${today}`)
                var temperature = (response.daily[0].temp.day - 273.15) * 1.80 + 32;
                currentweather.find("#temp").text("Temperature:" + " "+ temperature + "F")
                // only save the valid city names
                // var history = JSON.parse(localStorage.getItem("cities")) || []
                // history.push(cityname)
                // localStorage.setItem("cities", JSON.stringify(history))
            })
        })

    })