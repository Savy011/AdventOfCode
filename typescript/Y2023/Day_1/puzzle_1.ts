const input = await Bun.file('./input.txt').text()

function parse(inp: string): number[] {
	const ret: number[] = [];
	const calibSets = inp.split('\n');

	calibSets.forEach(str => {
		const arr = str.split('');

		const firstNum = arr.find(n => !isNaN(Number(n)));
		const lastNum = arr.findLast(n => !isNaN(Number(n)));

		ret.push(Number(`${firstNum}${lastNum}`));
	})

	return ret;
}

function process(arr: number[]): number {
	return arr.reduce((prev, next) => prev + next, 0);

}

const parsedInput = parse(input.trim())
const processedInput = process(parsedInput)
console.log('Sum of all Calibration Values:', processedInput)
