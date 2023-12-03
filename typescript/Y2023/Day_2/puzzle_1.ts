type TGameData = {
	game: number,
	possible: boolean,
	data: {
		red: number,
		blue: number,
		green: number
	}[]
}[]

const MAX_RED = 12;
const MAX_BLUE = 14;
const MAX_GREEN = 13;

const input = await Bun.file('input.txt').text().then(str => str.trim())

function parser(input: string) {
	let ret: TGameData = [];

	const gameArr = input.split('\n')

	gameArr.forEach((str, index) => {
		let gamePossible = true
		const gameData = str.split(':').pop()
		const roundData = gameData!.split(';').map(str => str.trim())
		const roundBallData = roundData!.map(str => {
			const balls = str.split(',').map(str => str.trim())

			let red = balls.filter(str => str.includes('red')).map(arr => arr.split(' ')[0]);
			let blue = balls.filter(str => str.includes('blue')).map(arr => arr.split(' ')[0]);
			let green = balls.filter(str => str.includes('green')).map(arr => arr.split(' ')[0]);

			if (
				Number(red[0]) > MAX_RED ||
				Number(blue[0]) > MAX_BLUE ||
				Number(green[0]) > MAX_GREEN
			) gamePossible = false

			return {
				red: red[0] !== undefined ? Number(red[0]) : 0,
				blue: blue[0] !== undefined ? Number(blue[0]) : 0,
				green: green[0] !== undefined ? Number(green[0]) : 0
			}
		})

		ret.push({ game: index + 1, possible: gamePossible, data: roundBallData })
	})

	return ret
}

function process(input: TGameData) {
	const possibleGames = input.filter(game => game.possible)

	return possibleGames.reduce((prev, next) => prev + next.game, 0)
}

const parsedInput = parser(input)
const processedInput = process(parsedInput)
console.log('Sum of all possible game IDs:', processedInput)
