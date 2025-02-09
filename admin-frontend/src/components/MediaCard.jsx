import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDeleteHorseMediaMutation } from '../slices/apiSlice';

const MediaCard = ({ mediaItem }) => {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';
  const mediaUrl = `${baseUrl}${mediaItem.url}`;
  const [deleteMedia] = useDeleteHorseMediaMutation();

  const onDelete = async (mediaId) => {
    await deleteMedia(mediaId);
  };

  return (
    <Card>
      {mediaItem.type === 'image' ? (
        <Card.Img variant="top" src={mediaUrl} />
      ) : (
        <Card.Body>
          <video controls width="100%">
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Card.Body>
      )}
      <Card.Body>
        <Button variant="danger" onClick={() => onDelete(mediaItem.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MediaCard;
