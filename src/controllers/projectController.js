const { getProjects, createProject, getProjectById, deleteProject, editedProject } = require('../models/projects')
const { validateProject, validateId } = require('../schemas/projects');

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

        const result = validateProject(req.body)

        if (!result.success) {
            return res.status(400).json({ error: result.error.errors });
        }
            
        try {
            
            const newProject = createProject(result.data)
            res.status(201).json(newProject)

        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    edit: (req, res) => {
        const { id } = req.params;

        const idValidation = validateId(id);

        if (!idValidation.success) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const bodyValidation = validateProject(req.body);

        if (!bodyValidation.success) {
            return res.status(400).json({ error: bodyValidation.error.errors });
        }

        try {
            const project = getProjectById(id);

            if (!project) return res.status(404).json({ error: 'No existe' });

            const updatedProject = editedProject(id, bodyValidation.data)

            if (!updatedProject) {
                res.status(404).json({ error: 'No se realizan cambios' });
            }

            res.status(200).json(updatedProject)

        } catch (error) {
            res.status(500).json({message: error})
        }
    },

    delete: (req, res) => {
        const { id } = req.params;

        const result = validateId(id);

        if (!result.success) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        try {
            
            const project = getProjectById(id)

            if (!project) return res.status(404).json({ error: 'No existe' });

            deleteProject(id);

            res.status(200).json({ message: `Proyecto con ID ${id} eliminado correctamente` })

        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}

module.exports = projectController;