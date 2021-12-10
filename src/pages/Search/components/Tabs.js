import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  tab: {
    fontSize: '1.4rem !important',
    color: '#fff !important',
    fontWeight: 'bold !important',
  },
})

export default function SearchTabs({ setType, type }) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setType(newValue)
  };


  return (
    <Box pt={3} sx={{ width: '100%' }}>
      <Tabs
        value={type}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        textColor="inherit"
      >
        <Tab className={classes.tab}
          value="tv"
          label="Tv"
          wrapped
        />
        <Tab className={classes.tab} value="movie" label="Movies" />
      </Tabs>
    </Box>
  );
}
