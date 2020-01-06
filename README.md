# Ant_Forest  
蚂蚁森林自动收能量，支持自动解锁和自动触发  

#### 补充  
1、脚本实现功能> 启动后，脚本处于监听状态，注意开启保护，不要被后台关闭了。一般能量每天都是同一个时间点成熟，成熟后会通知栏发出通知(下面有说怎么在蚂蚁森林里开启通知)，脚本监听到该通知后，就会自动触发启动，点亮屏幕，解锁，进入蚂蚁森林。这时候，就需要用到你设置的时间了。因为是提前一分钟进入，所以能量还没成熟，但脚本会一直戳屏，直到到你设置的结束时间。  

2、所以输入时间并启动后，虽然没有任何动静，但只要不报错，一般就可以了；  

3、如果想立即看到效果，可以在这里添加RunApp();后再运行：  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/7.png)

#### 注意：  
1、自动触发功能  
要打开设置的，看下图  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/1.png)
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/2.png)

2、自动解锁功能：  
初次使用，程序中main()中的gesture()函数，是解锁功能，需要修改成自己的锁屏手势。可通过打开开发者选项中的指针位置查看坐标。
（如果不改呢，就只是不能解锁而已，其他没影响）
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/3.png)  

3、效果演示：   
https://github.com/1061700625/Ant_Forest/blob/master/%E6%95%88%E6%9E%9C%E6%BC%94%E7%A4%BA.avi


4、下载源码  
  
5、导入并允许  
解压源码后，放到手机存储下的“脚本”目录；也可以是其他的，记得就行  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/4.png)  
  
打开autojs app，点击导入  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/5.png)  
  
6、然后改锁屏手势的坐标，之后就可以运行了  

github：https://github.com/1061700625/Ant_Forest
  
5、附：  
（1）输入时间处，点“确定”按钮左边的横线位置，就会弹出键盘  
（2）打开无障碍功能和autojs左边栏“通知栏权限”  
![image](https://github.com/1061700625/Ant_Forest/blob/master/pic/6.jpg)
