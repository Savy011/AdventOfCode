type TGameData = {
	game: number,
	possible: boolean,
	gameMinCubes: number[]
	data: {
		red: number,
		blue: number,
		green: number
	}[]
}[]

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const input = await Bun.file('input.txt').text().then(str => str.trim())

function parser(input: string) {
	let ret: TGameData = [];

	const gameArr = input.split('\n')

	gameArr.forEach((str, index) => {
		let gamePossible = true
		let allRed: number[] = []
		let allBlue: number[] = []
		let allGreen: number[] = []

		const gameData = str.split(':').pop()
		const roundData = gameData!.split(';').map(str => str.trim())
		const roundBallData = roundData!.map(str => {
			const balls = str.split(',').map(str => str.trim())

			let red = balls.filter(str => str.includes('red')).map(arr => arr.split(' ')[0]);
			let green = balls.filter(str => str.includes('green')).map(arr => arr.split(' ')[0]);
			let blue = balls.filter(str => str.includes('blue')).map(arr => arr.split(' ')[0]);

			if (
				Number(red[0]) > MAX_RED ||
				Number(green[0]) > MAX_GREEN ||
				Number(blue[0]) > MAX_BLUE
			) gamePossible = false

			allRed.push(red[0] ? Number(red[0]) : 0)
			allGreen.push(green[0] ? Number(green[0]) : 0)
			allBlue.push(blue[0] ? Number(blue[0]) : 0)


			return {
				red: red[0] !== undefined ? Number(red[0]) : 0,
				green: green[0] !== undefined ? Number(green[0]) : 0,
				blue: blue[0] !== undefined ? Number(blue[0]) : 0
			}
		})

		const leastRed = Math.max(...allRed)
		const leastGreen = Math.max(...allGreen)
		const leastBlue = Math.max(...allBlue)

		ret.push({ game: index + 1, gameMinCubes: [leastRed, leastGreen, leastBlue], possible: gamePossible, data: roundBallData })
	})

	return ret
}

function process(input: TGameData) {
	const powers = input.map(inp => inp.gameMinCubes[0] * inp.gameMinCubes[1] * inp.gameMinCubes[2])

	return powers.reduce((prev, next) => prev + next, 0)
}

const parsedInput = parser(input)
const processedInput = process(parsedInput)
console.log('Sum of all powers of game:', processedInput)
