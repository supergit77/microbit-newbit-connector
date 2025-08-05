namespace microbitConnector {
    let serialHandler: (message: string) | null = null
    let radioHandler: (message: string) | null = null

    /**
     * Set a function to run when a message is received over serial.
     */
    //% block
    export function onSerialReceived(cb: (message: string) => void) {
        serialHandler = cb
        serial.onDataReceived("\n", function () {
            const msg = serial.readUntil("\n")
            if (serialHandler) serialHandler(msg)
        })
    }

    /**
     * Read the last received serial message.
     */
    //% block
    export function readSerialMessage(): string {
        return serial.readUntil("\n")
    }

    /**
     * Set a function to run when a radio message is received.
     */
    //% block
    export function onRadioReceived(cb: (message: string) => void) {
        radioHandler = cb
        radio.onReceivedString(function (receivedString: string) {
            if (radioHandler) radioHandler(receivedString)
        })
    }

    /**
     * Send a string over radio.
     */
    //% block
    export function sendRadioMessage(msg: string) {
        radio.sendString(msg)
    }

        /**
     * Send a text to display on the micro:bit via serial. The micro:bit program should
     * interpret messages starting with "DISPLAY:" and show the rest of the string
     * on its 5x5 LED display.
     */
    //% block
    export function displayTextSerial(text: string) {
        serial.writeLine("DISPLAY:" + text)
    }

    /**
     * Send a number to display on the micro:bit via serial. The micro:bit program should
     * interpret messages starting with "NUMBER:" and show the number on its display.
     */
    //% block
    export function displayNumberSerial(num: number) {
        serial.writeLine("NUMBER:" + num.toString())
    }

    /**
     * Clear the micro:bit display via serial. Sends a "CLEAR:" command that the
     * micro:bit program can use to clear its LED screen.
     */
    //% block
    export function clearDisplaySerial() {
        serial.writeLine("CLEAR:")
    }

    /**
     * Send a text to display on the micro:bit via radio. The micro:bit program should
     * interpret messages starting with "DISPLAY:" and show the rest of the string.
     */
    //% block
    export function displayTextRadio(text: string) {
        radio.sendString("DISPLAY:" + text)
    }

    /**
     * Send a number to display on the micro:bit via radio. The micro:bit program should
     * interpret messages starting with "NUMBER:" and show the number on its display.
     */
    //% block
    export function displayNumberRadio(num: number) {
        radio.sendString("NUMBER:" + num.toString())
    }

    /**
     * Clear the micro:bit display via radio. Sends a "CLEAR:" command that the
     * micro:bit program can use to clear its LED screen.
     */
    //% block
    export function clearDisplayRadio() {
        radio.sendString("CLEAR:")
    }

}
