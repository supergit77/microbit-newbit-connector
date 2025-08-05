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
}
