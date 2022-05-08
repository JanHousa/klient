// Klient
radio.setTransmitSerialNumber(true)
radio.setGroup(158)
let Moznost = 0
let Hlasovani = false
let Odpovedi = ["A", "B", "C", "D"]
// Přijímá informace o stavu hlasování od serveru
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    if (name == "hanz") {
        if (value == 10) {
            
            Hlasovani = true
        } else if (value == 20) {
            
            Hlasovani = false
        }
        
    }
    
})
if (Hlasovani) {
    basic.showString(Odpovedi[Moznost])
} else {
    
}

basic.forever(function on_forever() {
    
    if (Hlasovani == true) {
        if (input.buttonIsPressed(Button.A)) {
            Moznost -= 1
            Moznost = Math.constrain(Moznost, 0, 3)
            basic.showString(Odpovedi[Moznost])
        }
        
        if (input.buttonIsPressed(Button.B)) {
            Moznost += 1
            Moznost = Math.constrain(Moznost, 0, 3)
            basic.showString(Odpovedi[Moznost])
        }
        
        if (input.logoIsPressed()) {
            radio.sendValue("odpoved", Moznost + 65)
            music.playTone(Note.C, music.beat(1000))
        }
        
    } else {
        basic.showLeds(`
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . .
        `)
        pause(100)
        basic.showLeds(`
        . . . . .
        . . . . .
        . # # . .
        . . . . .
        . . . . .
        `)
        pause(100)
        basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        `)
    }
    
})
