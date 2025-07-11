import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonals from '../components/Testimonals'
import NewLetter from '../components/NewLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonals />
      <NewLetter />
      <Footer />
    </>
  )
}

export default Home