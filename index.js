const jimp = require('jimp')
const express = require('express')
const path = require('path')
const fs = require('fs')
// const { FontManager } = require('font-manager')

// const theFontMgr = FontManager.instance()
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '/')))

var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
console.log("Server Running\n" + path.join(__dirname, '/'))

app.get("/:index", (req, res) => {
    var text = req.query.text
    var index = parseInt(req.params.index)
    console.log(text)

    jimp.read(`./images/${index}.jpg`)
        .then(loadedImage => {
            jimp.loadFont(jimp.FONT_SANS_128_WHITE)
                .then(font => {
                    loadedImage.print(font, loadedImage.bitmap.width/50, loadedImage.bitmap.height/100, text)
                               .write("./images/thumbNew.jpg")
                    var s = fs.createReadStream(path.join(__dirname, '/images/thumbNew.jpg'))
                    s.on('open', () => {
                        res.set('Content-Type', 'image/jpeg')
                        s.pipe(res)
                    })
                    s.on('error', (err) => {
                        console.log(err)
                    })
                })
        })
})

