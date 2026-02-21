const { validateUser, validateUserId } = require('../schemas/user');
const { getUsers, getUserById, createNewUser, editUserById, deleteUser } = require('../models/user');

const userController = {
    getAll: (req, res) => {

        try {
            const allUsers = getUsers();
            res.status(200).json(allUsers);
        } 
        catch (error) {
            res.status(500).json({message: error})
        }
    },
    create: (req, res) => {

        const result = validateUser(req.body)
        
        if (!result.success) {
            return  res.status(400).json({error: result.error.errors})
        }

        try {
            const newUser = createNewUser(result.data);
            res.status(201).json(newUser)

        } catch (error) {
            res.status(500).json({message : error.message})
        }
    },
    edit: (req, res) => {
        const { id } = req.params;

        const idValidation = validateUserId(id);

        if (!idValidation.success) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const bodyValidation = validateUser(req.body);

        if (!bodyValidation.success) {
            return res.status(400).json({ error: bodyValidation.error.errors });
        }

        try {
            const user = getUserById(id);

            if (!user) return res.status(404).json({ error: 'No existe' });

            const updatedUser = editUserById(id, bodyValidation.data)

            if (!updatedUser) {
                res.status(404).json({ error: 'No se realizan cambios' });
            }

            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    delete: (req, res) => {
        const { id } = req.params;

        const result = validateUserId(id);

        if (!result.success) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        try {
            
            const user = getUserById(id)

            if (!user) return res.status(404).json({ error: 'No existe' });

            deleteUser(id);

            res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` })

        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}

module.exports = userController;