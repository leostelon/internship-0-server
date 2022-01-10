const mongoose = require("mongoose");
const url = "mongodb+srv://womeawarenss:qVGKCA!Enm3j77v@cluster0.nswlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("Connected to the Database.");
});
