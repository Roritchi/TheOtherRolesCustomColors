const fs = require('fs');
const crypto = require('crypto');

const prefix = "tor@color";
const suffix = "§eof";

const colors = [
	"a4eb05314008537d2832e32fa1f33b2e",
	"80cc70dc5f21bc321b84ce984abd511b",
	"3359ffcd0b14ffa39d476a5c96632032",
	"14056e0b9e53bc91f0c6a8b1fd5ce8b5",
	"fb00fb81b0be5177af908576e144d788",
	"a79e2bd7c9cdc723924bd4d7734ae5da",
];

function stringToHex(str) {
	let hex = '';
	for(let c of str) {
		hex += Buffer.from(c).toString('hex') + '00';
	}
	return hex;
}

var dll = fs.readFileSync('TheOtherRoles.dll').toString('hex');

for(let i in colors) {
	dll.replace(stringToHex(colors[i]), stringToHex(crypto.createHash('md5').update(prefix + i + suffix).digest('hex')));
}

fs.writeFileSync('TheOtherRoles.colors.dll', Buffer.from(dll, 'hex'));