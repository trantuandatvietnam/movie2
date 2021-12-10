import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import React, { useState } from 'react';
import { img_500, unavailable } from '../../config/config';
import ButtonCustom from '../Button/Button';
import Carousel from '../Carousel/Carousel';
import './MovieModal.scss';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '80vh',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: '#000',
  p: 4,
  boxShadow: '0 0 3px 5px #ccc',
  display: 'flex',
  alignItems: 'start',
};

export default function MovieModal({ openModal, setOpenModal, idCard, type }) {
  const handleClose = () => {
    setOpenModal(false);
  };
  const [detailsItem, setDetailsItem] = useState({});
  const [video, setVideo] = useState('');

  React.useEffect(() => {
    (async function getDetails() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${
          type ? type : 'movie'
        }/${idCard}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setDetailsItem(data);
    })();
    (async function getVideo() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${
          type ? type : 'movie'
        }/${idCard}/videos?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US`
      );
      setVideo(data.results[0]?.key);
    })();
  }, [idCard, type]);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            color="primary"
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              cursor: 'pointer',
              fontSize: 'large',
              margin: '8px',
            }}
            onClick={() => setOpenModal(false)}
          />
          <div className="image">
            <img
              className="image-big"
              src={`${img_500}/${
                detailsItem.poster_path ? detailsItem.poster_path : unavailable
              }`}
              alt={detailsItem.name}
            />
            <img
              className="image-small"
              src={`${img_500}/${
                detailsItem.backdrop_path
                  ? detailsItem.backdrop_path
                  : unavailable
              }`}
              alt={detailsItem.name}
            />
          </div>
          <div className="info">
            <h3>{detailsItem.name || detailsItem.title}</h3>
            <div className="desc">
              <b>Description:</b> {detailsItem.overview}
            </div>
            <div className="release_date">
              Release date:{' '}
              {detailsItem.release_date || detailsItem.first_air_date}
            </div>
            <div className="button">
              <ButtonCustom video={video} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
