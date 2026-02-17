const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, (err)=>{
    if (err) {
        console.log(err);
    }
    
    console.log(`App listen in port http://localhost:${PORT}`);

})