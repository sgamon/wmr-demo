import {helloWorldConsole} from 'helloWorldConsole'
helloWorldConsole()

import {helloFromTypescript} from 'helloFromTypescript'
helloFromTypescript()

import confetti from 'canvas-confetti'
confetti.create(null, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 10 })

import 'hello-world-element'
