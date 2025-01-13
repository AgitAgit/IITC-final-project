export function isEmpty(obj:{[key:string]:any}){
    for(var key in obj){
        if(obj.hasOwnProperty(key)) return false;
    }
    return true;
}