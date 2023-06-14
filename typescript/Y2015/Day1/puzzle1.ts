import fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf8');

const arrayFromInput = input.split('');
let resultFloor = 0;

arrayFromInput.forEach(char => {
  switch(char) {
		case '(':
			return resultFloor += 1;
		case ')':
			return resultFloor -= 1;
		default:
			return;
	}
});

console.log(resultFloor);
