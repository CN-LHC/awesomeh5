//接口协议代码
;(function () {
    var api = {
        commandQueue:[],
        cmdQueue : {},
        index:0,
        mNativeFunction:{}
    };
    var protocol = "beacon";

    api.os = function(){
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        var os = {};
        if (iphone) os.ios = os.iphone = true;
        if (ipad) os.ios = os.ipad = true;
        return {ios:os.ios};
    };

    api.getCookie = function(name) {
        var regexp = new RegExp("(?:^" + name + "|;\\s*" + name + ")=(.*?)(?:;|$)", "g");
        var result = regexp.exec(document.cookie);
        return (result === null) ? null : unescape(result[1]);
    };

    api.exec = function(cmd,option,callback){
        api.index+=1;
        var callbackId = new Date().getTime()+"|"+api.index;
        option = option||{};
        api.cmdQueue[callbackId] = callback;
        var nativeOption = {
            callbackId:callbackId,
            option:option
        };
        //ios 1.0版本的时候接口调用方式用的是prompt  后改成iframe  识别方式是通过cookie中的version  1.0之后cookie中会添加版本号
        //if(api.os().ios&&api.getCookie("version")!= null){
        //    nativeOption.cmd = cmd;
        //    api.commandQueue.push(JSON.stringify(nativeOption));
        //    var apiContent =  protocol+"://api?cmd="+cmd;
        //    if(api.commandQueue.length == 1){
        //        if(!api.Bridge){
        //            api.Bridge = api.createBridge();
        //        }
        //        api.Bridge.src = apiContent;
        //    }
        //}else{
        var apiContent =  protocol+"://["+cmd+"-"+JSON.stringify(nativeOption)+"]";
        prompt(protocol,apiContent);
        //}
    };

    //api.getAndClearQueuedCommands = function(){
    //    var json = JSON.stringify(api.commandQueue);
    //    api.commandQueue = [];
    //    return json;
    //}
    //
    //api.createBridge = function () {
    //    var bridge = document.createElement("iframe");
    //    bridge.setAttribute("style", "display:none;");
    //    bridge.setAttribute("height", "0px");
    //    bridge.setAttribute("width", "0px");
    //    bridge.setAttribute("frameborder", "0");
    //    document.documentElement.appendChild(bridge);
    //    return bridge;
    //};

    window.AppCallback = function(callbackId,option){
        if(api.cmdQueue[callbackId])
        {
            api.cmdQueue[callbackId](option);
        }
    };

    window[protocol+"Api"] = api;

    //客户端预埋接口
    window.ReqWeb = function (key, value) {
        if(api.mNativeFunction[key] != undefined ){
            api.mNativeFunction[key](value);
        }
    };

    //监听native
    window.lisenNative = function (key, func) {
        api.mNativeFunction[key] = func;
    };
})();
(function(){
    var beacon = {};
    var isIos = beaconApi.os().ios;
    var from = getQueryString("dt_from");

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null){
            var value = r[2];
            value = value.replace(/(%22|%3E|%3C|<|>)/g, "MM");
            return decodeURIComponent(value);
        }else{
            return null;
        }
    }

    beacon.checkIfCanUseApi = function(){
        if(from == "web"||from == "nod"){
            return false;
        }else{
            return true;
        }
    }

    beacon.setTitle = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }

        if(isIos) {
            beaconApi.exec("setTitle",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.setTitle(option.title);
            }catch (e){}
            callBack({});
        }
    };

    beacon.netInfo = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("netInfo",option,function(data){
                callBack(data);
            });
        }else{
            try {
                var data=NativeProxy.netInfo();
                data=JSON.parse(data);
                callBack(data);
            }catch (e){}
        }
    };

    beacon.openSharePanel = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("openSharePanel",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.openSharePanel(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.showSharePanel = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("showSharePanel",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.showSharePanel(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.openLoginPanel = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("openLoginPanel",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.openLoginPanel(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.closeWindow = function(option,callBack){  //特别注意ios用closeWindow   安卓用finish
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("closeWindow",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.finish();
            }catch (e){}
            callBack({});
        }
    };

    beacon.getAccountInfo = function(option,callBack){
        //为pc端调试用
        callBack({
            AID: 668585,
            GUID: '',
            DUA: '',
        });

        if (isIos) {
            beaconApi.exec("getAccountInfo", option, function (data) {
                //终端得到的字段转成后台统一字段，特别注意DUA需要encodeURIComponent
                callBack({
                    AID: data.dtid,
                    GUID: data['DT-GUID'],
                    // DUA: encodeURIComponent(data['DT-UA']),
                    DUA: data['DT-UA'],
                    IMEI: data.IMEI,
                    ticket: data.dtticket,
                    dtCellphoneState: data.dtCellphoneState,
                    dtnickname: data.dtnickname,
                    dtheadimgurl: data.dtheadimgurl,
                    dtMemberType: data.dtMemberType,
                    dtMemberEndTime: data.dtMemberEndTime,
                    iosChecking: data.iosChecking,
                    dtUserRealName: data.dtUserRealName,
                    dtUserIDNumber: data.dtUserIDNumber,
                    isBindWeChat: data.isBindWeChat
                });
            });
        } else {
            try {
                var accountInfo = NativeProxy.getAccountInfo();
                //$.mobileConsole(accountInfo);
                if (typeof accountInfo != "object") {
                    accountInfo = JSON.parse(accountInfo);
                }
            } catch (e) {
                // $.mobileConsole(e);
                accountInfo = {
                    dtticket: "5akc9-OczQKhragY3VepKmkSgqelqpuKxOXjNlDnpZA.",
                    dtid: 18900,
                    "DT-GUID": "",
                    "DT-UA": "",
                    dtCellphoneState: 1,
                    dtnickname: '',
                    dtheadimgurl: '',
                    dtMemberType: '',
                    dtMemberEndTime: '',
                    dtUserRealName: '',
                    dtUserIDNumber: ''
                };
            }
        }
    };

    beacon.sendInfoToNative = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("sendInfoToNative",option,function(data){
                callBack(data);
            });
        }else{

        }
    };

    beacon.sendCopyInfo = function(option,callBack){   ///{text:'ffff'}
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("sendCopyInfo",option,function(data){
                callBack(data);
            });
        }else{
            try {
            NativeProxy.sendCopyInfo(option.url);
            }catch (e){}
            callBack({});
        }
    };

    beacon.openPdfFileBySystem = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("openPdfFileBySystem",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.openPdfFileBySystem(option.url);
            }catch (e){}
            callBack({});
        }
    };

    beacon.isPdfFileExists = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("isPdfFileExists",option,function(data){
                callBack(data);
            });
        }else{
            try {
                var isCached = NativeProxy.isPdfFileExists(option.url);
            }catch (e){
                isCached = false;
            }
            if(isCached){
                callBack({status:0});
            }else{
                callBack({status:-1});
            }
        }
    };

    beacon.downloadFile = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("downloadFile",option,function(data){
                callBack(data);
            });
        }else{
            try {
            NativeProxy.downloadFile(option.url);
            }catch (e){}
            callBack({});
        }
    };

    beacon.setRefreshButtonAnim = function(option,callBack){  //option status=1 开始动画  0停止动画
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            // $.mobileConsole(2);
            beaconApi.exec("setRefreshButtonAnim",option,function(data){
                callBack(data);
            });
        }else{
            try {
            NativeProxy.setRefreshButtonAnim(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.getAllSearchHistoryItem = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("getAllSearchHistoryItem",option,function(data){
                callBack(data);
            });
        }else{
            try {
                var historyData=NativeProxy.getAllSearchHistoryItem(JSON.stringify(option));
            }catch (e){
                var historyData = [];
            }
            callBack(JSON.parse(historyData));
        }
    };

    beacon.addSearchHistoryItem = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("addSearchHistoryItem",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.addSearchHistoryItem(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.clearSearchHistoryItem = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("clearSearchHistoryItem",option,function(data){
                callBack(data);
            });
        }else{
            try {
            NativeProxy.clearSearchHistoryItem(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.getAllPortfolio = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("getAllPortfolio",option,function(data){
                callBack(data);
            });
        }else{
            var portfolioData=NativeProxy.getAllPortfolio(JSON.stringify(option));
            callBack(JSON.parse(portfolioData));
        }
    };

    beacon.addPortfolio = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("addPortfolio",option,function(data){
                callBack(data);
            });
        }else{
            try {
            NativeProxy.addPortfolio(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    beacon.setWebViewTitleBar = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }

        var bottomArray = [];
        var leftArray = [];
        var rightArray = [];
        var middleArray = [];
        for(var i=0,j=option.length;i<j;i++){
            if(option[i].position == "left"){
                leftArray.push(option[i]);
            }else if(option[i].position == "right"){
                rightArray.push(option[i]);
            }
            else if(option[i].position == "middle"){
                middleArray.push(option[i]);
            }else if(option[i].position == "bottom"){
                bottomArray.push(option[i]);
            }
        }
        var optionArray = [];
        optionArray.push({"position" : "left",option:leftArray});
        optionArray.push({"position" : "right",option:rightArray});
        optionArray.push({"position" : "middle",option:middleArray});
        optionArray.push({"position" : "bottom",option:bottomArray});

        //backButton closeButton shareButton refreshButton rightTextButton
        if(isIos) {
            beaconApi.exec("setWebViewTitleBar",optionArray,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.setWebViewTitleBar(JSON.stringify(optionArray));
            }catch (e){}
            callBack({});
        }
    };
    //统计使用
    beacon.reportAction = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("reportAction",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.reportAction(JSON.stringify(option));
            }catch (e){}
            callBack({});
        }
    };

    //开启允许长按
    beacon.setLongClickEnabled = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("setLongClickEnabled",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.setLongClickEnabled(option);
            }catch (e){}
            callBack({});
        }
    };

    //投顾项目提交文字是否解锁
    beacon.entryLock = function(option,callBack){
        if(!this.checkIfCanUseApi()){
            return;
        }
        if(isIos) {
            beaconApi.exec("entryLock",option,function(data){
                callBack(data);
            });
        }else{
            try {
                NativeProxy.entryLock(option);
            }catch (e){}
            callBack({});
        }
    };
    window.beacon = beacon;
}());



