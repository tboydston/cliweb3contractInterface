Node JS Web3.js basic CLI contract interface. 

# Example JSON

``

// Get token balance

{
    url:RPCURL,
    abi:ABI',
    data:["0x000000000000000000"],
    method:"balanceOf",
    type:"call"
}

// Create data for token signing and transfer.

{
    url:RPCURL,
    abi:ABI',
    data:["0x000000000000000000"],
    method:"transfer",
    type:"encodeABI"
}


``


# Example Usage

`node index.js '{url:RPCURL,abi:ABI',data:["0x000000000000000000"],method:"balanceOf",type:"call"}`

# Result 

`{"result":"success","message":{DATA}}`

or 

`{"result":"error","message":{DATA}}`