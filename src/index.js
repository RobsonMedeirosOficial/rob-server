const Websocket = require("ws")
const port = process.env.PORT || 3000
const wss = new Websocket.Server({port:port},()=>{
console.log("Server started!");
})

wss.on('connection',(ws)=>{
    ws.on('message',(data)=>{
        //ws.send("RECEBIDOOOOOOO");
        console.log("OBJ: ------------------------");       
        // Teste -----------------------------------
        //Cria objeto para receber dados do cliente
        const obj = {
            playerName:'None',
            lives:1,
            health:1
        }

        // Recebe dados do cliente
        const b = JSON.parse(Buffer.from(data)); 

        // Monta o objeto com as informações recebida do cliente
        obj.playerName = b.playerName+'(Server)'+port;
        obj.lives = b.lives*2;
        obj.health = b.health;
        console.log(obj);
        

        // Converte o objeto em string antes de enviar para o cliente
        var objeto = obj;
        var strData = JSON.stringify(objeto);
       
        // envia para o cliente
       
        ws.send(strData);
        
    })
})

wss.on('listening',()=>{
    console.log("Server listening on port " + port);
})

