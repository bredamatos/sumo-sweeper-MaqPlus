function acabou () {
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    basic.pause(200)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, 100)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 100)
    basic.showIcon(IconNames.Yes)
    for (let index = 0; index < 3; index++) {
        maqueenPlusV2.showColor(DigitalPin.P15, maqueenPlusV2.colors(maqueenPlusV2.NeoPixelColors.Red))
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P1, 45)
        basic.pause(100)
        maqueenPlusV2.showColor(DigitalPin.P15, maqueenPlusV2.colors(maqueenPlusV2.NeoPixelColors.Yellow))
        basic.pause(100)
        music.playTone(262, music.beat(BeatFraction.Quarter))
        basic.pause(100)
        maqueenPlusV2.showColor(DigitalPin.P15, maqueenPlusV2.colors(maqueenPlusV2.NeoPixelColors.Green))
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P1, 115)
        basic.pause(100)
        maqueenPlusV2.showColor(DigitalPin.P15, maqueenPlusV2.colors(maqueenPlusV2.NeoPixelColors.Blue))
        basic.pause(100)
        music.playTone(494, music.beat(BeatFraction.Half))
        basic.pause(200)
        maqueenPlusV2.showColor(DigitalPin.P15, maqueenPlusV2.colors(maqueenPlusV2.NeoPixelColors.Violet))
        basic.pause(100)
    }
    maqueenPlusV2.ledBlank(DigitalPin.P15)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
}
function empurra () {
    pins.servoWritePin(AnalogPin.P1, 45)
    basic.pause(500)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 100)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 110)
    basic.pause(500)
    empurrar = true
    while (empurrar) {
        if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
            maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
            basic.pause(500)
            empurrar = false
        }
    }
}
function procura () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 100)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 100)
    contador = 0
    procurando = true
    basic.pause(500)
    while (procurando) {
        if (maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14) < 25) {
            basic.pause(100)
            maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
            basic.pause(300)
            encontrado = true
            procurando = false
        }
        if (contador == 300) {
            encontrado = false
            procurando = false
        }
        contador += 1
    }
}
function recua () {
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, 100)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 130)
    basic.pause(500)
    recuar = true
    while (recuar) {
        if (maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM) == 1) {
            maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
            basic.pause(200)
            recuar = false
        }
    }
    pins.servoWritePin(AnalogPin.P1, 115)
    basic.pause(500)
}
let recuar = false
let procurando = false
let contador = 0
let empurrar = false
let encontrado = false
maqueenPlusV2.I2CInit()
basic.pause(200)
pins.servoWritePin(AnalogPin.P1, 115)
basic.pause(200)
let activo = true
while (activo) {
    encontrado = false
    procura()
    if (encontrado) {
        empurra()
        recua()
    } else {
        activo = false
    }
}
acabou()
