const aiService = require('../services/ai.service')

module.exports.getReview =  async (req, res)=>{
    // const prompt = req.query.prompt;
    const code = req.body.code;
    //Todo : console.log("Prompt is ", prompt);
    if(!code){
        return res.status(400).send("Prompty Not Found");
    }
     //Todo : console.log("Go to generator");
    const response = await aiService(code);
     //Todo : console.log("Response = ", response);

    res.send(response);
}