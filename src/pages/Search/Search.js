import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import CardItem from '../../components/CardItem/CardItem';
import SearchTabs from './components/Tabs';
import Pagination from '../../components/Pagination/Pagination';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState('tv');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [resultSearch, setResultSearch] = useState([]);
  const timeoutRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.querySelector('input').focus();
    (async function getSearch() {
      const { data = {} } =
        searchValue &&
        (await axios.get(
          `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`
        ));
      data && setTotalPage(data.total_pages);
      setResultSearch(data?.results);
    })();
    // eslint-disable-next-line
  }, [page, type]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    (async function getSearch() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`
      );
      setResultSearch(data.results);
    })();
  };

  const handleChangeSearchValue = (e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 300);
  };

  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <div>
      <Paper
        onSubmit={handleOnSubmit}
        component="form"
        sx={{ p: '4px', display: 'flex', alignItems: 'center', flex: 1 }}
      >
        <InputBase
          style={{ fontSize: '1.4rem' }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter any thing to seach..."
          ref={searchInputRef}
          onChange={handleChangeSearchValue}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon fontSize="large" />
        </IconButton>
      </Paper>
      <SearchTabs setType={setType} type={type} />
      <Grid pt={3} container spacing={4}>
        {resultSearch &&
          resultSearch.map((item) => <CardItem key={item.id} item={item} />)}
        {resultSearch?.length === 0 && searchValue && (
          <div style={{ margin: '48px auto', fontSize: '2.4rem' }}>
            Not Found!
          </div>
        )}
        {!searchValue && (
          <div style={{ margin: '48px auto', fontSize: '2.4rem' }}>
            Please enter any in search!
          </div>
        )}
      </Grid>
      <Pagination
        pageChange={handlePageChange}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
}
