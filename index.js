const express = require('express');
const app = express();
const PORT = process.env.PORT || 5100;

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log('Hello World');
	console.log(`Server listening on port ${PORT}`);
});

