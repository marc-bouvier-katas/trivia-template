import {GameRunner} from '../src/game-runner'
import {describe, it} from 'mocha';

declare function require(name: string);

require('approvals').mocha()

describe('game-runner', function () {
    // Keep the original function warn for them to be restored after test
    const originalConsoleLog = console.log
    const originalMathRandom = Math.random

    let currentRandValue
    let capturedLogs = []

    it('should comply to golden master', function () {

        mockIO()
        // All console.log calls will fill the `data`array
        GameRunner.main()

        // Collect logs captured by spy
        const data = capturedLogs.join('\n')

        restoreIO()
        this.verify(data);
    });

    function mockIO() {
        // Mocking Math.random
        Math.random = () => currentRandValue++
        currentRandValue = 0

        // Spying console.log
        capturedLogs = []
        console.log = (message) => {
            originalConsoleLog(message)
            capturedLogs.push(message)
        }
    }

    function restoreIO() {
        // Restore mocked / spied functions
        Math.random = originalMathRandom
        console.log = originalConsoleLog
    }
});