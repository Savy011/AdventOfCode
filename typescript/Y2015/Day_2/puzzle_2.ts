const inputs = await Bun.file('./input.txt').text()
const dimensions = inputs.split('\n')
let sth: string[][] = [];
let ribbonLength: Number[] = []

dimensions.forEach(dimension => {
	const dim = dimension.split('x')
	sth.push(dim)
})

sth.forEach(dimensionSet => {
	if (isNaN(dimensionSet[0]) || isNaN(dimensionSet[1]) || isNaN(dimensionSet[2])) return
	let perimeter_1 = 2 * (Number(dimensionSet[0]) + Number(dimensionSet[1]));
	let perimeter_2 = 2 * (Number(dimensionSet[1]) + Number(dimensionSet[2]));
	let perimeter_3 = 2 * (Number(dimensionSet[0]) + Number(dimensionSet[2]));
	let volume = dimensionSet[0] * dimensionSet[1] * dimensionSet[2]

	let smallestPerimeter = Math.min(perimeter_1, perimeter_2, perimeter_3)
	const ribLen = smallestPerimeter + volume

	ribbonLength.push(ribLen)
})

const finalLength = ribbonLength.reduce((prev, current) => Number(prev) + Number(current), 0)

console.log(`Total Length of Ribbon Required: ${finalLength} fts`)
