# ImageToText

基于baidu OCR二次封装识别并提取图片中的文字的小工具

## 功能

1. 复制图片文件或截图,使用alt+shift+o快捷键
2. 提取到的文字会自动复制到剪切板
## 演示
![演示](https://github.com/tinet-jutt/ImageToText/blob/master/asserts/play.gif?raw=true)

## 注意事项

1. Windows 和 MacOS用户可直接使用，Linux用户需安装xclip。
2. 基于baidu OCR文字识别，默认只支持通用文字识别（标准版）,使用其他版本需要配置应用id和密钥,每月有1000次免费调用次数，详情看 [https://ai.baidu.com/forum/topic/show/979001](https://ai.baidu.com/forum/topic/show/979001)。

## 拓展设置

* `Img-to-text.client_id`: 应用的API Key
* `Img-to-text.client_secret`: 应用的Secret Key
* `Img-to-text.model`: 基于ocr的是识别模式
* `Img-to-text.show_result`: 是否展示结果

## 发布历史

### 0.0.1

* 初版发布

----------------------------------------------------

## 其他

* [GitHub](https://github.com/tinet-jutt/ImageToText)
* [VSCode Market](https://marketplace.visualstudio.com/items?itemName=tomatoknightJ.image-to-text)
* Icons made by [Good Ware](https://www.flaticon.com/authors/good-ware) from [www.flaticon.com](https://www.flaticon.com/)

**Enjoy!**
