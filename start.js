const Web3 = require('web3')

const cliArgs = process.argv.slice(2)
let argsJson = JSON.parse(cliArgs[0])

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

try{

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

} catch (e){
    console.log( JSON.stringify({
        result:"error",
        message:""
    }) )
}
