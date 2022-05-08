#Klient

import Math
radio.set_transmit_serial_number(True)
radio.set_group(158)
Moznost = 0
Hlasovani = False
Odpovedi = ["A", "B", "C", "D"]

#Přijímá informace o stavu hlasování od serveru
def on_received_value(name, value):
    if name == "hanz":
        if value == 10:
            global Hlasovani
            Hlasovani = True
        elif value == 20:
            global Hlasovani
            Hlasovani = False
radio.on_received_value(on_received_value)

if Hlasovani:
    basic.show_string(Odpovedi[Moznost])
else:
    pass

def on_forever():
    global Odpovedi, Hlasovani, Moznost
    if Hlasovani == True:
        if input.button_is_pressed(Button.A):
            Moznost -= 1
            Moznost = Math.constrain(Moznost, 0, 3)
            basic.show_string(Odpovedi[Moznost])
        if input.button_is_pressed(Button.B):
            Moznost += 1
            Moznost = Math.constrain(Moznost, 0, 3)
            basic.show_string(Odpovedi[Moznost])
        if input.logo_is_pressed():
            radio.send_value("odpoved", Moznost + 65)
            music.play_tone(Note.C, music.beat(1000))
    else:
        basic.show_leds("""
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . .
        """)
        pause(100)
        basic.show_leds("""
        . . . . .
        . . . . .
        . # # . .
        . . . . .
        . . . . .
        """)
        pause(100)
        basic.show_leds("""
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        """)
basic.forever(on_forever)