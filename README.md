# microbit-newbit-connector

This MakeCode Arcade extension allows games to receive input from a micro:bit using either serial (USB) or radio communication. It is designed for the **Newbit Arcade Shield 2** but should work with any micro:bit board supported by MakeCode Arcade.

## Installation

1. Open the [MakeCode Arcade editor](https://arcade.makecode.com/).
2. Create a new project.
3. Click the **Extensions** button under the gear/cog menu.
4. In the search box, enter the URL to this repository (`https://github.com/supergit77/microbit-newbit-connector`) or drag the compiled `.zip` from a release.
5. Select the extension to add its blocks to your toolbox.

## Blocks

- **on Serial Received**: Run code whenever a newline-terminated string is received over serial.
- **read Serial Message**: Read the last message received over serial.
- **on Radio Received**: Run code whenever a string is received via the micro:bit radio.
- **send Radio Message**: Send a string via the micro:bit radio.

## Example (Serial)

```ts
microbitConnector.onSerialReceived(function (msg: string) {
    if (msg == "left") {
        controller.moveSprite(mySprite, -50, 0)
    } else if (msg == "right") {
        controller.moveSprite(mySprite, 50, 0)
    }
})
```

On the micro:bit side, in a MakeCode program:

```ts
input.onButtonPressed(Button.A, function () {
    serial.writeLine("left")
})
input.onButtonPressed(Button.B, function () {
    serial.writeLine("right")
})
```

## Example (Radio)

```ts
microbitConnector.onRadioReceived(function (msg: string) {
    if (msg == "fire") {
        // trigger an action in your game
    }
})
```

On the micro:bit side:

```ts
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendString("fire")
})
```

Make sure to set the same radio group on both devices. Add other features as needed!
