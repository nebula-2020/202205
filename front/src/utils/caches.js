const CacheMaster = {
  //设置缓存
  cacheSave: function (key, value) {
    var localStorage = window.localStorage;
    if (localStorage) {
      localStorage.setItem(key, value);
    }
  },
  //获取缓存
  cacheGet: function (key) {
    var localStorage = window.localStorage;
    if (localStorage) {
      return localStorage.getItem(key);
    }
  }
}
export default CacheMaster;