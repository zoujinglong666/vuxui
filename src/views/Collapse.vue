<template>
  <div>
    <p>基本用法</p>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>


    <p>手风琴</p>
    <vux-collapse v-model="activeNames" accordion>
      <vux-collapse-item name="1" title="标题1">再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">再见2022</vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">再见2022</vux-collapse-item>
    </vux-collapse>
    <p>禁用状态</p>
    <vux-collapse v-model="activeNames">
      <vux-collapse-item name="1" title="标题1"> 再见2022</vux-collapse-item>
      <vux-collapse-item name="2" title="标题2">
        <div style="height: 10000px;background: red">
          <div>
            <div>

            </div>
          </div>
        </div>
      </vux-collapse-item>
      <vux-collapse-item name="3" title="标题3">
        返回主页AlphaJunS
        博客园首页联系管理随笔 - 266 文章 - 0 评论 - 17 阅读 - 40万
        MySQL中的字符串函数
        1、MySQL中常用的字符串函数

        MySQL软件支持的字符串函数表如下：

        函 数 功 能
        CONCAT(str1,str2,...,strn) 将str1,str2,...,strn连接为一个完整的字符串
        INSERT(str,x,y,instr) 将字符串str从第x开始，y个字符串长度的子串替换为字符串instr
        LOWER(str) 将字符串str中的所有字母变成小写
        UPPER(str) 将字符串str中的所有字母变成大写
        LEFT(str,x) 返回字符串最左边的x个字符
        RIGHT(str,x) 返回字符串最右边的x个字符
        LPAD(str,n,pad) 使用字符串pad对字符串str最左边进行填充，直到长度为n个字符长度
        RPAD(str,n,pad) 使用字符串pad对字符串str最右边进行填充，直到长度为n个字符长度
        LTRIM(str) 去掉str左边的空格
        RTRIM(str) 去掉str右边的空格
        REPEAT(str,x) 返回字符串str重复x次的结果
        REPLACE(str,a,b) 使用字符串b替换字符串str中所有出现的字符串a
        STRCMP(str1,str2) 比较字符串str1和str2
        TRIM(str) 去掉字符串行头和行尾的空格
        SUBSTRING(str,x,y) 返回字符串str中从x位置起y个字符串长度的字符串


        2、合并字符串函数CONCAT()和CONCAT_WS()

        语法形式：

        CONCAT(str1,str2,...,strn);

        将传入的参数连接起来返回合并的字符串类型数据。如果一个参数为NULL，则返回NULL。


        CONCAT_WS(sep,str1,str2,...,strn);

        将字符多个字符串连接成一个字符串，字符串之间用分隔符分开。分隔符为NULL时返回NULL，子字符串中含有NULL时，函数将忽略NULL。


        3、比较字符串大小函数STRCMP()

        语法形式：

        STRCMP(str1,str2);

        比较传入的字符串str1与str2，如果传入的参数str1大于str2，则返回true；如果参数str1小于str2，则返回false；如果参数str1等于str2，则返回0。


        4、获取字符串长度函数LENGTH()和字符数函数CHAR_LENGTH()

        语法形式：

        LENGTH(str);

        获取传入的字符串str长度。

        CHAR_LENGTH(str);

        获取传入的字符串str的字符数。


        5、实现字母大小写转换函数UPPER()和LOWER()

        语法形式：

        UPPER(str);

        UCASE(str);

        将所传入的字符串str中所有字母转换为大写字母。


        LOWER(str);

        LCASE(str);

        将所传入的字符串str中所有字母转换为小写字母。


        6、查找字符串

        返回字符串位置的FIND_IN_SET()函数

        语法形式：

        FIND_IN_SET(str1,str2);

        返回在字符串str2中与str1匹配的字符串的位置。


        返回指定字符串位置的FIELD()函数

        语法形式：

        FIELD(str1,str2,str3,...);

        返回第一个与字符串匹配的字符串的位置。


        返回子字符串相匹配的开始位置

        语法形式：

        LOCATE(str1,str);

        POSITION(str1 IN str);

        INSTR(str,str1);

        获取子字符串相匹配的开始位置。


        返回指定位置的字符串的ELT()函数

        ELT(n.str1,str2,...);

        获取指定位置的字符串。


        选择字符串的MAKE_SET()

        语法形式：

        MAKE_SET(num,str1,str2,..,strn);

        将num转换成二进制数，再根据二进制数来选择字符串。从左到右顺序读取该值，二进制数值为1选择该字符串，否则不选该字符串。


        7、从现有字符串中截取子字符串

        从左边或右边截取子字符串

        LEFT(str,num);

        RIGHT(str,num);


        截取指定位置和长度的子字符串

        SUBSTRING(str,num,len);

        MID(str,num,len);


        8、去除字符串开始的首位空格

        去除字符串开始处的空格

        LTRIM(str);


        去掉字符串结束处的空格

        RTRIM(str);


        9、去掉字符串首位空格

        TRIM(str);


        10、替换字符串

        INSERT(str,pos,len,newstr);


        REPLACE(str,substr,newstr);


        分类: Database
        好文要顶 关注我 收藏该文
        AlphaJunS
        粉丝 - 8 关注 - 11
        +加关注
        10
        « 上一篇： properties配置文件
        » 下一篇： MySQL中的数值函数
        posted @ 2018-11-05 10:43 AlphaJunS 阅读(28119) 评论(0) 编辑 收藏 举报
        刷新评论刷新页面返回顶部
        登录后才能查看或发表评论，立即 登录 或者 逛逛 博客园首页
        编辑推荐：
        · 六芒星能力图动画是如何制作的？
        · 如何将「知识」体系化管理
        · 如何提取 x64 程序那些易失的方法参数
        · 企业低成本万能架构
        · 聊一聊系统重构
        即构专区：
        · AI 加持实时互动｜ZegoAvatar 面部表情随动技术解析
        · 活动干货｜泛娱乐App出海东南亚深度解析
        · 即构电商直播方案，支持万商之家撬动千亿商业直播市场
        · 零基础实现Java直播（一）：集成
        · 影响音视频延迟的关键因素（一）：流媒体系统
        昵称： AlphaJunS
        园龄： 4年5个月
        粉丝： 8
        关注： 11
        +加关注
        < 2023年3月 >
        日 一 二 三 四 五 六
        26 27 28 1 2 3 4
        5 6 7 8 9 10 11
        12 13 14 15 16 17 18
        19 20 21 22 23 24 25
        26 27 28 29 30 31 1
        2 3 4 5 6 7 8
        搜索


        常用链接
        我的随笔
        我的评论
        我的参与
        最新评论
        我的标签
        随笔分类
        Database(52)
        Debug&Summary(76)
        DIY(4)
        EasyUI(7)
        Eclipse(3)
        HTML(4)
        Java(81)
        JavaScript(6)
        jQuery(2)
        Linux(12)
        Mybatis(4)
        Servlet&JSP(6)
        Spring(5)
        springboot(3)
        springMVC(8)
        更多
        随笔档案
        2021年12月(1)
        2021年9月(3)
        2021年8月(2)
        2021年6月(3)
        2021年5月(2)
        2021年4月(1)
        2021年2月(1)
        2020年11月(5)
        2020年8月(2)
        2020年7月(5)
        2020年6月(16)
        2020年5月(4)
        2020年4月(15)
        2020年3月(19)
        2020年2月(4)
        更多
        阅读排行榜
        1. MySQL中的字符串函数(28119)
        2. 浏览器控制台报错js文件net::ERR_ ABORTED 404原因之一(20631)
        3. 利用java执行shell脚本(18581)
        4. Set转逗号分隔字符串(14445)
        5. JsonUtil工具类(11659)
        评论排行榜
        1. Mybatis分页插件PageHelper的使用(2)
        2. 利用Java进行zip文件压缩与解压缩(2)
        3. Java定位PDF中关键字的坐标(2)
        4. Excel转html工具类(2)
        5. Excel导入工具类(2)
        推荐排行榜
        1. 浏览器控制台报错js文件net::ERR_ ABORTED 404原因之一(3)
        2. SpringMVC文件下载(3)
        3. Linux各文件颜色的含义(2)
        4. poi读取excel导入的纯数字为double类型(1)
        5. JsonUtil工具类(1)
        最新评论
        1. Re:Java定位PDF中关键字的坐标
        请问 为什么只能查找单个字符呢 多个字符怎么查找

        --小七9426
        2. Re:Java根据PDF中的关键字位置判定PDF文件是否合法
        CustomRenderListener呢

        --小不丶啊
        3. Re:利用Java进行zip文件压缩与解压缩
        @独钓一江秋 fos.close();去掉，_zipOut.close();已经有关闭流的操作，...
        --Magic-Dev
        4. Re:利用Java进行zip文件压缩与解压缩
        fos.close();
        _zipOut.close();
        顺序要交换下，按申明创建时的顺序收尾
        不然文件流会不完整

        --独钓一江秋
        5. Re:Java定位PDF中关键字的坐标
        请问你输出的坐标,在pdf上有偏移嘛?

        --浅慕流觞
        Copyright © 2023 AlphaJunS
        Powered by .NET 7.0 on Kubernetes
      </vux-collapse-item>
    </vux-collapse>
  </div>
</template>

<script>
import VuxCollapse from "@/packages/collapse/src";

export default {
  name: "Collapse",
  data() {
    return {
      activeNames: ['1']
    }
  },
  components: {VuxCollapse}
}
</script>

<style scoped>

</style>