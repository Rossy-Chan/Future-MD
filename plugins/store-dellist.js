let handler = async (m, { text, usedPrefix, command }) => {
	if (!text) return throw "Gunakan *" + usedPrefix + "liststore* untuk melihat daftar pesan yg tersimpan."
	let msgs = global.db.data.msgs
	if (!(text in msgs)) return throw "[ " + text + " ] tidak terdaftar di daftar pesan."
	delete msgs[text]
	return throw "[💬] berhasil menghapus pesan di daftar List dengan nama >\n" + text
}
handler.help = ["store"].map(v => "del" + v + " <teks>")
handler.tags = ["database"]
handler.command = ["delstore"]
handler.group = true
handler.admin = true
export default handler