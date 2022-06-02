import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import Box from '@mui/material/Box';
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import Tooltip from '@mui/material/Tooltip';
import Style from './index.module.css';
import CellButton from '../SiteButton';
import Consts from '../../assets/script/constants'
import CircularProgress from '@mui/material/CircularProgress';
// import required modules
import { Mousewheel, Pagination, Autoplay, Scrollbar, Navigation, Grid } from "swiper";
const THRESHOLD = 30;
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: `hsl(${Math.random() * 360},75%,60%)`,
        }
    }
    calcText (title, url) {
        let site, domain;
        if (title) {
            site = title;
        } else {
            const ARR_LEN = 3;
            site = /^(https?|file)?:?\/{2,3}(\S*?)\/[\s\S]*$/g.exec(`${url + '/'}`);
            if (site && site.length >= ARR_LEN) {
                site = site[ARR_LEN - 1];
                const domains = site.split('.').reverse();
                if (domains.length >= 2) {
                    domain = domains[1];
                } else {
                    domain = site;
                }
            } else {
                site = '';
                domain = '';
            }
        }
        domain = domain ? domain[0].toUpperCase() : ''
        if (!domain) {
            domain = site ? site[0].toUpperCase() : ''
        }
        return { site: site, domain: domain }
    }
    render () {
        const { bgColor } = this.state;
        const { title = '', url = '', text = '', img = '', margin = 3, fontSize, labelStyle } = this.props;
        const { site, domain } = this.calcText(title, url);
        return (
            <Box className={Style['cell']} style={{ marginBottom: margin + 'px' }} sx={{ '& body': img ? { backgroundImage: `url(${img})` } : { background: 'none' } }}>
                <CellButton
                    bgColor={bgColor}
                    label={text || title || site || url}
                    onClick={() => { window.open(url, '_blank'); }}
                    scale={Math.round(fontSize)}
                    labelStyle={labelStyle}
                >
                    <Box sx={{ display: img ? 'block' : 'none', bgcolor: 'invert.main', opacity: .3 }} className={Style['cell-mask']}>
                    </Box>
                    <Box className={Style['cell-char']} style={{ fontSize: fontSize + 'px' }} sx={{ color: 'invert.contrastText' }}>
                        {domain || ''}
                    </Box>
                </CellButton>
            </Box>
        )
    }
}

class SiteTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    shouldComponentUpdate (nextProps, _) {
        const {
            items: newItems = [],
            windowWidth: newWidth = 800, windowHeight: newHeight = 480,
            rows: newRows = 3, columns: newCols = 5
        } = nextProps;
        const { items = [], windowWidth = 800, windowHeight = 480, rows = 3, columns = 5 } = this.props;
        if (
            Math.abs(windowHeight - newHeight) > THRESHOLD
            || Math.abs(windowWidth - newWidth) > THRESHOLD
            || rows !== newRows
            || columns !== newCols
            // eslint-disable-next-line eqeqeq
            || newItems.length != items.length
        ) {
            return true;
        }
        for (let i = 0, len = items.length; i < len; i++) {
            const { url: newUrl = '#' } = newItems[i];
            const { url = '#' } = items[i];
            // eslint-disable-next-line eqeqeq
            if (url != newUrl) {
                return true;
            }
        }
        return false;
    }
    listItem (items, windowWidth, windowHeight, rows, columns) {
        const margin = windowHeight > windowWidth * 1.25 ? (windowWidth / columns / 16) : (windowWidth / columns * ((1 - Consts.goldenSection) / 2.4));
        const fontSize = windowWidth / columns * Consts.goldenSection;
        const itemCount = items.length;
        let itemDoms = [];
        let buffer = [];
        for (let i = 0; i < itemCount; i++) {
            const { title = '', url = '', text = '', img = '' } = items[i];
            const page = (
                <Cell
                    margin={margin}
                    fontSize={fontSize}
                    title={title} url={url} text={text}
                    img={img}
                    labelStyle={{ fontSize: `${windowHeight > windowWidth * 1.25 ? 0.6 : 1}rem` }}
                />
            );
            buffer.push(page);
            if (buffer.length >= rows) {
                let holder = [];
                while (buffer.length > 0) {
                    holder.push(buffer.pop())
                }
                itemDoms.push(
                    (
                        <SwiperSlide className={Style['slide']} key={`row${i}`}>
                            <Box className={Style['row']} sx={{ m: margin + 'px' }}>
                                {holder}
                            </Box>
                        </SwiperSlide>
                    )
                );
            }
        }
        if (buffer && buffer.length > 0) {
            itemDoms.push(
                (
                    <SwiperSlide className={Style['slide']} key="row">
                        <Box className={Style['row']} sx={{ m: margin }}>
                            {buffer}
                        </Box>
                    </SwiperSlide>
                )
            );
        }

        if (!(itemDoms[itemDoms.length - 1] && itemDoms[itemDoms.length - 1].length > 0)) {
            itemDoms.pop();
        }
        return itemDoms;
    }
    render () {
        const { loading } = this.state;
        const { items = [], columns = 5, rows = 3, windowWidth = 800, windowHeight = 480, waiting = 10e3 } = this.props;
        const itemCount = items.length;
        if (itemCount <= 0) {
            const that = this;
            setTimeout(() => {
                that.setState({ loading: false })
            }, waiting);
        }
        const itemDoms = this.listItem(items, windowWidth, windowHeight, rows, columns);
        let child;
        if (loading && itemCount <= 0) {
            child = (
                <div className={Style['loading-box']}>
                    <CircularProgress />
                </div>
            );
        } else if (itemCount <= 0) {
            child = ""
        } else {
            child = (
                <Swiper
                    pagination={{
                        type: "progressbar",
                    }}
                    navigation={true}
                    slidesPerView={columns}
                    spaceBetween={0}
                    mousewheel={true}
                    modules={[Pagination, Navigation, Mousewheel]}
                >
                    {itemDoms}
                </Swiper>
            )
        }
        return (
            <div className={Style['container']} style={{ '--swiper-pagination-color': 'unset', '--swiper-theme-color': 'unset' }}>
                <Box className={Style['content']}
                    sx={{
                        '& .swiper-pagination-bullet': { bgcolor: 'text.primary', opacity: 0.45 },
                        '& div.swiper-pagination-progressbar': { bgcolor: 'text.secondary', opacity: 0.45 },
                        '& .swiper-pagination-bullet-active': { bgcolor: 'text.primary', opacity: 1 },
                        '& span.swiper-pagination-progressbar-fill': { bgcolor: 'primary.main', opacity: 1 },
                    }}
                >
                    {child}
                </Box>
            </div >
        );
    }
}
export default SiteTable;