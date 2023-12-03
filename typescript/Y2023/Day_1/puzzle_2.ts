const input = await Bun.file('./input.txt').text()

function textPreparser(inp: string) {
	let ret: string[] = []

	Array.from(inp).forEach((char, index) => {
		switch (char) {
			case "z":
				if (inp[index + 1] == "e" && inp[index + 2] == "r" && inp[index + 3] == "o")
					ret.push('0')
				break;
			case "o":
				if (inp[index + 1] == "n" && inp[index + 2] == "e")
					ret.push('1')
				break;
			case "t":
				if (inp[index + 1] == "w" && inp[index + 2] == "o")
					ret.push('2')
				if (inp[index + 1] == "h" && inp[index + 2] == "r" && inp[index + 3] == "e" && inp[index + 4] == "e")
					ret.push('3')
				break;
			case "f":
				if (inp[index + 1] == "o" && inp[index + 2] == "u" && inp[index + 3] == "r")
					ret.push('4')
				if (inp[index + 1] == "i" && inp[index + 2] == "v" && inp[index + 3] == "e")
					ret.push('5')
				break;
			case "s":
				if (inp[index + 1] == "i" && inp[index + 2] == "x")
					ret.push('6')
				if (inp[index + 1] == "e" && inp[index + 2] == "v" && inp[index + 3] == "e" && inp[index + 4] == "n")
					ret.push('7')
				break;
			case "e":
				if (inp[index + 1] == "i" && inp[index + 2] == "g" && inp[index + 3] == "h" && inp[index + 4] == "t")
					ret.push('8')
				break;
			case "n":
				if (inp[index + 1] == "i" && inp[index + 2] == "n" && inp[index + 3] == "e")
					ret.push('9')
				break;
			default:
				ret.push(char)
				break;
		}
	})

	return ret.join('');

}

function parse(inp: string): number[] {
	const ret: number[] = [];
	const calibSets = inp.split('\n');
	const correctedCalibSets: string[] = []

	calibSets.forEach(str => correctedCalibSets.push(textPreparser(str)))

	correctedCalibSets.forEach(str => {
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
