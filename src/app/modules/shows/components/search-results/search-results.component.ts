import { Component, Input, OnInit } from '@angular/core';
import { searchResult } from 'src/app/models/search-result.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() results: searchResult[] | null = [];
//   public testData = [
//     {
//         Title: "Absolute Power",
//         Year: "1997",
//         imdbID: "tt0118548",
//         Type: "movie",
//         Poster: "https://m.media-amazon.com/images/M/MV5BNDFlNTZmOGYtYmE0ZC00OTE4LWI5YzctNmZmZDU3M2ZiMmI4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
//     },
//     {
//       Title: "Absolutely Anything",
//       Year: "2015",
//       imdbID: "tt1727770",
//       Type: "movie",
//       Poster: "https://m.media-amazon.com/images/M/MV5BMjMxNTQ1NDgyOF5BMl5BanBnXkFtZTgwMjMxNjU0NjE@._V1_SX300.jpg"
//     },
//     {
//       Title: "Absolutely something",
//       Year: "2015",
//       imdbID: "tt1727770",
//       Type: "movie",
//       Poster: "https://m.media-amazon.com/images/M/MV5BMjMxNTQ1NDgyOF5BMl5BanBnXkFtZTgwMjMxNjU0NjE@._V1_SX300.jpg"
//     },
//     {
//       Title: "Absolutely bla",
//       Year: "2015",
//       imdbID: "tt1727770",
//       Type: "movie",
//       Poster: "https://m.media-amazon.com/images/M/MV5BMjMxNTQ1NDgyOF5BMl5BanBnXkFtZTgwMjMxNjU0NjE@._V1_SX300.jpg"
//     }
// ];

ngOnInit(): void {
    console.log('results', this.results)
}

}
