const inputs = await Bun.file('./input.txt').text()
const dimensions = inputs.split('\n')
let sth: string[][] = [];
let sheetArea: Number[] = []
dimensions.forEach(dimension => {
	const dim = dimension.split('x')
	sth.push(dim)
})

sth.forEach(dimensionSet => {
	if (isNaN(dimensionSet[0]) || isNaN(dimensionSet[1]) || isNaN(dimensionSet[2])) return
	let area_1 = dimensionSet[0] * dimensionSet[1];
	let area_2 = dimensionSet[1] * dimensionSet[2];
	let area_3 = dimensionSet[0] * dimensionSet[2];

	let smallestArea = Math.min(area_1, area_2, area_3)

	const totalArea = 2 * area_1 + 2 * area_2 + 2 * area_3 + smallestArea
	sheetArea.push(totalArea)
})

const finalArea = sheetArea.reduce((prev, current) => Number(prev) + Number(current), 0)

console.log(`Total Area Required: ${finalArea} sq. fts`)
