import axios from 'axios';
import SEARCH from '../assets/dev/search.json'
import RECOMMEND from '../assets/dev/recommend.json'
import NEWS from '../assets/dev/news.json'
import SITES from '../assets/dev/sites.json'
import INFO from '../assets/dev/info.json'
import IP from '../assets/dev/ip.json'
function ajax (props) {
  const {
    url, method, headers, params, body, useHttps = false,
    then = (resp) => {
      console.log(`“${url}”${method.toLowerCase()}请求成功：`, resp)
    },
    err = (ex) => { console.log('请求失败。', ex) },
    ...etc
  } = props;
  axios(
    Object.assign(
      {
        url: `http${useHttps ? 's' : ''}://127.0.0.1:7777/${url}`,
        method: method,
        data: typeof body == 'string' ? body : JSON.stringify(body),
        params: params,
        jsonp: 'handleCallback',//跨域
        headers: Object.assign({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, headers),
      },
      etc
    )
  ).then(
    function (response) {
      // eslint-disable-next-line eqeqeq
      if (response.status != 200) {
        throw Error('反馈异常。')
      } else {
        return then(response)
      }
    }
  ).catch(err);
}

function sleep (delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const EXPORT = {
  search: function (props, success, err) {
    const { search, site, pageIndex, latest, earliest } = props;
    (async () => {
      await sleep(2e3);
      success(SEARCH)
    })();
    // ajax({
    //   url: 'search',
    //   method: 'get',
    //   params: {
    //     s: search,
    //     site: site,
    //     i: pageIndex,
    //     l: latest,
    //     e: earliest,
    //   },
    //   then: success,
    //   err: err,
    // });
  },
  getRecommendList: function (success, err) {
    (async () => {
      await sleep(6e3);
      success(RECOMMEND);
    })();
  },
  getNews: function (success, err) {
    (async () => {
      await sleep(5e3);
      success(NEWS)
    })();
  },
  getSites: function (success, err) {
    (async () => {
      await sleep(1e3);
      success(SITES)
    })();
  },
  getFavorites: function (success, err) {
    (async () => {
      await sleep(4e3);
      success(INFO)
    })();
  },
  getIP: function (success, err) {
    (async () => {
      await sleep(3e3);
      success(IP)
    })();
  },
  getSuggests: function (search, success, err) {
    (async () => {
      await sleep(3e3);
      let ret = []
      SEARCH.data.forEach(item => {
        if (Math.random() > .2) {
          ret.push(item)
        }
      });
      return success({ data: ret })
    })();
  },
}

export default EXPORT;
