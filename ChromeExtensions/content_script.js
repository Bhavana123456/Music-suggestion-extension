let prefix = "chrome-extension-ytskip ";
let get = (key)=>
{
    return window.localStorage.getItem(`${prefix}---${key}`);
};
let set = (key,value)=>
{
    return window.localStorage.setItem(`${prefix}---${key}`,value);
}
let params;
let previousVideoID;
let videoID;
let preformCheck = ()=>{
    console.log(`Video ID: ${videoID}`);
    if(!videoID)
     return;
     let now = Date.now()/(1000*60);
     let lastviewed = get(`last viewed timestamp--${videoID}`);
     let delta = now -lastviewed;
     let frequency = 60*24*7;
     if(delta < frequency * Math.random())
     {
        console.log("video cannot be watched again");
        setTimeout(()=>
        {
            let vid = document.querySelector("video");
            vid.currentTime = vid.duration;
            console.log("video has been ended");
        },3000);
     }else{
        console.log("video ok to watch");
        set(`last viewed timestamp--${videoID}`,`${now}`)
     }
}
let refreshParams =() =>
{
    let urlSearchParams = new URLSearchParams(window.location.search);
    params = Object.fromEntries(urlSearchParams.entries());
    videoID = window.location.pathname =="/watch" ? params.v:undefined;
};
let lastURL = location.href;
new MutationObserver(()=>{
    let url = location.href;
    if(url != lastURL)
    {
        lastURL=url;
    }
    refreshParams();
    if(videoID != previousVideoID)
    {
        previousVideoID = videoID;
        preformCheck();
    }
} ).observe(document,{subtree : true,childList:true});

refreshParams();
preformCheck();