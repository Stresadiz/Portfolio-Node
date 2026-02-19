const {getProjects} = require('../models/projects')

const homeController = {
    renderHome: async (req, res) => {
        try {
            const projects = await getProjects()

            res.render('home', {
                projects
            })

        } catch (error) {
            res.status(500).send('Error al componer pagina de inicio')
        }
    }
}

module.exports = homeController;