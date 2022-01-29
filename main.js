const { Intents, Client } = require('discord.js')
const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const { LAMPORTS_PER_SOL } = require("@solana/web3.js");
const anchor = require('@project-serum/anchor');
const { getSite } = require('./helpers');
const Program = require("@project-serum/anchor").Program;
const prefix = "$";


const candyMachineProgramID = new anchor.web3.PublicKey(
    'cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ',
);




bot.on("ready", () => {
    console.log("Bot ready!");
});

bot.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    try {
        if (command === 'info') {
            if (!message.member._roles.includes('911137814559731712')) {
                message.member._roles.forEach(memberRoleId => {
                    if (["933166165906313247","933578474881437747", "911137814559731712"].includes(memberRoleId)) {
                        hasProperRole = true;
                    }
                })
                    
                if (!hasProperRole) {
                    return;
                }
    
                if (message.channel.id !== '933089826360680558') {
                    return;
                }
            }

            let check = async function() {
                try {
                    const candyMachineIdString = args[0]
                    if (!candyMachineIdString.length > 1) {
                        message.reply('Bad CMID!');
                    }
                    const candyMachineId = new anchor.web3.PublicKey(candyMachineIdString);
                    const connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl('mainnet-beta')); //rpcUrl
                    const provider = new anchor.Provider(connection, {
                        preflightCommitment: 'recent',
                    });
                    let idl = await anchor.Program.fetchIdl(candyMachineProgramID, provider);
                    const candyMachineProgram = new Program(idl, candyMachineProgramID, provider);
                    const candyMachine = await candyMachineProgram.account.candyMachine.fetch(candyMachineId);
                    if (candyMachine.error) {
                        console.log("error")
                    };
                    const itemsAvailable = candyMachine.data.itemsAvailable.toNumber();
                    const itemsRedeemed = candyMachine.itemsRedeemed.toNumber();
                    const price = candyMachine.data.price.toNumber() / LAMPORTS_PER_SOL + " SOL";
                    const goLiveDate = candyMachine.data.goLiveDate.toNumber();
                    message.channel.send(`Candy Machine found!!\nPrice: ${price}\nTotal minted: ${itemsRedeemed}/${itemsAvailable}\nGoLiveDate: <t:${goLiveDate}>`)
                } catch (e) {
                    message.channel.send(`${e.message}`)
                }
            }
            check()
        }

        if (command === 'scrape') {
            if (!message.member._roles.includes('911137814559731712')) {
                message.member._roles.forEach(memberRoleId => {
                    if (["933166165906313247","933578474881437747", "911137814559731712"].includes(memberRoleId)) {
                        hasProperRole = true;
                    }
                })
                    
                if (!hasProperRole) {
                    return;
                }
    
                if (message.channel.id !== '933089826360680558') {
                    return;
                }
            }

            let getCandyID = async function () {
                try {
                    const site = args[0];
                    if (!site > 1) {
                        message.reply('Bad URL!');
                    }
                    const candyID = await getSite(site);
                    if (candyID !== "CMID not found!") {
                        message.channel.send(`\nFound Candy Machine!\nCMID: ${candyID}`);
                    } else {
                        message.channel.send(`\nNo CMID found!`);
                    }
                } catch (e) {
                    message.channel.send("Error getting CMID!");
                }
            }
            getCandyID();
        }

        if (command === 'createtask') {
            try {
                let taskId = await createTask();
                message.channel.send(`Task created!\nID: ${taskId}`);
            } catch(e) {
                message.channel.send(`Error creating task!\`\`\`${e.message}\`\`\``);
            }
        }
    } catch (e) {
        console.log(e.message)
    }

});

bot.login("OTI4MTMyMDQ2MjM5NDUzMjE1.YdUUUw.DAmBas7Ap1ROEY4cpyrwBy8cLJg");


async function connectToMongo() {
    
}




async function createTask() {

    return ayo
}