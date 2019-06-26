const Delay = function(time,info){
    return new Promise(function(resolve){
        setTimeout(resolve,time,info)
    })
}
const Abandon = function(time,info){
    return new Promise(function(resolve,reject){
        setTimeout(reject,time,info)
    })
}
const BuildKey = function (str) {
    return str.split('').map(i => i.charCodeAt(0).toString(16)).join('')
}
export{
    Delay,
    Abandon,
    BuildKey
}