const mongoose=require("mongoose")

const configureDB = async () => {
    const connectionUrl = 'mongodb://127.0.0.1:27017/project';
    
    try {
        await mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

module.exports=configureDB