### LIRI

LIRI is a _Language_ Interpretation and Recognition Interface program which runs on the command line.  The program can run a number of different operations which make API requests through NPM modules or Request:

* Spotify (song information)
* Twitter (load latest tweets)
* OMDB API (movie information)
* Weather (weather for location)
* Geocode (geographic information)
* Google Books (book information)
* Giant Bomb (video game information)
* Breed Info (information on cat breeds)

The program can also run these operations through Macros defined in files.

When an operation or macro is run, it outputs to the console and to a log file "log.txt" in the _logs_ folder.

#### Spotify

Information can be retrieved on a song using the Spotify operation by entering this in the console:
```
node liri spotify-this-song "<song title>"
```
(Aliases for _spotify-this-song_ are _spotify_ and _song-info_)

If no song title is given, the song "Scatman" is used.
When the operation is run, it searches the Spotify database for the song title and some results are returned.  This is an example of one of the results returned from Spotify:
```
********************
Title: How Bizarre
Album: How Bizarre
Artist(s): OMC
Preview URL: null
```

#### Twitter

Tweets from an authorized account (in this case, @Kashistis) can be retrieved using the Twitter operation by entering this in the console:
```
node liri my-tweets <number>
```
(Aliases for _my-tweets_ are _get-tweets_ and _twitter_)

If no number is entered, the last up to 20 tweets are retrieved.  Otherwise, the maximum number of latest tweets are set by the number entered.  The tweets returned look like this:
```
--------------------
User @Kashistis
Thu Sep 28 02:26:42 +0000 2017
RT @kalpenn: How you can help hurricane victims in Puerto Rico https://t.co/zfo7iak5Os
```

#### OMDB API

Information can be retrieved on a movie using the OMDB operation by entering this in the console:
```
node liri movie-this "<movie title>"
```
(Aliases for _movie-this_ are _movie-info_ and _omdbapi_)

If no movie is entered, the movie "Jumanji" is used.  If movie information is found, it's returned.  It usually looks like this:
```
********************
Title: Silver Streak
Year: 1976
Country: USA
Language: English
Actors: Gene Wilder, Jill Clayburgh, Richard Pryor, Patrick McGoohan
Plot: On a long-distance train trip, a man finds romance but also finds himself in danger of being killed, or at least pushed off the train.
IMDB Rating: 6.9/10
Rotten Tomatoes: 83%
```

#### Weather

The current weather and next-day forecast for a location can be retrieved using the Weather operation by entering this in the console:
```
node liri weather-info "<location>"
```
(Aliases for _weather-info_ are _weather_ and _get-weather_)

If no location is entered, "Matawan, NJ" is used.  The current weather and next-day forecast for the location are returned and look like this:
```
********************
Location: Somerset, NJ
Current Temperature: 36 F
Weather: Mostly Cloudy
Wind: 1 mph Northeast
Humidity: 93
Tomorrow's Forecast: Low of 29F, High of 48F
```
(Note: Temperatures are listed in degrees Fahrenheit (F).)

#### Geocode

Geographical information can be retrieved for a location using the Geocode operation by entering this in the console:
```
node liri geocode-this "<location>"
```
(Aliases for _geocode-this_ are _location-info_ and _geocode_)

If no location is specified, "Matawan, NJ" is used. Some more specific geographical information is returned for the location which looks like this:
```
********************
Formatted Address: New Brunswick, NJ, USA
Geographic Coordinates:
 Latitude: 40.4862157
 Longitude: -74.4518188
```

#### Google Books

Book information can be retrieved for a particular book using the Google Books operation by entering this in the console:
```
node liri google-books "<bookName>"
```
(Aliases for _google-books_ are _book-info_ and _book-search_)

If no book is specified, "Fahrenheit 451" is used.  When it searches the Google Books API, some results are returned, one of which looks like this:
```
*********************
Title: Fahrenheit 451
Subtitle: Ray Bradbury
Author(s): Ray Bradbury
URL: https://books.google.com/books/about/Fahrenheit_451.html?hl=&id=nHWeS0buvG4C
```

#### Giant Bomb

Game information can be retrieved for a particular video game using the Giant Bomb operation by entering this in the console:
```
node liri giant-bomb "<gameName>"
```
(Aliases for _giant-bomb_ are _game-info_ and _game-search_)

If no game is specified, "Psychonauts" is used.  When it searches the Giant Bomb API, some results are returned, one of which looks like this:
```
*********************
Title: Psychonauts
Year: null
Platforms: Mac, PlayStation 2, Xbox, Xbox 360 Games Store, PlayStation Network (PS3), PC, PlayStation 4, Linux
URL: https://www.giantbomb.com/psychonauts/3030-2906/
```

#### Breed Info

Information can be retrieved for a particular cat breed using the Breed Info operation by entering this in the console:
```
node liri breed-info "<breedName>"
```
(Aliases for _breed-info_ are _cat-info_ and _breed-search_)

If no breed is specified, "Burmese" is used.  When it searches The Cats API, some information is returned, which looks like this:
```
********************
Burmese Info:
Burmese love being with people, playing with them, and keeping them entertained. They crave close physical contact and abhor an empty lap. They will follow their humans from room to room, and sleep in bed with them, preferably under the covers, cuddled as close as possible. At play, they will turn around to see if their human is watching and being entertained by their crazy antics.
```

#### Macros

One or more commands can be run through macros defined in external files by entering this in the console:
```
node liri do-what-it-says <filename>
```
(Aliases for do-what-it-says are _run-macro_ and _run-file_)

If no file is specified, it will look for a file named "random.txt".

If a file is found, the macro file will be run.
A macro file usually looks like this:
```
movie-this,"Sharknado"
spotify-this-song,"How Bizarre"
```
Each line is an operation. Before the first comma the operation to run is specified.  After that comma are the arguments to run the operation on.
As each line is read, the operation is run.

Note: At this time, aliases for the operations are not supported and macros cannot be run within other macros.

#### Running LIRI without additional parameters

LIRI can be run without additional parameters by entering this in the console:
```
node liri
```

A menu appears with the operations defined in the application (example below):
```
? Choose an operation:  (Use arrow keys)
> my-tweets
  spotify-this-song
  movie-this
  geocode-this
  weather-info
  google-books
  giant-bomb
  breed-info
  do-what-it-says

```

Once an operation is chosen, another prompt appears giving the user a chance to enter arguments to run for the operation. That operation is then run on the arguments entered.