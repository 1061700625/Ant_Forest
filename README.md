# Ant_Forest  
蚂蚁森林自动收能量，支持自动解锁和自动触发  
目前支持收自己的、收好友能量  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/10.png)   

## QQ群
913182235 
  
（不知道是不是只有我这样，蚂蚁森林好友列表的界面布局变了，因此程序定位不到元素，导致卡在好友列表界面无响应；话说支付宝的动作这么迅速的吗）  

！！！好了，针对上面的问题，本次版本中已修复。  
由于基于控件已无法收取好友能量，因此修改为通过图片比对然后click，因此需要小手图片和安卓7及以上(大家都是9以上了吧)，文件都已传到网盘。  
  
0、效果演示：  
https://github.com/1061700625/Ant_Forest/blob/master/%E6%95%88%E6%9E%9C%E6%BC%94%E7%A4%BA.avi  
![image](https://github.com/1061700625/Ant_Forest/blob/master/%E8%A7%86%E9%A2%91%E6%BC%94%E7%A4%BA.gif)  

1、脚本实现功能
启动后，脚本处于监听状态，注意开启保护，不要被后台关闭了。一般能量每天都是同一个时间点成熟，成熟后会通知栏发出通知(下面有说怎么在蚂蚁森林里开启通知)，脚本监听到该通知后，就会自动触发启动，点亮屏幕，解锁，进入蚂蚁森林。这时候，就需要用到你设置的时间了。因为是提前一分钟进入，所以能量还没成熟，但脚本会一直戳屏，直到到你设置的结束时间。所以输入时间并启动后，虽然没有任何动静，但只要不报错，一般就可以了；

2、下载源码和autojs app

2.5 、解压小手图片并放到自己能记住的路径下，等会要填到程序里的findImg()！！  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/11.png)

3、解压并导入到app
解压源码后，放到手机存储下的“脚本”目录；也可以是其他的，记得就行  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/4.png)   
打开autojs app，点击导入  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/5.png)  

4、打开蚂蚁森林能量提醒功能  
进入蚂蚁森林，点右上角“...”，进入设置，开启提醒  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/1.png)
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/2.png)
 
5、打开无障碍服务、通知权限  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/7.png)  
点击后如有跳转，就对应的完成设置  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/8.png)  

6、将autojs加入电池白名单、保护锁定，防止被后台关闭（这个大家都会的吧）  

7、初次使用，程序中main()中的gesture()函数，是解锁功能，需要修改成自己的锁屏手势。  
如果不改呢，就只是不能解锁而已，其他没影响  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/3.png) 

可通过打开开发者选项中的指针位置查看坐标。  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/9.png)

8、运行脚本即可

9、由于是通过蚂蚁森林通知触发，所以输入时间并启动后，虽然没有任何动静，但只要不报错，一般就可以了；
输入时间处，点“确定”按钮左边的横线位置，就会弹出键盘。
如果想立即看到效果，可以在这里添加RunApp();后再运行：




10、如果想测试解锁，在这里加条语句  
```
sleep(2000);  
main();  
```
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/6.png)

然后按照点击运行、输入时间、锁屏，静待手机自动解锁

11、报错情况  
可能是通知栏权限没开  
可能是无障碍服务没开  
  
12、进入支付宝后无反应  
无障碍服务是否开启  
是否安卓7.0及以上  
更新下支付宝

欢迎评论留言
github：https://github.com/1061700625/Ant_Forest
