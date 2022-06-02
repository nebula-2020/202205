# 设计文档

HelloWorld本地代理服务器将提供**百度+必应**聚合搜索，并支持更改一些网站的UI来让它们看起来更加符合机器主人的喜好。

## 表结构

时间戳记为**0时区从1970年1月1日0:00开始的秒数**。

### FAVORITE_SITE（收藏站点）

|字段|类型|允许空值|索引|描述|
|:-:|:-:|:-:|:-:|:--|
|SITE_URL|TEXT|否|主键|站点域名|
|LAST_VISIT|INTEGER|否||上次访问时间戳|
|VISITS|INTEGER|否||收藏后访问次数|
|ERROR_TIMES|INTEGER|否||收藏后访问失败次数|

### VISIT_HISTORY（浏览记录）

|字段|类型|允许空值|索引|描述|
|:-:|:-:|:-:|:-:|:--|
|URL|TEXT|否|主键|访问路径|
|VISIT_DATE_TIME|INTEGER|否||上次访问时间戳|

### IMAGE_REQUEST（图片请求记录）

|字段|类型|允许空值|索引|描述|
|:-:|:-:|:-:|:-:|:--|
|URL|TEXT|否|主键|远端路径|
|INDEX|INTEGER|否|主键|请求批次识别码，短整数|
|GET_DATE_TIME|INTEGER|否||响应时间|

### SAVED_IMAGE（图片）

|字段|类型|允许空值|索引|描述|
|:-:|:-:|:-:|:-:|:--|
|SAVE_FILENAME|TEXT|否|主键|本地路径|
|BATCH_INDEX|INTEGER|否|外键|请求批次识别码|
|BATCH_DATE_TIME|INTEGER|否|外键|请求时间|
|IMG_SRC|TEXT|否||远端路径|
|MD5|TEXT|否||
|WIDTH|INTEGER|是||像素宽度|
|HEIGHT|INTEGER|是||像素高度|
|SIZE|INTEGER|是||字节体积|

### SCRIPT（脚本配置）

脚本类型包括但不限于：

* XML解析
* JSON解析
* 爬虫

|字段|类型|允许空值|索引|描述|
|:-:|:-:|:-:|:-:|:--|
|NAME|TEXT|否|主键|脚本名称|
|UPDATE_DATE_TIME|INTEGER|是||上次提交时间|
|SCRIPT_TYPE|TEXT|否||脚本类型|
|CONTENT|TEXT|否||脚本的内容，不同类型脚本内容格式不同|

## 服务（视图）

### IP地址展示服务

获取当前IPv4地址和IPv6地址并反馈到页面。

### 搜索服务

传入几个可用的**参数**，用**百度搜索**和**必应搜索**两个搜索引擎分别依据参数进行搜索。搜索结果合并后先依据URL去重，再反馈到前端。两个搜索请求分别由两个进程发出和接收，即多进程。

### 定义脚本

前端提交表单，后端从表单获取字段用以填充数据元组。而脚本的输出是字典，这个字典的字段由脚本入参指定，脚本内部逻辑由具体代码实现。脚本种类是有限的几种。

### 定义插槽逻辑

与脚本相关。页面有固定个数的插槽，每个插槽用字典接收参数，不同插槽接受的字段未必相同但尽可能有一定规律。页面加载时，依据一定的用户设置判断插槽对应的脚本序列。而这个用户设置可能是判断今天是否为周末、判断现在是否为白天、随机数是否大于0.5，诸如此类。

### 站点收藏

收藏列表的增删查改，可以导出和导入JSON文件来批量操作。收藏夹内容会镶嵌在搜索结果中一起呈现。

### 代理服务

转发一些网站的请求，在返回页面中强制加入用户定义的CSS和JS引用，以便依照用户喜好改变网页UI。用户的CSS和JS文件都不进入数据库而是直接存储在文件系统中。

### 导航设置

导航的增删查改也是操作JSON文件而不操作数据库，页面上的网址导航栏的每一个栏目都有自己的背景图片，这些图片也是插槽。如果爬取的图片数量不够多，那么就用纯色作为背景。

### 请求头设置

操作JSON文件而不操作数据库。爬虫所用的请求头。

### Cookie管理

未来功能…

### Siri

未来功能…

## 项目依赖

安装前端依赖：

```shell
npm install --legacy-peer-deps @mui/material @emotion/react @emotion/styled @mui/base @mui/system @emotion/react @emotion/styled swiper axios @mui/icons-material react-router-dom @material-ui/core @mui/x-date-pickers date-fns showdown showdown-highlight showdown-katex showdown-table
```
