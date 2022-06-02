import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Style from './index.module.css';

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";

class App extends React.Component {
    shouldComponentUpdate (nextProps, _) {
        const RAND_NAME = `${Math.floor(Math.random() * 100000)}`;
        const { items: nextItems = [], name: nextName = RAND_NAME } = nextProps;
        const { items = [], name = RAND_NAME } = this.props;
        if (name !== nextName) {
            return true;
        }
        // eslint-disable-next-line eqeqeq
        if (items.length != nextItems.length) {
            return true;
        }
        for (let i = 0, len = items.length; i < len; i++) {
            const { url: newUrl = '#' } = nextItems[i];
            const { url = '#' } = items[i];
            // eslint-disable-next-line eqeqeq
            if (url != newUrl) {
                return true;
            }
        }
        return false;
    }
    render () {
        const { items, name = `${Math.floor(Math.random() * 100000)}` } = this.props;
        let itemList = []
        items.forEach(item => {
            const { img = `${Math.floor(Math.random() * 100000)}`, title = '', url = '#' } = item;
            const contentLen = title.length;
            itemList.push((
                <SwiperSlide className={Style['item-container']} key={img}>
                    <div
                        className={Style['item']}
                        style={{ backgroundImage: `url(${img})` }}
                        onClick={() => {
                            window.open(url, '_blank');
                        }}
                    >
                        <div className={Style['item-content']}>
                            <svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <defs>
                                    <clipPath id={`${name}`}>
                                        <rect x={0} y={0} width={400} height={420} />
                                    </clipPath>
                                    <clipPath id={`${name}b`}>
                                        <path d="m 400,408.30301 c -200,95.84848 -200,-95.84851 -400,0 V 600 h 400 z" />
                                    </clipPath>
                                </defs>
                                <foreignObject
                                    height="600"
                                    width="400"
                                    x="0"
                                    y="0"
                                >
                                    <body>
                                        <div className={Style['item-text-bg']}
                                            style={{ backgroundImage: `url(${img})` }}
                                        >
                                        </div>
                                    </body>
                                </foreignObject>
                                <foreignObject
                                    height="600"
                                    width="400"
                                    x="0"
                                    y="0"
                                    style={{ clipPath: 'url(#' + name + 'b)' }}
                                >
                                    <body>
                                        <div className={`${Style['item-blur']}`}>
                                            <p className={`${Style['item-bgc']}`}></p>
                                            <div style={{ transform: 'scaleX(-1)', left: 0, top: 0, backgroundImage: `url(${img})` }} ></div>
                                            <div style={{ left: '400px', top: 0, backgroundImage: `url(${img})` }} ></div>
                                            <div style={{ transform: 'scaleX(-1)', left: '800px', top: 0, backgroundImage: `url(${img})` }} ></div>
                                            <div style={{ transform: 'scale(-1,-1)', left: 0, top: '600px', backgroundImage: `url(${img})` }} ></div>
                                            <div style={{ transform: 'scaleY(-1)', left: '400px', top: '600px', backgroundImage: `url(${img})` }} ></div>
                                            <div style={{ transform: 'scale(-1,-1)', left: '800px', top: '600px', backgroundImage: `url(${img})` }} ></div>
                                        </div>
                                        <div className={Style['item-text']} style={{ fontSize: contentLen <= 17 ? '34px' : '28px' }} >
                                            {contentLen > 40 ? `${title}`.substring(0, 40) + '...' : title}
                                        </div>
                                    </body>
                                </foreignObject>
                            </svg>
                        </div>
                    </div>
                </SwiperSlide>
            ))
        });
        return (
            <div className={Style['container']}>
                <div className={Style['content']}
                    style={{
                        '--swiper-pagination-bullet-inactive-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                >
                    <Swiper
                        dir="rtl"
                        spaceBetween={0}
                        autoplay={{
                            delay: 6521,//这是个质数
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        loop={true}
                    >
                        {itemList}
                    </Swiper>
                </div>
            </div>
        );
    }
}
export default App;