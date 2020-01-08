var MODE=0;

function CloseApp() {
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
    app.launchApp("支付宝");
    //text("蚂蚁森林").waitFor();
    toast("启动完成");
    sleep(1000);
    
    className("android.widget.TextView").text("付钱").waitFor();
    //bounds(33,103,843,180).click();
    className("android.widget.ViewFlipper").click();
    sleep(1000);
    className("android.widget.TextView").desc("搜索").waitFor();
    //bounds(231,76,905,207).setText("蚂蚁森林");
    className("android.widget.EditText").setText("蚂蚁森林");
    sleep(500);
    className("android.widget.FrameLayout").desc("搜索").click();
    className("android.widget.TextView").text("蚂蚁森林，为你在荒漠种下一棵真树").waitFor();
    sleep(500);
    //bounds(44,757,291,996).click();
    className("android.widget.FrameLayout").clickable(true).depth(13).indexInParent(0).drawingOrder(1).click();
    toast("进入森林中...");
    var cnt = 0;
    while(cnt++<5)
    {
        sleep(500);
        if(className("android.view.View").text("社区生活 - 生活号").exists())
        {
            back();
            break;
        }
    }
    className("android.widget.Button").text("背包").waitFor();
    sleep(1000);
    toast("进入完成");
}

function RunApp(){
    EnterApp();
      while(true){
        var dates = new Date();
        if(dates.getHours() == startTime[0] && dates.getMinutes() - startTime[1] >=0 && dates.getMinutes() - startTime[1] < 2)
        {
            MyPower();
        }
        else if(dates.getHours() == endTime[0] && dates.getMinutes() == endTime[1])
        {
            toast("结束");
            //exit();
            break;
        }
        else
        {
            toast("未到时间");
            sleep(5000);
        }
    }
}

function MyPower(){
    do {
        var powerList = className("android.widget.Button").textStartsWith("收集能量").find();
            powerList.forEach(function(item){
            press(item.bounds().centerX(), item.bounds().centerY(), 80);
            //item.click();
            toast("收取一次");
            sleep(200);
            });
    } while (powerList.length);
    toast("未成熟");
    sleep(500);
}

function FriendPower(){
    EnterApp();
    className("android.view.View").text("查看更多好友").findOne().click();
    className("android.view.View").text("周排行榜").waitFor();
    sleep(1000);
    
    var cnt = 0;
    while(!className("android.view.View").text("邀请").exists() && cnt<30) // 请根据好友数修改此cnt数字(30)！！！
    {
        className("android.webkit.WebView").scrollDown();
        sleep(500);
        cnt ++;
    }
    
    lists=className("android.view.View").depth(14).find();
    if(lists.empty())
        console.log("empty");
    var index = 0;
    toast(lists.length);
    lists.forEach(function(item){
        if(index++>=2)
        {
            item.click();
            var cnt = 0;
            while(cnt<5)
            {
                if(className("android.widget.Button").text("浇水").exists())
                {
                    sleep(1000);
                    MyPower();
                    back();
                    sleep(1000);
                    break;
                }
                cnt ++;
                sleep(500);
            }
            sleep(1000);
        }
    });
}

function main(){
  device.wakeUp();
  sleep(1000);
  swipe(500,1800,500,500,100);
  sleep(1000);
  gesture(1000, [540,1425], [250,1700],[560,1700],[540,2020],[840,1700]);
  sleep(1000);
  RunApp();
  if(MODE==2)
      FriendPower();
  exit();
}

function selectMode(){
    var options = ["定时收自己", "马上收好友能量", "定时收自己再收好友"]
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
alert("使用须知", "需开启无障碍服务、通知栏权限，音量下键可中止脚本；本程序监听状态栏自动启动，支持自动亮屏解锁，并在指定时间内检查能量。");
alert("注意", "初次使用，程序中main()中的gesture()函数，是解锁功能，需要修改成自己的锁屏手势。可通过打开开发者选项中的指针位置查看坐标。");
setScreenMetrics(1080, 2340);  // 若无法点击，尝试注释这行！！！

selectMode();
if(MODE==1)
{
    FriendPower();
    exit();
}

console.show();
var startTime = console.rawInput("请输入能量开始查询时间，如7.23:").split(".");
var endTime = console.rawInput("请输入能量开始查询时间，如7.25:").split(".");
console.log(">> 开始时间: "+startTime);
console.log(">> 结束时间: "+endTime);
sleep(1000);
console.hide();

toast("开始");
events.observeNotification();
events.on("notification", function(n){
    log("收到新通知:\n 标题: %s, 内容: %s, \n包名: %s", n.getTitle(), n.getText(), n.getPackageName());
    if(n.getPackageName()=="com.eg.android.AlipayGphone")
    {
      if(n.getTitle()=="你的能量快成熟了")
        main();
    }
});


threads.start(function(){
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function(keyCode, events){
        //音量键关闭脚本
        if(keyCode == keys.volume_down){
           // exit();
        }
    });
});
events.on("exit", function(){
    toast("脚本已结束");
});
