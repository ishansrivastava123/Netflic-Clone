import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

const apiKey = "803550a2dcc2ee74aad8df2a58ffbb14"
const url = "https://api.themoviedb.org/3"
const lang = "&language=en-US"
const imgUrl = "https://image.tmdb.org/t/p/original/"
const upcoming = "upcoming"
const popular = "popular"
const now_playing = "now_playing"
const top_rated = "top_rated"

const Card = ({img}) => <img className="card" src={img} alt="cover" />

const Row = ({title, arr=[]}) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}${item.poster_path}`} />
          ))
        }
    </div>
  </div>
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [num, setNum] = useState(0);

  function randNum() {
    return Math.floor(Math.random() * (20));
  }
  
  useEffect(() => {
    
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}${lang}`)
      setPopularMovies(results);
    }

    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}${lang}`)
      setUpcomingMovies(results);
    }

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${now_playing}?api_key=${apiKey}${lang}`)
      setNowPlayingMovies(results);
    }

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${top_rated}?api_key=${apiKey}${lang}`)
      setTopRatedMovies(results);
    }

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}${lang}`)
      setGenre(genres)
    }
    
    fetchUpcoming();
    fetchPopular();
    fetchNowPlaying();
    fetchTopRated();
    getAllGenre();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNum(randNum());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  },);
  
  return (
    <section className="home">
      <div className="banner" style={{"backgroundImage": popularMovies[0] ? `url(${`${imgUrl}${popularMovies[num].poster_path}`})` : "black"}}>
        {popularMovies[0] && <h2>{popularMovies[num].title}</h2>}
        {popularMovies[0] && <p>{popularMovies[num].overview}</p>}
        <div className="btn">
          <button>< BiPlay fontSize="1.6em" />Play</button>
          <button>< AiOutlinePlus fontSize="1.2em" /> More Info</button>
        </div>
      </div>
      <div className="genreBox">
        <h2>Genre</h2>
        <div className="genres">
          {
            genre.map((item) => (
              <Link key={item.id} to={`/gnere/${item.id}`}>{item.name}</Link>
            ))
          }
        </div>
      </div>
      <Row title="Popular on Netflix" arr={popularMovies} />
      <Row title="Upcoming Movies" arr={upcomingMovies} />
      <Row title="Now Playing Movies" arr={nowPlayingMovies} />
      <Row title="Top Rated" arr={topRatedMovies} />
    </section>
  )
}

export default Home