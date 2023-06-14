import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf8');

const arrayFromInput = input.split('');
let resultFloor = 0;
let negativeFloorPos = 0;

arrayFromInput.forEach(char => {
	if (resultFloor === -1) {
		console.log(negativeFloorPos)
	}
	switch(char) {
		case '(':
			negativeFloorPos += 1;
			return resultFloor += 1;
		case ')':
			negativeFloorPos += 1;
			return resultFloor -= 1;
		default:
			return;
	}
});

console.log(resultFloor);
