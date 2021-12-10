import { Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    padding: '0 0 24px',
  },
  chip: {
    background: '#fff !important',
    color: '#000 !important',
    fontSize: '1.2rem !important',
    margin: '8px  !important',
  },
  chipSelected: {
    background: 'green !important',
    color: '#fff !important',
    fontSize: '1.2rem !important',
    margin: '8px  !important',
  },
});

const Genres = ({ form }) => {
  const [selectedGenres, setSelectedGenres] = form.selectedGenres;
  const [genres, setGenres] = form.genres;
  const setPage = form.setPage;
  const type = form.type;
  const classes = useStyles();

  const handleClick = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  const handleDelete = (genre) => {
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id));
    setGenres([...genres, genre]);
  };

  useEffect(() => {
    (async function fetchGenres() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      setGenres([]);
    };
  }, [setGenres, type]);
  return (
    <div className={classes.root}>
      {selectedGenres.map((genre) => (
        <Chip
          className={classes.chipSelected}
          key={genre.id}
          label={genre.name}
          onDelete={() => handleDelete(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          className={classes.chip}
          variant="outlined"
          key={genre.id}
          label={genre.name}
          onClick={() => handleClick(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
