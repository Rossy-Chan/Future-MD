
import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

var salah_input = "*Example:*\n" + usedPrefix + command + " cyberpunk \n*[ Menampilkan list gambar cyberpunk ]*\n"
if (!text) throw salah_input
try {
    let res = await(await fetch('https://lexica.art/api/v1/search?q=' + text)).json()
    let randm = res.images
    let resul = randm.getRandom()
    
    await m.reply(wait)
    await conn.sendFile(m.chat, resul.src, text, "*[ Result ]*\n" + resul.prompt, m)
    } catch (e) {
    throw eror
    }
}
handler.help = ["lexica"]
handler.tags = ['internet']
handler.command = ["lexica"]

export default handler
