import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage:
      'linear-gradient(to bottom, rgb(20, 20, 30), rgb(42, 44, 56))',
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    boxShadow: '0 0 5px 5px rgb(2, 2, 2)',

    zIndex: 999,
  },
  largeIcon: {
    fontSize: '28px !important',
    color: '#fff',
  },
  labelIcon: {
    fontSize: '1.4rem',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
}));

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  useEffect(() => {
    navigate(`/${value}`);
  }, [value, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={classes.root}
      sx={{ width: '100%' }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label={<span className={classes.labelIcon}>Trending</span>}
        value={''}
        icon={<WhatshotIcon className={classes.largeIcon} />}
      />
      <BottomNavigationAction
        label={<span className={classes.labelIcon}>Movies</span>}
        value={'movies'}
        icon={<MovieIcon className={classes.largeIcon} />}
      />
      <BottomNavigationAction
        label={<span className={classes.labelIcon}>TV Series</span>}
        value="tv"
        icon={<TvIcon className={classes.largeIcon} />}
      />
      <BottomNavigationAction
        label={<span className={classes.labelIcon}>Search</span>}
        value="search"
        icon={<SearchIcon className={classes.largeIcon} />}
      />
    </BottomNavigation>
  );
}
