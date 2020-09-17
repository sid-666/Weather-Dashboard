    var currentweather = $("#todayweather")
    var Weeksweather = $("#weekforecast")
    // This is our API key. Add your own API key between the ""
    var APIKey = "e5d3d883d923c69ea77aa69a9e9734ab";
    var newSPI = "6261fa55f519561be7caea838a0ef085"
    var cityname;
    
    // Here we are building the URL we need to query the database
    var today = Currentdaydate();
    
    function Currentdaydate() {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
    function WeekDates() {
        var weekdates = new Date;
        var dd = weekdates.getDate();
        var mm = weekdates.getMonth() + 1;
        var yyyy = weekdates.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        return { dd, mm, yyyy };
    }
    function DashboardDisplay(response) {
        
        // Todays weather data
        var iconurl = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
        $("#wicon").attr("src", iconurl);
        currentweather.find("#cheader").text(`${cityname} ${today}`);
        var temperature = (response.daily[0].temp.day - 273.15) * 1.80 + 32;
        currentweather.find("#temp").text("Temperature:" + " " + temperature.toFixed(2) + "F");
        currentweather.find("#humid").text("Humidity:" + " " + response.daily[0].humidity);
        currentweather.find("#wspeed").text("Wind Speed:" + " " + response.daily[0].wind_speed + "km/h");
        currentweather.find("#uv").text("UV Index:" + " " + response.daily[0].uvi);
        // Weeks Forecast
        var { dd, mm, yyyy } = WeekDates();
        $(".WF").each(function (index, item) {
            dd++;
            weekday = mm + '/' + dd + '/' + yyyy;
            $(item).find("#ndate").text(weekday);
            $(item).find("#wicon").attr("src", "http://openweathermap.org/img/w/" + response.daily[index + 1].weather[0].icon + ".png");
            $(item).find("#tem").text("Temp:" + " " + ((response.daily[index + 1].temp.day - 273.15) * 1.80 + 32).toFixed(2) + "F");
            $(item).find("#hum").text("Humidity:" + " " + response.daily[index + 1].humidity);
        });
    }

    function createbutton(a, obj){
        var history = JSON.parse(localStorage.getItem("cities")) || []
        history.push({
            city: a,
            data: obj,
        })
        localStorage.setItem("cities", JSON.stringify(history))
        var histbtn = $("<button>")
        histbtn.text(history[history.length-1].city).attr("class", "historybtn")
        $("#sbtnarea").append(histbtn)
        histbtn.on("click", function(event){
            event.stopPropagation()
            console.log("Its Aight")
            for(var x = 0; x< history.length; x++ ){
                if(histbtn.text()== history[x].city){
                    console.log(history[x].city)
                    cityname = history[x].city
                    DashboardDisplay(history[x].data)
                }else{
                    null
                }
            }
        })
        
        
        // response = history[history.length - 1].data
        // histbtn.text(history[history.length - 1].city).attr("class", "historybtn")
        
    }
    $(document).ready(function(){
        if(localStorage.getItem("cities")){
            var currentdisplay = JSON.parse(localStorage.getItem("cities"))
            var n = currentdisplay[currentdisplay.length-1].city
            var r = currentdisplay[currentdisplay.length-1].data
            cityname = n
            DashboardDisplay(r)
            $("#sbtnarea").empty()
            for(var i = 0; i< currentdisplay.length; i++){
                var histbtn = $("<button>")
                histbtn.text(currentdisplay[i].city).attr("class", "historybtn")
                $("#sbtnarea").append(histbtn)
            }
        }
    })

  
    $("#searchbutton").click(function(){
        cityname = $(".input").val().trim()
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+newSPI
        // Creating new button
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(resp) {
              // Create CODE HERE to log the resulting object
            var latitude = resp.coord.lat
            var longitude = resp.coord.lon
            return $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourlydaily&appid="+ newSPI
            }).then(function(response){
                DashboardDisplay(response);
                createbutton(cityname, response);
                // only save the valid city names
            })
        })

    })




