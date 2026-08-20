export function validateTask(req,res,next){
    const {
        title,
        priority,
        dueDate,
        status
    } = req.body;
    if(!title){
        return res.status(400).json({
            message:"title is required"
        });
    }
    const allowedPriorities = ["low","medium","high"];

    if(!priority){
        return res.status(400).json({
            message:"priority required"
        });
    }
    if(!allowedPriorities.includes(priority)){
        return res.status(400).json({
            message:"priorty must be low,medium,high"
        });
    }
    const allowedStatueses=['pending','completed'];
    if(!status){
        return res.status(400).json({
            message:"status required"
        });
    }
    if(!allowedStatueses.includes(status)){
        return res.status(400).json({
            message:"status must be pending or completed"
        });
    }
    if(!dueDate){
        return res.status(400).json({
            message:"due date required"
        });
    }
    if(isNaN(Date.parse(dueDate))){
        return res.status(400).json({
            message:"invalid date"
        });
    }
    next();
}