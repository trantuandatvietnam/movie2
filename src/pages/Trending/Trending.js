import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardItem from '../../components/CardItem/CardItem';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PaginationCustom from '../../components/Pagination/Pagination';

const useStyles = makeStyles({
  trendingTitle: {
    paddingBottom: '24px',
    fontSize: '24px',
  },
});

const Trending = () => {
  const classes = useStyles();
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async function fetchTrending() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        setTrendingData(data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);
  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <div>
      <h3 className={classes.trendingTitle}>Top Trending</h3>
      <Grid container spacing={4}>
        {trendingData &&
          trendingData.map((item) => <CardItem key={item.id} item={item} />)}
      </Grid>
      <PaginationCustom page={page} totalPage={10} pageChange={handlePageChange} />
    </div>
  );
};

export default Trending;
