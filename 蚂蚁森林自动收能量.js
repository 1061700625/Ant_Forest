var MODE=0;


function CloseApp() 
{
    let packageName = currentPackage();
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();  
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(packageName) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

function EnterApp()
{
    toast("启动支付宝")
    app.launchPackage("com.eg.android.AlipayGphone");
    toast("启动完成");
    sleep(1000);
    className("android.widget.TextView").text("付钱").waitFor();
    var res = className("android.widget.TextView").text("蚂蚁森林").findOne();
    press(res.bounds().centerX(), res.bounds().centerY(), 80);
    className("android.widget.Button").text("种树").waitFor();
    toast("进入完成");
}

function RunApp()
{
    EnterApp();
      while(true){
        var dates = new Date();
        var min = dates.getMinutes();
        if(dates.getHours() == startTime[0] && min >= startTime[1] && min < endTime[1]){
            MyPower();
        }
        else if(dates.getHours() == endTime[0] && min >= endTime[1]){
            toast("结束");
            break;
        }
        else{
            toast("未到时间");
            sleep(5000);
        }
    }
}


function getIcon()
{
    if(!files.exists("icon.jpg")){
        var url="http://121.36.68.53/WEB/SHARE/icon.jpg";
        var res = http.get(url);
        if(res.statusCode != 200){
            toast("小手图片请求失败");
        }
        files.writeBytes("icon.jpg", res.body.bytes());
        toast("小手图片下载成功");
    }else{
        toast("小手图片已存在！");
    }
}

var MP_valid = 0;
function MyPower()
{
    var cnt = 0;
    MP_valid = 0;
    while (true){
        var powerList = className("android.widget.Button").textStartsWith("收集能量").find();
        if(!powerList.empty()){                 // 有能量球
            powerList.forEach(function(item){   // 依次点击
                press(item.bounds().centerX(), item.bounds().centerY(), 80);
                toast("收取一次");
                MP_valid += 1;
                sleep(200);
            });
            return MP_valid;
        }else{
            toast("没找到");
        }
        if(cnt++>=5){  // 不管，5轮后退出
            return -1;
        }
    }
}


function findImg(path)
{
    var img = captureScreen();
    while(!img)
    {
        sleep(100);
        img = captureScreen();
    }
    toast("截图完成!");
    var icon = images.read(path);
    var p = findImage(img, icon);
    if(p){
        toast("找到啦:" + p);
    }else{
        toast("没找到");
    }
    return p;
}


function FriendPower()
{
    if(MODE==4 || (MODE==1&&tempM1==1)){        // 进入蚂蚁森林
        EnterApp();    
    }
    
    className("android.view.View").text("查看更多好友").findOne().click();  //进入好友列表界面
    
    if(MODE==4 || MODE==2 || MODE==1){          // 适用：1马上收好友(无限循环)、2定时收自己再收好友、4马上收好友
        sleep(1000);
        toast("好友模式");
        tempM1 = 0;                             // 下次执行本函数，不需要再进入蚂蚁森林
        var icon = images.read("icon.jpg");
        var img_last = null;
        while(true){
            var img = captureScreen();          // 截图
            while(!img){
                sleep(100);
                img = captureScreen();
            }
            toast("截图完成!");
            var p = findImage(img, icon);       // 找小手图片
            if(p){                              // 找到
                toast("找到");
                click(p.x-500, p.y+50);         // 点击进入
                sleep(2000);     
                while(true){
                    if(className("android.view.View").text("TA收取你").exists()){ // 等待进入完成
                        MyPower();              // 收能量
                        sleep(500);
                        back();                 // 返回至好友列表界面
                        sleep(500);
                        break;
                    }
                    sleep(500);
                }
             }
            else{                                           // 未找到小手图片
                if(img_last && findImage(img, img_last)){   // 前后两次截图相等（说明到底部）
                    if(MODE==1){                            // 适用：1马上收好友(无限循环)
                        toast("重复一遍！");
                        while(!className("android.view.View").text("查看更多好友").exists()){
                            back();                         // 返回到上一级
                            sleep(1000);
                        }
                        return;                             // 退出本函数
                    }else{                                  // 适用：2定时收自己再收好友、4马上收好友
                        toast("结束退出！");
                        exit();                             // 结束脚本程序
                    }
                }
                img_last = images.copy(img);                // 保存本次截图内容
                toast("上滑");
                swipe(500,500,500,800,500);                 // 先下滑，以便加载更多好友
                sleep(500);
                swipe(500,1800,500,500,500);                // 上滑
            }
            sleep(500);
        }
    }
}

function main()
{    
  device.wakeUp();
  sleep(500);
  device.wakeUpIfNeeded();
  log(device.isScreenOn());
  sleep(1000);
  swipe(500,1800,500,500,100);
  sleep(1000);
  gesture(1000, [540,1425], [250,1700],[560,1700],[540,2020],[840,1700]);
  sleep(1000);
  RunApp();             // 进入app收自己
  if(MODE==2){          // 适用：2定时收自己再收好友
      FriendPower();
  }
  exit();                // 退出脚本程序
}

function selectMode()
{
    var options = ["定时收自己", "马上收好友(无限循环)", "定时收自己再收好友", "马上收自己","马上收好友"]
    var i = dialogs.select("请选择一个选项(默认第一项)", options);
    if(i >= 0){
        toast("您选择的是" + options[i]);
        MODE = i;
    }else{
        toast("您取消了选择");
        MODE = 0;
    }
}


//程序从这里开始
auto();
alert("使用须知", "需开启无障碍服务、通知栏权限，音量下键可中止脚本；本程序监听状态栏自动启动，自动亮屏解锁，由蚂蚁森林通知触发收能量。");
alert("注意", "初次使用，程序中main()中的gesture()函数，是解锁功能，需要修改成自己的锁屏手势。可通过打开开发者选项中的指针位置查看坐标。");
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
getIcon();

selectMode();
sleep(500);
if(MODE==1 || MODE==4){
    tempM1 = 1;
    while(true){
        FriendPower();
        if(MODE==4)
            break;
    }
    exit();
}


console.show();
var startTime = console.rawInput("请输入能量开始查询时间，如7.23:").split(".");
var endTime = console.rawInput("请输入能量结束查询时间，如7.25:").split(".");
console.log(">> 开始时间: "+startTime);
console.log(">> 结束时间: "+endTime);
sleep(1000);
console.hide();

toast("开始");
if(MODE==3){
    RunApp();    
    exit();
}

        
events.observeNotification();
events.on("notification", function(n){
    log("收到新通知:\n 标题: %s, 内容: %s, \n包名: %s", n.getTitle(), n.getText(), n.getPackageName());
    if(n.getPackageName()=="com.eg.android.AlipayGphone"){
      if(n.getTitle()=="你的能量快成熟了")
        main();
    }
});


threads.start(function(){
    events.observeKey();
    events.on("key_down", function(keyCode, events){
        if(keyCode == keys.volume_down){ // 音量下键关闭脚本
           exit();
        }
    });
});

events.on("exit", function(){
    toast("脚本已结束");
});
