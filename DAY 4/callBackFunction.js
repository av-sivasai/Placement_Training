function display(result){
    console.log(result);
}
function add(a,b,callback){
    let sum = a + b;
    callback(sum);
}
add(5,10,display);