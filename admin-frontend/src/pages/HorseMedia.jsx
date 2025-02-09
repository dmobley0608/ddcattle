import React from 'react'
import MediaForm from '../forms/MediaForm'
import { Col, Row } from 'react-bootstrap'
import MediaCard from '../components/MediaCard'

export default function HorseMedia({horse}) {
    return (
        <div>
            <MediaForm horseId={horse.id} className='my-3'/>
            <Row>
                {horse.media.map((mediaItem) => (
                    <Col key={mediaItem.id} md={4}>
                        <MediaCard mediaItem={mediaItem} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
