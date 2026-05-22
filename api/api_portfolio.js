import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        // Vercel expone la raíz de tu proyecto usando process.cwd()
        // Buscamos la carpeta "portfolio" en la raíz
        const directoryPath = path.join(process.cwd(), 'portfolio');
        
        // Leemos todos los archivos dentro de esa carpeta
        const files = fs.readdirSync(directoryPath);
        
        // Filtramos para devolver únicamente archivos de imagen reales
        const imageFiles = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
        
        // Devolvemos la lista de nombres en formato JSON al navegador
        res.status(200).json(imageFiles);
    } catch (error) {
        console.error('Error leyendo la carpeta portfolio:', error);
        // Si la carpeta no existe o está vacía, devolvemos una lista vacía para no romper la web
        res.status(200).json([]);
    }
}