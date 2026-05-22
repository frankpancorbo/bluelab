import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        // Buscamos la carpeta "portfolio" en la raíz del proyecto
        const directoryPath = path.join(process.cwd(), 'portfolio');
        
        // Comprobación de seguridad: verificamos si la carpeta existe realmente
        if (!fs.existsSync(directoryPath)) {
            console.log("Aviso: La carpeta no se encontró en la ruta:", directoryPath);
            // Devolvemos un array vacío para que la web no falle y muestre el mensaje de "Carpeta vacía"
            return res.status(200).json([]);
        }
        
        // Leemos todos los archivos dentro de la carpeta
        const files = fs.readdirSync(directoryPath);
        
        // Filtramos para devolver únicamente archivos de imagen reales
        const imageFiles = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
        
        // Enviamos la lista de imágenes en formato JSON al HTML
        res.status(200).json(imageFiles);
    } catch (error) {
        console.error('Error leyendo la carpeta portfolio:', error);
        res.status(200).json([]);
    }
}
