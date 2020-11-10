const Web3 = require('web3')

const cliArgs = process.argv.slice(2)
let argsJson = JSON.parse(cliArgs[0])

// argsJson = {
//     url:'https://mainnet.infura.io/v3/9f6a637d47204ebf8d6dc1663f0eeee3',
//     abi:[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
//     contract:'0xe41d2489571d322189246dafa5ebde1f4699f498',
//     data:["0xD7C866d0D536937bF9123E02F7C052446588189f"],
//     method:"balanceOf",
//     type:"call"
// }

// argsJson = {
//     url:'https://mainnet.infura.io/v3/9f6a637d47204ebf8d6dc1663f0eeee3',
//     abi:[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
//     contract:'0xe41d2489571d322189246dafa5ebde1f4699f498',
//     data:["0xD7C866d0D536937bF9123E02F7C052446588189f",1000000000000000],
//     method:"transfer",
//     type:"encodeABI"
// }


if ( 
	!argsJson.hasOwnProperty("url") ||
	!argsJson.hasOwnProperty("contract") ||
	!argsJson.hasOwnProperty("abi") ||
	!argsJson.hasOwnProperty("method") ||
    !argsJson.hasOwnProperty("data") ||
    !argsJson.hasOwnProperty("type")    
	) {

	console.log( JSON.stringify({
		result:"error",
		message:"Please provide url, contract, adi, method, type, and data."
	}) )

	process.exit()

}

let web3 = new Web3(argsJson.url);
let contract = new web3.eth.Contract(argsJson.abi,argsJson.contract)

if ( argsJson.type == "encodeABI" ){
    let result = contract.methods[argsJson.method](...argsJson.data)[argsJson.type]()
    console.log( JSON.stringify({
        result:"success",
        message:result
    }) )
} else {
    contract.methods[argsJson.method](...argsJson.data)[argsJson.type]().then(function(result){
        console.log( JSON.stringify({
            result:"success",
            message:result
        }) )
    })
}


