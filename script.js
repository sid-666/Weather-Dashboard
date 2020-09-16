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
        localStorage.setItem("cityname",$(".input").val().trim());
        cityname = localStorage.getItem("cityname")
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
                console.log(response)
            })
        })

    })