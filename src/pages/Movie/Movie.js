import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import CardItem from '../../components/CardItem/CardItem';
import Genres from '../../components/Genres/Genres';
import PaginationCustom from '../../components/Pagination/Pagination';
import useGenre from '../../hooks/useGenre';

const useStyles = makeStyles({
  movieTitle: {
    paddingBottom: '24px',
    fontSize: '24px',
  },
});

const Movie = () => {
  const classes = useStyles();
  const [movieData, setMovieData] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const subcribe = useRef(true);
  const genresForUrl = useGenre(selectedGenres);
  useEffect(() => {
    subcribe.current = true;
    (async function fetchMovie() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genresForUrl}`
        );
        if (!subcribe.current) return;
        setNumberOfPage(data.total_pages);
        setMovieData(data.results);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      subcribe.current = false;
    };
  }, [page, genresForUrl]);

  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <div>
      <h3 className={classes.movieTitle}>Movie</h3>
      <Genres
        form={{
          selectedGenres: [selectedGenres, setSelectedGenres],
          genres: [genres, setGenres],
          type: 'movie',
          setPage: setPage,
        }}
      />
      <Grid container spacing={4}>
        {movieData &&
          movieData.map((item) => <CardItem key={item.id} item={item} />)}
      </Grid>
      <PaginationCustom
        page={page}
        totalPage={numberOfPage}
        pageChange={handlePageChange}
      />
    </div>
  );
};

export default Movie;
