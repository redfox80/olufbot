import botsettings from '../../botsettings.json';

export default function(message) {

    let commands = [
        {
            name: "help",
            desc: "Shows this message"
        },
        {
            name: "fuckme",
            desc: "Yaaas!"
        },
        {
            name: "amisexy",
            desc: "Oluf never lies, answers are final!"
        }
    ];

    let help = "```You can use the following commands";

    for(let y = 0; y < commands.length; y++) {
        help = help + "\n\n" + botsettings.prefix + commands[y].name + "\n" + commands[y].desc; 
    }

    help = help + "```";

    message.author.send(help);
    message.react("✅");
}