const input = (await Bun.file('./input.txt').text()).trim()

type TCardData = {
	"winning numbers": number[],
	"card numbers": number[],
	"comman numbers": number[]
}[]

function findComman(arr1: number[], arr2: number[]): number[] {
	const ret: number[] = []
	arr1.forEach(i => { arr2.forEach(j => { if (i === j) ret.push(i) }) })

	return ret
}

function parse(inp: string) {
	let ret: TCardData = [];
	const cards = inp.split('\n').map(str => str.trim())

	cards.forEach(card => {
		const winningNumbers = card
			.split(':')[1]
			.split('|')[0]
			.split(' ').filter(s => s !== '')
			.map(num => Number(num))
		const cardNumbers = card
			.split(':')[1]
			.split('|')[1]
			.split(' ')
			.filter(s => s !== '')
			.map(num => Number(num))

		const commanNumbers = findComman(winningNumbers, cardNumbers);

		ret.push({
			"winning numbers": winningNumbers,
			"card numbers": cardNumbers,
			"comman numbers": commanNumbers
		})
	})

	return ret
}

function process(input: TCardData) {
	const commanNumbers = input.map(card => card["comman numbers"].length)

	const points = commanNumbers.map(p => {
		if (p === 0) return 0
		let ret: number = 1;
		for (let i = 0; i < p; i++) {
			i === 0 ? ret = 1 : ret *= 2
		}
		return ret
	})

	return points.reduce((prev, next) => prev + next, 0)
}

const parsedInput = parse(input)
const processedInput = process(parsedInput)
console.log('Total Points:', processedInput)
