const { getProjects, createProject } = require('../models/projects')

const projectController = {
    getAll: (req, res) => {
        try {
         const projects = getProjects()
         res.status(200).json(projects)
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    create: (req, res) => {
        try {
            const { title, description, repo_url }  = req.body

            if (!title) {
                return res.status(400).json({ error : 'Titulo debe ser obligatorio'})
            }

            const newProject = createProject(title, description, repo_url)
            res.status(201).json(newProject)

        } catch (error) {
            console.log(`Èrror: ${error}`);
            
            res.status(500).json({message: error})
        }
    }
}

module.exports = projectController;