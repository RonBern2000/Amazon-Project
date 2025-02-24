import { connect } from "mongoose"

const runServer = async(app, mongo_con, port)=>{
    try {
        await connect(mongo_con);
        app.listen(port, ()=>{
            console.log(`Listening on PORT: ${port}`);
        });
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}
export default runServer;