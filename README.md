# Weather Dashboard Description
## Description
* At its basic essence the application is meant to allow a user to search a city's name and get weather information in a clear, visually appealing, and understandable format (dashboard)
* The users input into the form essentially builds a url for an api request, which will grab information from another application and bring it to us in a JSON format, that can then allow for easier use and display of information.
## Criteria and Solution
*   WHEN I search for a city, THEN I am presented with current and future conditions for that city and that city is added to the search history 

* * A click event which called a display function, whcih had to be utilized to display API response object information into different elements in the html as text. Click event also called a create button event which appended a button in a div container for search history

* WHEN I view current weather conditions for that city, THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

* * To accomplish this two different API calls had to be made, in which one API call had to be used to to 
retrieve information that can be used to build the query for the second API call. The response object from that API call was then parsed into the display function, which looked through all the information in the object, and took out the essential ones and presented them in the div element for the current weather.

* WHEN I view the UV index, THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

* * The UV index value was placed in mark tag, which was embeded in a p tag. If statements were used in the display function to verify whether the UV index value was favorable, moderate, or severe, and accordingly the background-color of the text in the mark tag changed from greed, yellow and red.

* WHEN I view future weather conditions for that city, THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

* * Within the Display function a for each function was utilized to post and display the icon (img tag)
the temperature and the humdidity. The date was done seperately through a new Date function, which was parsed into another function to format it into a mm/dd/yyyy format, and then displayed into the the divs. Grid format was used and the 5 day forecast showed day 1 to day 5 in divs layed out in 5 columns.

* WHEN I click on a city in the search history, THEN I am again presented with current and future conditions for that city

* * Within the create button function, which creates search history buttons and appends them to a search history area div, also contains a click event, which triggers a function which loops through the array stored in local storage finding the object element property "city" and checking whether the text on the button matches the value of the city property. If so then the data property value of that object element (which is the stored object from API call) will be parsed into the the Display function.

* WHEN I open the weather dashboard, THEN I am presented with the last searched city forecast

* * JQuery ready function was used to pollute the page with information from local storage, if there was stored data in local storage

# # Image

