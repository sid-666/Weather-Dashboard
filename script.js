    // grabbing elements where response data will be displayed in a variable
    var currentweather = $("#todayweather")
    var Weeksweather = $("#weekforecast")
    // API key
    var APIKey = "6261fa55f519561be7caea838a0ef085"
    var cityname;
    
    // Storing date function in a variable
    var today = Currentdaydate();
    // Function that converts date (todays date) into a mm/dd/yyyy format
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
    //Function that converts dates of the week into mm/dd/yyyy format
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
    //Function that displays API response in dashboard display
    function DashboardDisplay(response) {
        // Todays weather data
        var iconurl = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
        $("#wicon").attr("src", iconurl);
        currentweather.find("#cheader").text(`${cityname} ${today}`);
        var temperature = (response.daily[0].temp.day - 273.15) * 1.80 + 32;
        currentweather.find("#temp").text("Temperature:" + " " + temperature.toFixed(2) + "F");
        currentweather.find("#humid").text("Humidity:" + " " + response.daily[0].humidity);
        currentweather.find("#wspeed").text("Wind Speed:" + " " + response.daily[0].wind_speed + "km/h");
        currentweather.find("#uvval").text( response.daily[0].uvi);
        var uvcolor = currentweather.find("#uvval").text( response.daily[0].uvi);
        if(response.daily[0].uvi > 6.){
            uvcolor.css("background-color", "red")
        }else if (response.daily[0].uvi < 3){
            uvcolor.css("background-color", "green")
        }else{
            uvcolor.css("background-color", "yellow")
        }    
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
    // Sets and gets value from local storage and creates search history button with value from local storage (city name)
    function createbutton(a, obj){
        //storing and retrieving data from local storage
        var history = JSON.parse(localStorage.getItem("cities")) || []
        history.push({
            city: a,
            data: obj,
        })
        localStorage.setItem("cities", JSON.stringify(history))
        //creating buttons
        var histbtn = $("<button>")
        histbtn.text(history[history.length-1].city).attr("class", "historybtn")
        $("#sbtnarea").append(histbtn)
        // click event for history buttons
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
        
        
        
    }
    // When document is ready the dashboard should be polluted with information from local storage
    $(document).ready(function(){
        if(localStorage.getItem("cities")){
            var currentdisplay = JSON.parse(localStorage.getItem("cities"))
            var n = currentdisplay[currentdisplay.length-1].city
            var r = currentdisplay[currentdisplay.length-1].data
            cityname = n
            DashboardDisplay(r)
            $("#sbtnarea").empty();
            console.log("LS DATA", currentdisplay);
            for(var i = 0; i< currentdisplay.length; i++){
                var histbtn = $("<button>")
                histbtn.text(currentdisplay[i].city).attr("class", "historybtn")
                histbtn.on("click", function(event){
                    for(var x = 0; x< currentdisplay.length; x++ ){
                        console.log(currentdisplay[x].city);
                        if($(event.currentTarget).text()== currentdisplay[x].city){
                            cityname = currentdisplay[x].city
                            DashboardDisplay(currentdisplay[x].data)
                        }
                    }
                })
                $("#sbtnarea").append(histbtn)
            }
        }
    })

    // Click event for search button which takes input valu from form and builds upon queryurl
    $("#searchbutton").click(function(){
        cityname = $(".input").val().trim()
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+APIKey
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(resp) {
            // grabs lat and lon from first API call and is used to build the url for the second API call
            var latitude = resp.coord.lat
            var longitude = resp.coord.lon
            return $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=minutely,hourlydaily&appid="+ APIKey
            }).then(function(response){
                // Dashboard display and create button function are called
                DashboardDisplay(response);
                createbutton(cityname, response);
                
            })
        })

    })




