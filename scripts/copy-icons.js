const fs = require('fs');
const path = require('path');

const iconMappings = [
	['nodes/Bcdrllc/bcdrllc.svg', 'dist/nodes/Bcdrllc/bcdrllc.svg'],
	['nodes/BcdrllcTrigger/bcdrllcTrigger.svg', 'dist/nodes/BcdrllcTrigger/bcdrllcTrigger.svg'],
	['nodes/BcdrllcFlowTrigger/bcdrllcFlowTrigger.svg', 'dist/nodes/BcdrllcFlowTrigger/bcdrllcFlowTrigger.svg'],
];

for (const [source, destination] of iconMappings) {
	const sourcePath = path.resolve(__dirname, '..', source);
	const destinationPath = path.resolve(__dirname, '..', destination);

	fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
	fs.copyFileSync(sourcePath, destinationPath);
}