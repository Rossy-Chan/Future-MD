import axios from "axios"
import {
    sticker
} from "../lib/sticker.js"
import wibusoft from "wibusoft"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"

    await m.reply(wait)
    let pp = await conn.profilePictureUrl(m.sender, "image").catch(_ => logo)
    let temas
    if (command == "quotly") {
        temas = "terang"
    }
    if (command == "quotlyv2") {
        temas = "gelap"
    }
    let result = await Quotly(name, pp, text, temas)
    try {
        let out = await wibusoft.tools.makeSticker(result, {
            author: packname,
            pack: name,
            keepScale: true
        })
        await m.reply(out)
    } catch (e) {
        let stick = await sticker(buffer, false, name, packname)
        await conn.sendFile(m.chat, stick, "Quotly.webp", "", m)
    }
}

handler.help = ["quotly", "quotlyv2"]
handler.tags = ["sticker"]
handler.command = ["quotly", "quotlyv2"]

export default handler

async function Quotly(a, b, c, d) {
    let obj
    if (d == "terang") {
        obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": "#FFFFFF",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": a,
                    "photo": {
                        "url": b
                    }
                },
                "text": c,
                "replyMessage": {}
            }]
        }
    }

    if (d == "gelap") {
        obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": "#1b1429",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": a,
                    "photo": {
                        "url": b
                    }
                },
                "text": c,
                "replyMessage": {}
            }]
        }
    }

    const json = await axios.post("https://bot.lyo.su/quote/generate", obj, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    const buffer = Buffer.from(json.data.result.image, "base64")
    return buffer
}