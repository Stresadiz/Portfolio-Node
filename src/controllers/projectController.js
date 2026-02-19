const { getProjects, createProject, getProjectById, deleteProject } = require('../models/projects')

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
    },

    delete: (req, res) => {
        try {
            const { id } = req.params.i
            
            const project = getProjectById(id)

            if (!project) {
                return res.status(400).json({ error : 'ID debe ser obligatorio'})
            }

            deleteProject(id);

            res.status(204).json(project)

        } catch (error) {
            console.log(`Èrror: ${error}`);
            
            res.status(500).json({message: error})
        }
    }
}

module.exports = projectController;