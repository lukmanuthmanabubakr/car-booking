import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonals from '../components/Testimonals'
import NewLetter from '../components/NewLetter'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonals />
      <NewLetter />
    </>
  )
}

export default Home