const { z } = require('zod');

const projectSchema = z.object({
    title: z.string({
        invalid_type_error: 'El título debe ser un texto',
        required_error: 'El título es obligatorio'
    }).min(3, 'El título debe tener al menos 3 caracteres'),
    
    description: z.string(),
    technologies: z.string().optional(),
    image_url: z.url('Debe ser una URL válida').optional().or(z.literal('')),
    repo_url: z.url('Debe ser una URL válida').optional().or(z.literal('')),
    live_url: z.url('Debe ser una URL válida').optional().or(z.literal(''))
});

// Validación para el ID (que viene como string en los params, pero debe ser un número)
const idSchema = z.string().regex(/^\d+$/, 'El ID debe ser un número');

function validateProject(object) {
  return projectSchema.safeParse(object);
}

function validateId(id) {
  return idSchema.safeParse(id);
}

module.exports = { validateProject, validateId };