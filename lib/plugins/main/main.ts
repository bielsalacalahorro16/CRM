//This is a test file only for developing purpouses. 
import { opine, Application } from "https://deno.land/x/opine@2.1.1/mod.ts";
const app  = opine();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log(app.)
