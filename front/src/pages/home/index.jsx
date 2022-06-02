import React from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import * as ReactDOM from 'react-dom';
import IconButton from '@mui/material/IconButton';
import Head from '../../components/Head';
import Foot from '../../components/Foot';
import Swiper from '../../components/SwiperBox';
import Fab from '@mui/material/Fab';
import ImgSwiper from '../../components/ImgSwiper';
import SiteTable from '../../components/SiteTable';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Ajax from '../../utils/requests';
import Style from './index.module.css';
import Util from '../../utils/utils';
import Cell from '../../components/SiteButton'
import PostList from './PostList';
import NewsList from './NewsList';
const REFRESH_SIZE_THRESHOLD = 30;
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            recommend: undefined,
            news: undefined,
            sites: undefined,
            imgs: [],
            page: 1,
            str: '',
            headerHeight: 100,
            windowHeight: 100,
            windowWidth: 100,
            bodyHeight: 100,
            bodyWidth: 100,
            ipv4: '',
            ipv6: '',
            ipLastRequestTime: 0,
            postLoading: false,
            suggestsRequesting: false,
            ipLoading: false,
        }
        this.header = React.createRef();
        this.body = React.createRef();
        this.timer = undefined;
    }

    componentDidMount () {
        this.handleResize();
        this.getRecommend();
        this.getNews();
        this.getSites();
        window.onresize = this.handleResize;
        this.timer = setInterval(() => { this.handleTick() }, 300)
    }
    componentWillUnmount () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    handleTick = () => {
        this.handleResize();
        // const dom = document.querySelector('[role="presentation"]');
        // console.log(dom, dom.innerHTML)
    }
    handleResize = () => {
        const header = this.header;
        const body = this.body;
        const { windowWidth, windowHeight, headerHeight, bodyHeight, bodyWidth } = this.state;
        const newWindowWidth = document.body.offsetWidth;
        const newWindowHeight = document.body.offsetHeight;
        const newHeaderHeight = header ? header.offsetHeight : headerHeight;
        const newBodyHeight = body ? body.offsetHeight : bodyHeight;
        const newBodyWidth = body ? body.offsetWidth : bodyWidth;
        let refresh = Math.abs(windowWidth - newWindowWidth) > REFRESH_SIZE_THRESHOLD
            || Math.abs(windowHeight - newWindowHeight) > REFRESH_SIZE_THRESHOLD
            || Math.abs(bodyHeight - newBodyHeight) > REFRESH_SIZE_THRESHOLD
            || Math.abs(bodyWidth - newBodyWidth) > REFRESH_SIZE_THRESHOLD
            || Math.abs(headerHeight - newHeaderHeight) > 0;
        if (refresh) {
            this.setState({
                windowWidth: newWindowWidth,
                windowHeight: newWindowHeight,
                headerHeight: newHeaderHeight,
                bodyHeight: newBodyHeight,
                bodyWidth: newBodyWidth
            });
        }
    }
    search (props, ev) {
        const { search } = props;
        if (search) {
            this.setState({ postLoading: true });
            Ajax.search(
                props,
                (resp) => {
                    const data = resp.data;
                    this.body.scrollTop = 0
                    this.setState({
                        data: data,
                        postLoading: false,
                    })
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    }
    getRecommend () {
        const { recommend } = this.state;
        if (recommend && recommend.length) {
            return;
        }
        Ajax.getRecommendList(
            (resp) => {
                const data = resp.data;
                this.setState({
                    recommend: data,
                })
            },
            (err) => {
                console.log(err)
            }
        )
    }
    getNews () {
        const { news } = this.state;
        if (news && news.length) {
            return;
        }
        Ajax.getNews(
            (resp) => {
                const data = resp.data;
                this.setState({
                    news: data,
                })
            },
            (err) => {
                console.log(err)
            }
        )
    }
    getSites () {
        const { sites } = this.state;
        if (sites && sites.length) {
            return;
        }
        Ajax.getSites(
            (resp) => {
                const data = resp.data;
                this.setState({
                    sites: data,
                })
            },
            (err) => {
                console.log(err)
            }
        )
    }
    getIP () {
        const { ipLastRequestTime } = this.state;
        // if (Date.now() - ipLastRequestTime < 1000 * 15) {//15秒内不能重复获取
        //     return;
        // }
        Ajax.getIP(
            (resp) => {
                const { ipv4, ipv6 } = resp.data;
                this.setState({
                    ipv4: ipv4,
                    ipv6: ipv6,
                    ipLastRequestTime: Date.now(),
                    ipLoading: false,
                })
            },
            (err) => {
                this.setState({
                    ipLoading: false,
                })
            }
        )
    }
    getSuggests (search) {
        const { suggestsRequesting } = this.state;
        if (suggestsRequesting || !search) {
            return;
        }
        this.setState({
            suggestsRequesting: true,
        })
        Ajax.getSuggests(
            search,
            (resp) => {
                const data = resp.data;
                let res = []
                data.forEach(item => {
                    const { title, text, update_time, updateTime } = item;
                    res.push({
                        label: title || text,
                        year: updateTime || update_time,
                    })
                });
                this.setState({
                    suggests: res,
                    suggestsRequesting: false,
                })
            },
            (err) => {
                console.log(err)
            }
        )
    }
    render () {
        const {
            data, page, str, sites, recommend, news, ipv4, ipv6, suggests,
            headerHeight, windowHeight, windowWidth, bodyHeight, bodyWidth,
            postLoading, ipLoading
        } = this.state;
        const dataNotEmpty = data && data.length;
        return (
            <div className={Style['container']}>
                <div
                    ref={(ele) => { this.header = ele; }}
                    className={Style['head']}
                >
                    <Head
                        onChange={(e) => {
                            console.log(e)
                            const value = e.target.value;
                            const input = e.nativeEvent.data;
                            this.getSuggests(value);
                        }}
                        onSubmit={(s, datePair, exists, exclude, site, ev) => {
                            console.log(s, datePair, exists, exclude, site)
                            console.log(Object.prototype.toString.call(datePair[0]))
                            this.setState({
                                str: s
                            })
                            this.getIP();
                            this.getSites();
                            this.getRecommend();
                            this.getNews();
                            this.search({ search: s }, ev);
                        }}
                        suggests={suggests}
                        items={[
                            (
                                <Tooltip arrow title={(
                                    <span>
                                        Your IP:<br />
                                        ipv4: {ipv4}<br />
                                        ipv6: {ipv6}
                                    </span>
                                )}>
                                    <div className={Style['ip-btn']}>

                                        <IconButton
                                            onClick={() => {
                                                this.setState({ ipLoading: true });
                                                this.getIP();
                                            }}
                                        >
                                            <FlagRoundedIcon />
                                            {
                                                ipLoading ? (
                                                    <CircularProgress size="small" className={Style['ip-btn-progress']} />
                                                ) : ''
                                            }
                                        </IconButton>

                                    </div>
                                </Tooltip>
                            ), (
                                /* <IconButton>
                                    <SmartToyRoundedIcon />
                                </IconButton> */
                                <Link
                                    target="_blank"
                                    to={{
                                        pathname: '/settings',
                                        // state: {  // 页面跳转要传递的数据，如下
                                        //       data1: {}，
                                        //       data2: []
                                        // },
                                    }}
                                >
                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>
                                </Link>
                            )
                        ]}
                    />
                </div>
                <div className={Style['main']} ref={(ele) => { this.body = ele }}>
                    <div className={`gold-width-fixed ${Style['center']}`}>
                        <div className={Style['center-child']}>
                            <Box
                                className={Style['left-box']}
                                sx={{ p: 0, m: 0, bgcolor: 'background.paper' }}
                            >
                                <PostList data={data} loading={postLoading} />
                                <div className={Style['site-table']}>
                                    <SiteTable items={sites} windowWidth={bodyWidth} windowHeight={windowHeight} />
                                </div>
                            </Box>
                            {
                                dataNotEmpty ? (
                                    <div className={`narrow-hidden ${Style['right-box']}`}>
                                    </div>
                                ) : ''
                            }
                        </div>
                    </div>
                    <div
                        style={{ display: dataNotEmpty ? undefined : 'none' }}
                        className={`narrow-hidden ${Style['right-box']} ${Style['right']}`}
                    >
                        <div className={Style['right-box-space']}
                            style={{ height: `${headerHeight || 0}px` }}
                        >
                        </div>
                        <Box
                            component="div"
                            sx={{ bgcolor: 'background.paper', mt: 0, pt: 0 }}
                            className={Style['right-box-content']}
                        >
                            {
                                dataNotEmpty && recommend ? (
                                    <div className={Style['recommend']} >
                                        <ImgSwiper items={recommend.slice(0, 9)} />
                                    </div>
                                ) : ''
                            }
                            {
                                dataNotEmpty && news ? (
                                    <div className={Style['news']} >
                                        <NewsList data={news} pageSize={8} />
                                    </div>
                                ) : ''
                            }
                        </Box>
                    </div>
                </div>
                {
                    data && data.length ? (
                        <Foot
                            className={Style['head']}
                            index={page}
                            onChange={(index, ev) => {
                                this.setState({
                                    page: index
                                })
                                this.search({ search: str, pageIndex: page }, ev);
                            }}
                        />
                    ) : ''
                }
            </div>
        );
    }
}

export default Page;