namespace SpriteKind {
    export const ArtıPuan = SpriteKind.create()
    export const EksiPuan = SpriteKind.create()
}
function yönergeMetin (metin: string, metinKutusuNerede: string) {
    if (metinKutusuNerede == "alt") {
        game.showLongText(metin, DialogLayout.Bottom)
    } else if (metinKutusuNerede == "orta") {
        game.showLongText(metin, DialogLayout.Center)
    } else if (metinKutusuNerede == "tamEkran") {
        game.showLongText(metin, DialogLayout.Full)
    }
    music.pewPew.play()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    nesneSayısı = 0
    while (!(nesneSayısı > 0)) {
        game.splash("Seviye Geçmek İçin ", "Toplanması Gereken Kişisel Bilgi Sayısı")
        nesneSayısı = game.askForNumber("Nesne Sayısı Seçiniz", 2)
    }
})
function soruSec (soruNo: number) {
    game.showLongText(sorular[soruNo], DialogLayout.Full)
}
function zorlukSeç () {
    while (!(zorlukSeviye == 1 || (zorlukSeviye == 2 || zorlukSeviye == 3))) {
        game.splash("Zorluk Derecesini Seçiniz", "1)Kolay  2)Orta   3)Zor")
        zorlukSeviye = game.askForNumber("Zorluk Seviyesini Seçiniz", 1)
    }
    if (zorlukSeviye == 1) {
        zorluk(10, 15, true, 10, 5)
        game.splash("KOLAY")
    } else if (zorlukSeviye == 2) {
        zorluk(8, 20, true, 15, 7)
        game.splash("ORTA")
    } else if (zorlukSeviye == 3) {
        zorluk(6, 25, false, 20, 10)
        game.splash("ZOR")
    }
}
function zorluk (can: number, ilkHız: number, canKazansınMı: boolean, hızArtış: number, süreAzalış: number) {
    info.setLife(can)
    akışDeğişim = ilkHız
    canKararı = canKazansınMı
    akışDeğişimMiktarı = hızArtış
    süreDeğişim = süreAzalış
}
function cevapAl (cevap: number, soruNo: number) {
    if (cevap == 1 && (soruNo == 1 || (soruNo == 2 || soruNo == 3))) {
        cevapKarar(true, ekPuan)
    } else if (cevap == 2 && (soruNo == 4 || (soruNo == 5 || soruNo == 6))) {
        cevapKarar(true, ekPuan)
    } else if (cevap == 3 && (soruNo == 7 || (soruNo == 8 || soruNo == 9))) {
        cevapKarar(true, ekPuan)
    } else if (cevap == 4 && (soruNo == 10 || (soruNo == 11 || soruNo == 12))) {
        cevapKarar(true, ekPuan)
    } else {
        cevapKarar(false, ekPuan)
    }
}
info.onCountdownEnd(function () {
    game.splash("Maalesef Süreniz Doldu!")
    game.over(false, effects.dissolve)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EksiPuan, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
    scene.cameraShake(4, 100)
    Arfbot.setImage(img`
        9 9 d . d d d d . d 9 9 
        9 9 d d d d d d d d 9 9 
        9 9 2 2 2 2 2 2 2 2 9 9 
        d 2 2 2 2 2 2 2 2 2 2 d 
        d 2 2 2 9 2 2 9 2 2 2 d 
        d 2 2 9 9 2 2 9 9 2 2 d 
        d 2 2 2 2 2 2 2 2 2 2 d 
        d 2 2 2 9 9 9 9 2 2 2 d 
        d 2 2 9 2 2 2 2 9 2 2 d 
        d d 2 2 2 2 2 2 2 2 d d 
        d d d 2 2 2 2 2 2 d d d 
        . d d d d d d d d d d . 
        . c d d d d d d d d c . 
        c c c c c c c c c c c c 
        . c c c c c c c c c c . 
        `)
    music.buzzer.play()
    pause(200)
    Arfbot.setImage(img`
        9 9 d . d d d d . d 9 9 
        9 9 d d d d d d d d 9 9 
        9 9 8 8 8 8 8 8 8 8 9 9 
        d 8 8 8 8 8 8 8 8 8 8 d 
        d 8 8 9 8 8 8 8 9 8 8 d 
        d 8 8 9 9 8 8 9 9 8 8 d 
        d 8 8 8 8 8 8 8 8 8 8 d 
        d 8 8 9 8 8 8 8 9 8 8 d 
        d 8 8 8 9 9 9 9 8 8 8 d 
        d d 8 8 8 8 8 8 8 8 d d 
        d d d 8 8 8 8 8 8 d d d 
        . d d d d d d d d d d . 
        . c d d d d d d d d c . 
        c c c c c c c c c c c c 
        . c c c c c c c c c c . 
        `)
})
function cevapKarar (cevap: boolean, ekpuan: number) {
    if (cevap == true) {
        info.changeScoreBy(ekpuan)
        music.magicWand.play()
        if (canKararı == true) {
            game.splash("Tebrikler Doğru Cevap!", "+ " + ekpuan + " Puan" + " ve +1 Can")
            info.changeLifeBy(1)
        } else {
            game.splash("Tebrikler Doğru Cevap!", "+ " + ekpuan + " Puan")
        }
    } else {
        music.bigCrash.play()
        game.splash("Maalesef Yanlış Cevap!", "-10 Puan")
        info.changeScoreBy(-10)
    }
    if (soruindex.length == 0) {
        game.splash("TEBRİKLER! ", "Oyunu Bitirmeyi Başardınız. ")
        game.splash("GÜVENLİK VERİMİZDE", "Güvenlik Verimizde v1.0 Created and Designed by Irmak Nisa TURAN. TURAN Game Center @2021. ")
        game.splash("KAYNAKÇA", "Oyunumdaki soruların çoğunluğu Cumhurbaşkanlığı Dijital Dönüşüm Ofisi-Siber Zeka Bilgi Yarışması-İlkokul kategorisinden alınmıştır. https://www.youtube.com/watch?v=ZkIjnGVCP7o")
        game.over(true, effects.confetti)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ArtıPuan, function (sprite, otherSprite) {
    info.changeScoreBy(zorlukSeviye)
    otherSprite.destroy(effects.smiles, 100)
    Arfbot.setImage(img`
        8 8 d . d d d d . d 8 8 
        8 8 d d d d d d d d 8 8 
        8 8 9 9 9 9 9 9 9 9 8 8 
        d 9 9 9 9 9 9 9 9 9 9 d 
        d 9 9 8 9 9 9 9 8 9 9 d 
        d 9 9 8 8 9 9 8 8 9 9 d 
        d 9 9 9 9 9 9 9 9 9 9 d 
        d 9 9 8 9 9 9 9 8 9 9 d 
        d 9 9 9 8 8 8 8 9 9 9 d 
        d d 9 9 9 9 9 9 9 9 d d 
        d d d 9 9 9 9 9 9 d d d 
        . d d d d d d d d d d . 
        . c d d d d d d d d c . 
        c c c c c c c c c c c c 
        . c c c c c c c c c c . 
        `)
    music.playMelody("G D G - - - - - ", 1000)
    Arfbot.setImage(img`
        9 9 d . d d d d . d 9 9 
        9 9 d d d d d d d d 9 9 
        9 9 8 8 8 8 8 8 8 8 9 9 
        d 8 8 8 8 8 8 8 8 8 8 d 
        d 8 8 9 8 8 8 8 9 8 8 d 
        d 8 8 9 9 8 8 9 9 8 8 d 
        d 8 8 8 8 8 8 8 8 8 8 d 
        d 8 8 9 8 8 8 8 9 8 8 d 
        d 8 8 8 9 9 9 9 8 8 8 d 
        d d 8 8 8 8 8 8 8 8 d d 
        d d d 8 8 8 8 8 8 d d d 
        . d d d d d d d d d d . 
        . c d d d d d d d d c . 
        c c c c c c c c c c c c 
        . c c c c c c c c c c . 
        `)
    toplananArtıPuanNesne += 1
})
function sayaç (süre: number) {
    info.startCountdown(süre)
}
info.onLifeZero(function () {
    game.over(false, effects.dissolve)
})
function seviyeGeçiş () {
    süre += 0 - süreDeğişim
    game.splash("" + (seviye + 1) + " . Seviye Başlıyor", "Süren " + süre + " Saniye")
    hız += 100
    seviye += 1
    akışDeğişim += akışDeğişimMiktarı
    karar = true
    ekPuan = süre
    sayaç(süre)
}
function yönergeResim (resim: Image) {
    game.setDialogCursor(resim)
}
function start () {
    game.setDialogFrame(img`
        ..66666666666666666666..
        .6699999999999999999966.
        669911111111111111119966
        699111111111111111111996
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        691111111111111111111196
        699111111111111111111996
        669911111111111111119966
        .6699999999999999999966.
        ..66666666666666666666..
        `)
    game.splash("GÜVENLİK VERİMİZDE", "~Irmak Nisa Turan~")
    music.pewPew.play()
    yönergeMetin("Arfbot ile \"GÜVENLİK VERİMİZDE\" oyunuma hoş geldiniz.", "orta")
    yönergeMetin("Açıklamaları okumak için A tuşuna, hemen oyuna geçmek için aşağı tuşuna basınız.", "orta")
    if (controller.A.isPressed()) {
        yönergeMetin("Oyunun amacı güvenli internet karakteri", "alt")
        yönergeMetin("ARFBOT ile internetten gelen", "alt")
        yönergeMetin("tehditlerden sakınmak,", "alt")
        yönergeMetin("kişisel bilgileri korumaktır. ", "alt")
        yönergeMetin("Şimdi sana tehditleri ve ", "alt")
        yönergeMetin("kişisel bilgileri tanıtayım.", "alt")
        yönergeResim(img`
            . f f f f f f . 
            f 9 9 9 9 9 9 f 
            f 9 9 1 9 9 9 f 
            f 9 1 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            . f f f f f f . 
            `)
        yönergeMetin("Akıllı Telefon, Kişisel Bilgidir", "alt")
        yönergeResim(img`
            . . f f f f f f f f f f f f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            f 1 f 1 1 1 1 1 1 1 1 1 1 f 1 f 
            f 1 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
            f 1 1 1 f 1 1 1 1 1 1 f 1 1 1 f 
            f 1 1 1 1 f 1 1 1 1 f 1 1 1 1 f 
            f 1 1 1 1 1 f 1 1 f 1 1 1 1 1 f 
            f 1 1 1 f 1 1 f f 1 1 f 1 1 1 f 
            f 1 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
            f 1 f 1 1 1 1 1 1 1 1 1 1 f 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f f f f f f f f f f f f . . 
            `)
        yönergeMetin("E Mail, Kişisel Bilgidir", "alt")
        yönergeResim(img`
            . f f f f f f f f f f f f . 
            f f 6 6 6 6 6 6 6 6 6 6 f f 
            f 6 6 f f f 6 6 6 6 6 6 6 f 
            f 6 f f d f f 6 f f f f 6 f 
            f 6 f d d d f 6 6 6 6 6 6 f 
            f 6 f d d d f 6 f f f f 6 f 
            f 6 6 6 d 6 6 6 6 6 6 6 6 f 
            f 6 6 c c c 6 6 f f f 6 6 f 
            f f 6 6 6 6 6 6 6 6 6 6 f f 
            . f f f f f f f f f f f f . 
            `)
        yönergeMetin("Kimlik Kartı, Kişisel Bilgidir", "alt")
        yönergeResim(img`
            . . f f f f . . f f f f . . 
            . f 2 2 2 2 f f 2 2 2 2 f . 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 1 2 2 2 2 2 2 2 2 2 f 
            f 2 1 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            . f 2 2 2 2 2 2 2 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 f . . . 
            . . . . f 2 2 2 2 f . . . . 
            . . . . . f 2 2 f . . . . . 
            . . . . . . f f . . . . . . 
            `)
        yönergeMetin("Yakınların, Kişisel Bilgidir", "alt")
        yönergeResim(img`
            . 2 . . . . . 2 . . . . 2 . 
            2 2 . . . . 2 . . . . . 2 2 
            . . 2 . 3 . 2 2 . a . 2 . . 
            . . . 2 . 2 b 2 2 . 2 . . . 
            . . 3 . 2 2 2 2 2 2 . 2 . . 
            . . . 2 2 2 b 2 2 3 2 . . . 
            . 2 2 3 c 2 2 2 2 2 2 a . 2 
            2 . 2 2 2 2 2 2 c b 2 2 2 . 
            . . . c 2 2 a 2 2 2 2 . . . 
            . . 2 . 2 2 2 2 2 2 . 2 . . 
            . . . 2 . 2 b 2 3 . 3 . . . 
            . . a . 2 . . . . 2 . 2 . . 
            2 2 . . . . . . . . . . 3 2 
            . 2 . . . . . . . . . . 2 . 
            `)
        yönergeMetin("Bilgisayar Virüsleri, Tehdit", "alt")
        yönergeResim(img`
            . . . f . . . . . . . . . . . . f . . . 
            . . . . f . . . . . . . . . . f . . . . 
            . . . . . f . . . f f . . . f . . . . . 
            . . . . . . f . f f f f . f . . . . . . 
            . . . . . . . f 2 2 2 2 f . . . . . . . 
            . . . . f f f f 2 2 2 2 f f f f . . . . 
            . . . f . . f 2 2 2 2 2 2 f . . f . . . 
            . f f . . . f 2 2 2 2 2 2 f . . . f f . 
            f . . . . . f 2 2 2 2 2 2 f . . . . . f 
            . . . . . f f f 2 2 2 2 f f f . . . . . 
            . . . . f . . f f 2 2 f f . . f . . . . 
            . . . f . . . . f f f f . . . . f . . . 
            . . . f . . . . . . . . . . . . f . . . 
            . . f . . . . . . . . . . . . . . f . . 
            . . f . . . . . . . . . . . . . . f . . 
            `)
        yönergeMetin("Bug(Güvenlik Açıkları), Tehdit", "alt")
        yönergeResim(img`
            . . . f f f f f f . . . 
            . . f 2 2 2 2 2 2 f . . 
            . f 2 2 2 2 1 2 2 2 f . 
            f 2 2 2 2 1 2 2 2 2 2 f 
            f 2 2 f 2 2 2 2 f 2 2 f 
            f 2 2 f f 2 2 f f 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 f 
            f 2 f 2 2 2 2 2 2 f 2 f 
            . f 2 f f f f f f 2 f . 
            . . f 2 2 2 2 2 2 f . . 
            . . . f f f f f f . . . 
            `)
        yönergeMetin("Bilgisayar Korsanları, Tehdit", "alt")
        yönergeResim(img`
            . . . . f f . . . . 
            . . . f 9 9 f . . . 
            . . f 9 9 9 9 f . . 
            . f 9 9 9 9 9 9 f . 
            f 9 9 9 1 9 9 9 9 f 
            f 9 9 1 9 9 9 9 9 f 
            f 9 9 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 9 9 f 
            . f 9 9 9 9 9 9 f . 
            . . f 9 9 9 9 f . . 
            . . . f f f f . . . 
            `)
        yönergeMetin("Yanlış Paylaşım, Tehdittir", "alt")
        game.setDialogCursor(img`
            . . . . . . . . . . . . . . . . 
            . . . . 6 6 6 6 6 6 6 . . . . . 
            . . . 6 9 9 9 9 9 9 9 6 . . . . 
            . . 6 9 9 9 9 9 9 9 9 9 6 . . . 
            . 6 9 9 9 9 1 1 1 9 9 9 9 6 . . 
            . 6 9 9 9 1 9 9 9 1 9 9 9 6 . . 
            . 6 9 9 9 1 9 9 9 1 9 9 9 6 . . 
            . 6 9 9 9 1 1 1 1 1 9 9 9 6 . . 
            . 6 9 9 9 1 9 9 9 1 9 9 9 6 . . 
            . 6 9 9 9 1 9 9 9 1 9 9 9 6 . . 
            . 6 9 9 9 9 9 9 9 9 9 9 f 6 . . 
            . . 6 9 9 9 9 9 9 9 9 f 6 . . . 
            . . . 6 9 9 9 9 f f f 6 . . . . 
            . . . . 6 6 6 6 6 6 6 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        yönergeMetin("Oyun içinde B tuşuna basarak seviye geçmek için varsayılan olarak 25 adet olarak belirlenmiş kişisel bilgi sayısını değiştirerek oyunu özelleştirebilirsiniz.", "tamEkran")
        yönergeMetin("Şimdi oyuna başlıyoruz. Oyuna başlarken 3 zorluk seviyesinden birini seçmelisiniz. Kişisel bilgileri toplayarak her kişisel bilgi için zorluk seviyenize göre 1,2 veya 3 puan kazanır, tehditleri toplarsanız can kaybedersiniz. Başlangıçta zorluk seviyenize göre 10,8 veya 6 canınız olacak. 25 kişisel bilgi toplandığında seviye atlarsınız. Seviyeleri geçmek için 2 dakika süreniz var. Süreniz içinde 25 kişisel bilgi toplayamazsanız oyun biter. Seviye aralarında güvenli internetle ilgili sorulara doğru cevap vermelisiniz. Yanlış cevap verirseniz 10 puan kaybeder, doğru cevap verirseniz seviyede artırdığınız süre kadar puan ve 1 can(zor seviye hariç) kazanırsınız. Seviyeler ilerledikçe oyun hızlanır ve süreniz azalır. Toplam 12 seviyeyi tamamlarsanız oyunu kazanırsınız. İyi eğlenceler...", "tamEkran")
    }
    info.setScore(0)
    zorlukSeç()
    sayaç(süre)
    karar = true
}
function soruKaynak () {
    sorular[1] = "Aşağıdaki internet sitelerinden hangisi çocuklar için güvenli arama motorudur? 1)Arfbot.com 2)Google.com 3)Facebook.com 4)Güvenlikverimizde.tr"
    sorular[2] = "Arfbot arama motoruna adını veren ünlü matematikçi Cahit Arf hangi kağıt paramızda yer almaktadır? 1)10 2)20 3)50 4)5"
    sorular[3] = "İnternet ortamında aşağıdakilerden hangisini yapmak tehlikeli değildir? 1)EBA'da ders çalışmak  2)Çevrim içi oyunlarda tanımadığımız kişilerle sohbet etmek 3)Parolalarımızı tanımadığımız kişilerle paylaşmak 4)İnternet kullanırken yaş kısıtlamalarına uymamak"
    sorular[4] = "Aşağıdakilerden hangisi bilgisayar, tablet gibi cihazlarımızı kötü amaçlı yazılımlardan korur? 1)Paint 2)Antivirüs 3)Python 4)Scratch"
    sorular[5] = "Aşağıdakilerden hangisi kişisel bir veriniz değildir? 1)Adınız ve soyadınız 2)En sevdiğiniz yemek 3)Telefon numaranız 4)Adresiniz "
    sorular[6] = "Aşağıdakilerden hangisi güçlü bir parola oluşturmanın yöntemidir? 1)Evcil hayvanının ismini parola olarak kullanmak 2)Harf, rakam ve noktalama işareti bulunan bir parola kullanmak 3)Adını ve soyadını parola alarak kullanmak 4)Doğum tarihini parola olarak kullanmak"
    sorular[7] = "İnternet ortamında tanımadığımız kişiler tarafından hakarete uğrarsak ne yapmalıyız? 1)Aynı şekilde karşılık vermeliyiz 2)Hiçbir şey yapmayıp bu durumu herkesten saklamalıyız 3)Ebeveynlerimize ya da öğretmenimize haber vermeliyiz 4)O kişilerle konuşmaya devam etmeliyiz."
    sorular[8] = "Ali, kütüphane sistemine öğrenci numarası ve parolası ile giriş yaparak bazı kitapların kütüphanede olup olmadığını sorgulamıştır. Ali'nin kitap arama işlemi bittikten sonra yapması gereken işlem hangisidir? 1)Bilgisayarı kilitleyerek ayrılması 2)Girmiş olduğu öğrenci numarası ve parolayı hatırla seçeneğini işaretlemesi 3)Kütüphane sistemine giriş yaptığı oturumu kapatması 4)Bilgisayarı açık bırakarak ayrılması"
    sorular[9] = "Aşağıdaki yöntemlerden hangisi tabletinize yetkisiz kişilerin erişimini önlemek için alınabilecek tedbirlerden değildir? 1)Ekran kilidi koymak 2)Yüz tanıma özelliğini aktifleştirmek 3)Ekran kaydırarak giriş yapabilme özelliğini aktifleştirmek 4)Ekran deseni ile giriş seçeneğini aktifleştirmek"
    sorular[10] = "Ayça aşağıda yer alan davranışlardan hangilerini yaparsa interneti güvenli kullanmış olur? I.İnternet ortamında bulunan her bilginin doğru olmadığını bilmek II.İnternet ortamında tanıştığı kişilerle buluşmak III.Sosyal medya hesabını herkesin erişimine açık hale getirmek IV.Sosyal medyada tanımadığı kişilerin arkadaşlık isteğini kabul etmemek  1)Yalnız I 2)I ve II 3)I, II ve III  4)I ve IV"
    sorular[11] = "Aşağıdaki durumların hangisinde bilgisayarın kamerasını açmak doğrudur? 1)Hiçbir zaman 2)Polis veya asker üniforması giyen kişilerle konuşurken 3)Oyunda tanıştığınız kişilerle beraber oyun oynarken 4)Sadece gerçek dünyada tanıdığınız kişilerle konuşurken "
    sorular[12] = "Aşağıdakilerden hangisi yanlış bir davranıştır? 1)İnternette müzik dinlemek 2)Ailemizin kontrolünde internetten oyun oynamak 3)Eğitim sitelerinde araştırma yapmak 4)Yaşımıza uygun olmayan bir içeriği izlemek "
}
let projectile: Sprite = null
let akış = 0
let seçim = 0
let soruNo = 0
let süreDeğişim = 0
let akışDeğişimMiktarı = 0
let canKararı = false
let akışDeğişim = 0
let zorlukSeviye = 0
let sorular: string[] = []
let soruindex: number[] = []
let seviye = 0
let Arfbot: Sprite = null
let nesneSayısı = 0
let karar = false
let ekPuan = 0
let süre = 0
scene.setBackgroundColor(6)
süre = 120
ekPuan = süre
karar = false
nesneSayısı = 25
timer.background(function () {
    while (ekPuan == 120) {
        music.playMelody("C D C E C F C A ", 250)
    }
})
Arfbot = sprites.create(img`
    9 9 d . d d d d . d 9 9 
    9 9 d d d d d d d d 9 9 
    9 9 8 8 8 8 8 8 8 8 9 9 
    d 8 8 8 8 8 8 8 8 8 8 d 
    d 8 8 9 8 8 8 8 9 8 8 d 
    d 8 8 9 9 8 8 9 9 8 8 d 
    d 8 8 8 8 8 8 8 8 8 8 d 
    d 8 8 9 8 8 8 8 9 8 8 d 
    d 8 8 8 9 9 9 9 8 8 8 d 
    d d 8 8 8 8 8 8 8 8 d d 
    d d d 8 8 8 8 8 8 d d d 
    . d d d d d d d d d d . 
    . c d d d d d d d d c . 
    c c c c c c c c c c c c 
    . c c c c c c c c c c . 
    `, SpriteKind.Player)
Arfbot.setStayInScreen(true)
start()
soruKaynak()
effects.clouds.startScreenEffect()
let hız = 100
controller.moveSprite(Arfbot, hız, hız)
let toplananArtıPuanNesne = 0
seviye = 1
soruindex = [
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12
]
forever(function () {
    while (karar == true) {
        ekPuan += -1
        pause(1000)
    }
})
forever(function () {
    if (toplananArtıPuanNesne % nesneSayısı == 0 && toplananArtıPuanNesne > 0) {
        info.stopCountdown()
        karar = false
        soruNo = soruindex.removeAt(randint(0, soruindex.length - 1))
        game.splash("" + seviye + ". Seviye Tamamlandı.", "Soru Geliyor.")
        soruSec(soruNo)
        cevapAl(game.askForNumber("Cevabınızı Giriniz", 1), soruNo)
        seviyeGeçiş()
        toplananArtıPuanNesne = 0
    }
})
game.onUpdateInterval(500, function () {
    seçim = randint(1, 9)
    akış = randint(akışDeğişim, akışDeğişim + 20)
    if (seçim == 1) {
        projectile = sprites.createProjectileFromSide(img`
            . f f f f f f . 
            f 9 9 9 9 9 9 f 
            f 9 9 1 9 9 9 f 
            f 9 1 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 f 
            . f f f f f f . 
            `, 0, akış)
        projectile.setKind(SpriteKind.ArtıPuan)
    } else if (seçim == 2) {
        projectile = sprites.createProjectileFromSide(img`
            . . f f f f f f f f f f f f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            f 1 f 1 1 1 1 1 1 1 1 1 1 f 1 f 
            f 1 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
            f 1 1 1 f 1 1 1 1 1 1 f 1 1 1 f 
            f 1 1 1 1 f 1 1 1 1 f 1 1 1 1 f 
            f 1 1 1 1 1 f 1 1 f 1 1 1 1 1 f 
            f 1 1 1 f 1 1 f f 1 1 f 1 1 1 f 
            f 1 1 f 1 1 1 1 1 1 1 1 f 1 1 f 
            f 1 f 1 1 1 1 1 1 1 1 1 1 f 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f f f f f f f f f f f f . . 
            `, 0, akış)
        projectile.setKind(SpriteKind.ArtıPuan)
    } else if (seçim == 3) {
        projectile = sprites.createProjectileFromSide(img`
            . f f f f f f f f f f f f . 
            f f 6 6 6 6 6 6 6 6 6 6 f f 
            f 6 6 f f f 6 6 6 6 6 6 6 f 
            f 6 f f d f f 6 f f f f 6 f 
            f 6 f d d d f 6 6 6 6 6 6 f 
            f 6 f d d d f 6 f f f f 6 f 
            f 6 6 6 d 6 6 6 6 6 6 6 6 f 
            f 6 6 c c c 6 6 f f f 6 6 f 
            f f 6 6 6 6 6 6 6 6 6 6 f f 
            . f f f f f f f f f f f f . 
            `, 0, akış)
        projectile.setKind(SpriteKind.ArtıPuan)
    } else if (seçim == 4) {
        projectile = sprites.createProjectileFromSide(img`
            . . f f f f . . f f f f . . 
            . f 2 2 2 2 f f 2 2 2 2 f . 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 1 2 2 2 2 2 2 2 2 2 f 
            f 2 1 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f 
            . f 2 2 2 2 2 2 2 2 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 f . . . 
            . . . . f 2 2 2 2 f . . . . 
            . . . . . f 2 2 f . . . . . 
            . . . . . . f f . . . . . . 
            `, 0, akış)
        projectile.setKind(SpriteKind.ArtıPuan)
    } else if (seçim == 5) {
        projectile = sprites.createProjectileFromSide(img`
            . 2 . . . . . 2 . . . . 2 . 
            2 2 . . . . 2 . . . . . 2 2 
            . . 2 . 3 . 2 2 . a . 2 . . 
            . . . 2 . 2 b 2 2 . 2 . . . 
            . . 3 . 2 2 2 2 2 2 . 2 . . 
            . . . 2 2 2 b 2 2 3 2 . . . 
            . 2 2 3 c 2 2 2 2 2 2 a . 2 
            2 . 2 2 2 2 2 2 c b 2 2 2 . 
            . . . c 2 2 a 2 2 2 2 . . . 
            . . 2 . 2 2 2 2 2 2 . 2 . . 
            . . . 2 . 2 b 2 3 . 3 . . . 
            . . a . 2 . . . . 2 . 2 . . 
            2 2 . . . . . . . . . . 3 2 
            . 2 . . . . . . . . . . 2 . 
            `, 0, akış)
        projectile.setKind(SpriteKind.EksiPuan)
    } else if (seçim == 6) {
        projectile = sprites.createProjectileFromSide(img`
            . . . f . . . . . . . . . . . . f . . . 
            . . . . f . . . . . . . . . . f . . . . 
            . . . . . f . . . f f . . . f . . . . . 
            . . . . . . f . f f f f . f . . . . . . 
            . . . . . . . f 2 2 2 2 f . . . . . . . 
            . . . . f f f f 2 2 2 2 f f f f . . . . 
            . . . f . . f 2 2 2 2 2 2 f . . f . . . 
            . f f . . . f 2 2 2 2 2 2 f . . . f f . 
            f . . . . . f 2 2 2 2 2 2 f . . . . . f 
            . . . . . f f f 2 2 2 2 f f f . . . . . 
            . . . . f . . f f 2 2 f f . . f . . . . 
            . . . f . . . . f f f f . . . . f . . . 
            . . . f . . . . . . . . . . . . f . . . 
            . . f . . . . . . . . . . . . . . f . . 
            . . f . . . . . . . . . . . . . . f . . 
            `, 0, akış)
        projectile.setKind(SpriteKind.EksiPuan)
    } else if (seçim == 7) {
        projectile = sprites.createProjectileFromSide(img`
            . . . f f f f f f . . . 
            . . f 2 2 2 2 2 2 f . . 
            . f 2 2 2 2 1 2 2 2 f . 
            f 2 2 2 2 1 2 2 2 2 2 f 
            f 2 2 f 2 2 2 2 f 2 2 f 
            f 2 2 f f 2 2 f f 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 f 
            f 2 2 2 2 2 2 2 2 2 2 f 
            f 2 f 2 2 2 2 2 2 f 2 f 
            . f 2 f f f f f f 2 f . 
            . . f 2 2 2 2 2 2 f . . 
            . . . f f f f f f . . . 
            `, 0, akış)
        projectile.setKind(SpriteKind.EksiPuan)
    } else if (seçim == 8) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . f f . . . . 
            . . . f 9 9 f . . . 
            . . f 9 9 9 9 f . . 
            . f 9 9 9 9 9 9 f . 
            f 9 9 9 1 9 9 9 9 f 
            f 9 9 1 9 9 9 9 9 f 
            f 9 9 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 9 9 f 
            f 9 9 9 9 9 9 9 9 f 
            . f 9 9 9 9 9 9 f . 
            . . f 9 9 9 9 f . . 
            . . . f f f f . . . 
            `, 0, akış)
        projectile.setKind(SpriteKind.EksiPuan)
    } else {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `, 0, akış)
    }
    projectile.x = randint(8, scene.screenWidth() - 8)
})
