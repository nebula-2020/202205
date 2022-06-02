import React, { useRef, useState } from "react";
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Style from './index.module.css';

// import required modules
import { Pagination, Autoplay } from "swiper";

export default function App (props) {
    const { items = [] } = props;
    let itemList = []
    for (const i in items) {
        itemList.push((
            <SwiperSlide className={Style['item']} key={`${i}`}>
                <Box className={Style['item-content']} sx={{ bgcolor: 'background.paper' }}>
                    {items[i]}
                </Box>
            </SwiperSlide>
        ))
    }
    return (
        <Box className={Style['container']}
            sx={{
                '& .swiper-pagination-bullet': {
                    bgcolor: 'text.secondary'
                },
                '& .swiper-pagination-bullet-active': {
                    bgcolor: 'text.secondary'
                }
            }}
        >
            <Swiper
                spaceBetween={30}
                autoplay={{
                    delay: 9973,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                loop={true}
            >
                {itemList}
            </Swiper>
        </Box>
    );
}
