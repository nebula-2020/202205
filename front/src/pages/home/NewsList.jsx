import React from 'react';
import Box from '@mui/material/Box';
import Swiper from '../../components/SwiperBox';
import Style from './index.module.css';
import Tooltip from '@mui/material/Tooltip';
class PostList extends React.Component {
    shouldComponentUpdate (nextProps, _) {
        const { data: newData = [] } = nextProps;
        const { data = [] } = this.props;
        // eslint-disable-next-line eqeqeq
        if (data.length != newData.length) {
            return true;
        }
        for (let i = 0, len = data.length; i < len; i++) {
            const { url: newUrl = '#' } = newData[i];
            const { url = '#' } = data[i];
            // eslint-disable-next-line eqeqeq
            if (url != newUrl) {
                return true;
            }
        }
        return false;
    }
    showData (data, pageSize = 8) {
        if ((!data) || !data.length) {
            return []
        }
        let ret = [];
        let res = [];
        for (const index in data) {
            const item = data[index]
            if (!item.title) {
                continue
            }//<a href={item.url} className={Style['info-img']} style={{ backgroundImage: `url(${item.imgurl})` }}></a>

            let dom = (
                <li>
                    <Box
                        key={item.url || Math.random()}
                        className={Style['info']}
                        href={item.url}
                        component="a"
                        target="_blank"
                        rel="noreferrer"
                        color="text.secondary"
                        sx={{
                            ":hover": {
                                color: 'primary.main'
                            },
                            ":active": {
                                color: 'primary.main'
                            }
                        }}
                    >
                        <Tooltip followCursor title={item.title}>
                            <span>
                                {item.title}
                            </span>
                        </Tooltip>
                    </Box>
                </li>
            )
            res.push(dom)
            if (res.length % pageSize === 0) {
                const pageDom = (
                    <ul className={Style['info-list']}>
                        {res}
                        <li>
                            <div className={`${Style['info']} ${Style['info-bottom']}`}>
                                &ensp;
                            </div>
                        </li>
                    </ul>
                );
                ret.push(pageDom);
                res = []
            }
        }
        return ret;
    }
    render () {
        const { data = [], pageSize } = this.props;
        return (
            <Swiper items={this.showData(data)} pageSize={pageSize} />
        );
    }
}
export default PostList;
