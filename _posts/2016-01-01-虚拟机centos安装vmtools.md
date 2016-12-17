---
layout: post
title: 在虚拟机centos中安装vmtools
category: [运维,教程]
tags: [运维,vps,虚拟机,centos,vmtools]
---


* toc
{:toc}

## 写在前面

#### 为什么要安装vmtools？
因为它可以改善 Virtual Machine 的运行性能，而且可以让 Host OS 和 Guest OS 互通有无，这样我们就不用伤脑筋，要架设什么服务器，来沟通两个 OS，现在就让我们开始吧！
---

## 安装环境
- VMware12.1pro
  - centos7.1x64minimal系统

## 准备安装条件

- ### 1.检查必要的工具包
执行命令`yum -y install perl gcc gcc-c++ automake make kernel kernel-headers kernel-devel`

- ### 2.校验内核版本和内核头文件版本是否一致

执行命令：

    uname -r  //显示内核版本号
    rpm -qa | grep kernel //显示内核头文件版本号，如果版本不一致继续往下执行
    yum -y update kernel  //哪个版本低升级哪个，总之两个要一样的版本号

- ### 3.最重要的一点--重启

一定要重启。一定要重启。一定要重启。重要的事情说三遍！
为什么一定要重启？
**因为，linux是运行在内核上的，如果当前运行的旧的内核升级了内核，刚刚的升级内核并没有开始工作。此时无法切换到新的内核系统，也无法删除旧的内核。需要重新启动切换到新的内核系统才可以。**

## 安装过程
```
mkdir /root/cdrom  /*建立挂载目录*/
mount -t auto /dev/cdrom /root/cdrom   /*挂载到目录*/
cp -a /root/cdrom/* /home/key/        /*将光驱内容复制到key文件夹*/
cd /home/key/cdrom
tar zxvf [文件名]
cd  [文件名]
./vmware-install.pl   //执行安装文件
```
安装过程一路默认即可，没问题会显示如下

    /etc/init.d/network start
    Enjoy,
    –the VMware team

### 完毕，请重启。`reboot`
