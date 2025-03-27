import { connect } from "mongoose"

const runServer = async(app, mongoConn, port) => {
    try {
        await connect(mongoConn);
        app.listen(port, () => {
            console.log(`listening on PORT ${port}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

export default runServer;