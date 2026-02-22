
const dashboardController = {
    renderPage: (req, res) => {
        
        if (req.user.username == process.env.ADMIN_USER) {
            //res.json({ message: `Bienvenido al Dashboard, ${req.user.username}` });
            res.render('dashboard')
        } else {
            res.status(401).json({ message: `Acceso denegado` });
        }
    },
}

module.exports = dashboardController;