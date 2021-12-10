import StarIcon from '@mui/icons-material/Star';
import { CardActionArea, Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { img_300, unavailable } from '../../config/config';
import MovieModal from '../MovieModal/MovieModal';

const useStyles = makeStyles({
  card: {
    boxShadow: '0 0 5px 5px rgb(2, 2, 2)',
  },
  imgCard: {
    width: '100%',
    height: '472px',
    objectFit: 'cover',
    padding: '12px',
  },

  overview: {
    fontSize: '1.2rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkitLineClamp': 3,
    lineClamp: 3,
    '-webkitBoxOrient': 'vertical',
    minHeight: '45px',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '280x',
  },
});

const CardItem = ({ item = null }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const handleOnClickCard = () => {
    setOpenModal(true);
  };
  return (
    <Grid item sm={6} md={4} lg={3}>
      <Card className={classes.card} onClick={handleOnClickCard}>
        <CardActionArea>
          <CardMedia
            className={classes.imgCard}
            component="img"
            image={
              item.poster_path ? `${img_300}${item.poster_path}` : unavailable
            }
            alt={item.name}
          />
          <CardContent>
            <Typography
              className={classes.name}
              gutterBottom
              variant="h5"
              component="div"
            >
              {item.name || item.title}
            </Typography>
            <Rating
              name="text-feedback"
              value={item.vote_average / 2}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography className={classes.overview}>
              {item.overview}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <MovieModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        idCard={item.id}
        type={item.media_type}
      />
    </Grid>
  );
};

CardItem.propsTypes = {
  item: PropTypes.object,
};

export default CardItem;
