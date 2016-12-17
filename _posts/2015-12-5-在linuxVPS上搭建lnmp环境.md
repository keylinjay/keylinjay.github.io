---
layout: post
title: 在linuxVPS上搭建lnmp环境
category: [运维,教程]
tags: [运维,vps,lnmp]
---

# 本文主要记录笔者这几天搭建lnmp环境的一些心得，老鸟菜鸟均勿看。
首先，先找到一台vps，对，是vps不是主机，如果你是个大学生，恭喜你可以试试腾讯的校园云计划申请一个（免费到毕业哦）。另外阿里云的这个虚拟主机两年也不错。感兴趣的可以[点这里](http://wanwang.aliyun.com/hosting/free/)碰碰运气。ps:这个是主机不是vps。哈哈

## 本次lnmp搭建的过程是在centos上完成的。
1、创建一个下载目录，`cd /home/`,`mkdir download`,`cd /home/download`一般我在我们用来下载lnmp一建安装包。没错就是军哥的一键安装包。首先安装screen，话不多说，命令如下：直接`yum install screen`，然后`screen -S lnmp`。随后一建安装`wget -c http://soft.vpser.net/lnmp/lnmp1.2-full.tar.gz && tar zxf lnmp1.2-full.tar.gz && cd lnmp1.2-full && ./install.sh lnmp`。然后按要求选择，会让你输入数据库的管理密码。安装完成后会默认生成一个www的用户组和www的用户。网站默认目录是`/home/wwwroot/defaut`，但是我们也可以自己改变目录。在`/usr/local/nginx/conf/nginx.conf`，直接`vi /usr/local/nginx/conf/nginx.conf`找到目录就可以更改了。
2、管理数据库
进入PHPmyadmin创建自己的一个数据库，或者用现有的数据库都可以，给数据库创建一个新管理员，记住数据库的名字，用户名和密码。
3、给www用户权限
输入`chown -R www /home/wwwroot/defaut`。这里解释下664的意思。664假设为ABC,其中A、B、C各为一个数字，分别表示User、Group、及Other的权限。引用一下[百度知道的答案](http://zhidao.baidu.com/link?url=VP1GHkNSPdcNnG4aFE--sO7k3ZR7CiifMXHxkD-vdKF2A4uEmjMgzc1K2Vj_jaBf9VXJy4HvUM2XNjubBIYQB_)


> A、B、C这三个数字如果各自转换成由“0”、“1”组成的二进制数，则二进制数的每一位分别代表一个角色的读、写、运行的权限。比如User组的权限A：
>
> 如果可读、可写、可运行，就表示为二进制的111，转换成十进制就是7。 如果可读、可写、不可运行，就表示为二进制的110，转换成十进制就是6。
> 如果可读、不可写、可运行，就表示为二进制的101，转换成十进制就是5。 “堕落Kiss”所说的“4=r,2=w,1=x”的意思是： r
> 代表读，w 代表写，x 代表执行， 如果可读，权限是二进制的100，十进制是4； 如果可写，权限是二进制的010，十进制是2；
> 如果可运行，权限是二进制的001，十进制是1； 具备多个权限，就把相应的 4、2、1 相加就可以了： 若要 rwx 则 4+2+1=7 若要
> rw- 则 4+2=6 若要 r-x 则 4+1=5 若要 r-- 则 =4 若要 -wx 则 2+1=3 若要 -w- 则 =2 若要
> --x 则 =1 若要 --- 则 =0 为不同的角色分配不同的权限，放在一起，就出现 777、677这样的数字了。 你也可以用 chmod u+x file 的方式为User组添加运行权限。 详细信息，看看 chmod 的帮助吧。

========================================================================

4、安装wordpress
[官方教程点这个](http://codex.wordpress.org.cn/WordPress%E7%9A%84%E5%AE%89%E8%A3%85%E8%BF%87%E7%A8%8B)，`cd /home/wwwroot/defaut`,`wget http://wordpress.org/latest.tar.gz && tar -xzvf latest.tar.gz`，在浏览器输入`http://ip或者域名/wordpress/wp-admin/setup-config.php`，系统会让你设置config.php这个文件，跟着向导走。
5、设置wordpress为默认网站根目录
两个办法，1、直接把wordpress目录里的文件复制到default目录，2、`vi /usr/local/nginx/conf/nginx.conf`找到目录更改为wordpress目录。切记改完之后要重启ngiux服务`/usr/local/nginx/sbin/nginx -s reload` 或者分两步`cd /usr/local/nginx/sbin`，`./nginx -s reload`。
6、解决wordpress主题只显示一个的问题。
解除ngiux禁用的scandir函数，直接`vi /usr/local/php/ect/php.ini`。查找scandir，在disable里删除就好了。切记重启php服务，`/etc/init.d/php-fpm restart`。如果重启失败，请往下看
首先要找到php-fpm.conf配置文件，查看pid的配置路径(不是安装路径)，然后把下面对应的地方改掉才能正常执行。

> [root@DO-SG-H1 ~]# ps aux | grep php-fpm    root     11799  0.0  0.0
> 103248   880 pts/0    S+   13:51   0:00 grep --color php-fpm root    
> 11973  0.0  0.0 417748   964 ?        Ss   Jun01   0:20 php-fpm:
> master process (/etc/php-fpm.conf)
>
> cat /etc/php-fpm.conf 看到 pid = /var/run/php-fpm/php-fpm.pid
>
> php-fpm 启动： /usr/local/php/sbin/php-fpm php-fpm 关闭： kill -INT `cat
> /var/run/php-fpm/php-fpm.pid` php-fpm 重启： kill -USR2 `cat
> /var/run/php-fpm/php-fpm.pid`
>
> 查看php-fpm进程数： ps aux | grep -c php-fpm

7、解决wordpress是英文的问题。
在wordpress目录打开config.php，找到define('WPLANG', '');一行，在第二个参数处填入zh_CN，变成define('WPLANG', 'zh_CN');并保存文件。如果找不到，直接添加一行define('WPLANG', 'zh_CN');就可以了。然后进入你的站点后台会让你更新中文的。
