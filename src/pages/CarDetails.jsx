import React from 'react'
import { useParams } from 'react-router-dom'

const CarDetails = () => {
  const {id} = useParams
  return (
    <div>CarDetails</div>
  )
}

export default CarDetails