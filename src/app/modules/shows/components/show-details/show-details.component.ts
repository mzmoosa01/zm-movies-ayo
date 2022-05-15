import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  public testData = `{
    "Title": "Absolutely Anything",
    "Year": "2015",
    "Rated": "R",
    "Released": "12 May 2017",
    "Runtime": "85 min",
    "Genre": "Comedy, Sci-Fi",
    "Director": "Terry Jones",
    "Writer": "Terry Jones, Gavin Scott, Douglas Adams",
    "Actors": "Simon Pegg, Kate Beckinsale, Sanjeev Bhaskar",
    "Plot": "Some aliens, who travel from planet to planet to see what kind of species inhabit them, come to Earth. And if humans are, according to their standards, decent, they are welcomed to be their friend. And if not, the planet is destroyed. To find out, they choose one inhabitant and give that person the power to do whatever he or she wants. And they choose Neil Clarke (Simon Pegg), a teacher who teaches the special kids. He is constantly being berated by the headmaster and is attracted to his neighbor, Catherine (Kate Beckinsale), but doesn't have the guts to approach her. But now he can do anything he wants, but has to be careful.",
    "Language": "English, French",
    "Country": "United Kingdom",
    "Awards": "1 nomination",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNTQ1NDgyOF5BMl5BanBnXkFtZTgwMjMxNjU0NjE@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "5.9/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "20%"
        },
        {
            "Source": "Metacritic",
            "Value": "31/100"
        }
    ],
    "Metascore": "31",
    "imdbRating": "5.9",
    "imdbVotes": "42,445",
    "imdbID": "tt1727770",
    "Type": "movie",
    "DVD": "19 Apr 2016",
    "BoxOffice": "$20,169",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}`

@Input() public selectedShow; 
public genres: string[] = [];

  constructor() { 
    this.selectedShow = JSON.parse(this.testData)
  }

  ngOnInit(): void {
    this.genres = this.selectedShow.Genre.trim().split(',');
  }

}
