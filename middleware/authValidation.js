export function validateRegister(req, res, next) {
    const { username,email, password } = req.body;

     if (!username || !username.trim()) {
        return res.status(400).json({
            message: "Username is required"
        });
    }

    if (!email || !email.trim()) {
        return res.status(400).json({
            message: "email req"
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "password required"
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: "password must be atleast 6"
        });
    }
    next();
}

export function validateLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !email.trim()) {
        return res.status(400).json({
            message: "email req"
        });
    }
    if (!password) {
        return res.status(400).json({
            message: "password required"
        });
    }
    next();
}
