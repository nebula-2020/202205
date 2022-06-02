import React from 'react';
import Box from '@mui/material/Box';
import Style from './index.module.css';
import Util from '../../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Cell from '../../components/SiteButton'
import CircularProgress from '@mui/material/CircularProgress';
const WAITING = 90e3;
class PostList extends React.Component {
    shouldComponentUpdate (nextProps, _) {
        const { data: newData = [], loading: newLoading = false } = nextProps;
        const { data = [], loading = true } = this.props;
        // eslint-disable-next-line eqeqeq
        if (loading != newLoading || data.length != newData.length) {
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

    showData (data) {
        // console.log(data)
        let ret = [];
        let urls = new Set();
        for (let i = 0, len = data.length; i < len; i++) {
            const { url = '#', title = '', text = '', update_time, updateTime } = data[i];
            if (urls.has(url)) {
                continue;
            }
            urls.add(url);
            const dom = (
                <li className={Style['item']} key={`${url} ${i}`}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            mb: .25,
                            mt: 1,
                        }}
                    >
                        <a
                            className={Style['title']}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex="0"
                        >
                            {Util.autoEmTag(title || url, 'text.primary', 'primary.dark', Style['text'])}
                        </a>
                    </Box>
                    <div>
                        <Box component="span" color="text.hint" className={Style['date']}>
                            {update_time || updateTime}
                        </Box>
                        &ensp;{Util.autoEmTag(text, 'text.secondary', 'primary.dark', Style['text'])}
                    </div>
                    <Box className={Style['site']} color="text.hint">
                        <Tooltip followCursor title={url} >
                            <span>
                                {url}
                            </span>
                        </Tooltip>
                    </Box>
                    <hr className={Style['line']} />
                </li>
            )
            ret.push(dom);
        }
        return ret;
    }
    render () {
        const { data = [], loading = true } = this.props;
        const dataLen = data.length;
        let child;
        if (loading && dataLen <= 0) {
            child = (
                <div className={Style['loading-box']}>
                    <CircularProgress />
                </div>
            );
        } else if (dataLen <= 0) {
            child = ""
        } else {
            child = this.showData(data)
        }
        return (
            <div
                key={JSON.stringify(data)}
                component="ul"
                className={Style['list']}
                ref={(ele) => { this.post = ele }}
            >
                {child}
            </div>
        );
    }
}
export default PostList;