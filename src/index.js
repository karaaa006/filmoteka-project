import './sass/main.scss';
const API_KEY = `c4da2d26df740b651b6bb4b7cba32696`;
fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=uk-UK&page=1&include_adult=false&query=dog`,
)
  .then(d => d.json())
  .then(d => console.log(d));
