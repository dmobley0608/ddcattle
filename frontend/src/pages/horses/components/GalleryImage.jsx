import React from 'react'
import LoadingImage from '../../../components/LoadingImage'

const GalleryImage = ({ mediaItem, index, imageUrlPrefix, handleImageClick }) => {
    return (
        <LoadingImage
            src={`${imageUrlPrefix}${mediaItem.url}`}
            alt={`Horse media ${index}`}
            className="thumbnail"
            onClick={() => handleImageClick(index)}
        />
    )
}

export default GalleryImage
