var Float32Array = window.Float32Array
var AudioContext = window.AudioContext || window.webkitAudioContext

var supportedSizes = [256, 512, 1024, 2048]

module.exports = FFT

function FFT(size) {
    if (supportedSizes.indexOf(size) === -1) {
        throw new Error("Invalid buffer size")
    }

    var audioContext = new AudioContext()
    var sourceNode = audioContext.createScriptProcessor(size, 0, 1)
    var analyser = audioContext.createAnalyser();

    analyser.fftSize = size

    function connect() {
        sourceNode.connect(analyser)
    }

    function disconnect() {
        sourceNode.disconnect()
    }

    return function (inputBuffer, outputBuffer, callback) {
        if (typeof outputBuffer === "function") {
            callback = outputBuffer
            outputBuffer = null
        }

        sourceNode.onaudioprocess = function processInput(event) {
            try {
                event.outputBuffer.getChannelData(0).set(inputBuffer)

                sourceNode.onaudioprocess = function () {
                    try {
                        var out = outputBuffer || new Float32Array(size)
                        analyser.getFloatFrequencyData(out)
                        disconnect()
                        return callback(null, out)
                    } catch(e) {
                        disconnect()
                        throw e
                    }
                }
            } catch (e) {
                disconnect()
                throw e
            }
        }

        connect()
    }
}