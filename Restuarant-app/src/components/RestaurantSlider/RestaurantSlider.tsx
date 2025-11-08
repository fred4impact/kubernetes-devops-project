import React from 'react'
import Slider from 'react-slick'
import { Box, Typography } from '@mui/material'
import { Restaurant } from '../../store/api/restaurantApi'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface RestaurantSliderProps {
  title: string
  restaurants: Restaurant[]
}

const RestaurantSlider: React.FC<RestaurantSliderProps> = ({
  title,
  restaurants,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (restaurants.length === 0) {
    return null
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 2, fontWeight: 600, px: 2 }}
      >
        {title}
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider {...settings}>
          {restaurants.map((restaurant) => (
            <Box key={restaurant.id} sx={{ px: 1 }}>
              <RestaurantCard restaurant={restaurant} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  )
}

export default RestaurantSlider

