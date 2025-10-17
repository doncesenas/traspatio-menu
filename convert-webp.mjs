import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './public/images';   // 📁 Carpeta donde están tus imágenes
const outputDir = './src/assets/webp'; // 📁 Carpeta de salida (puedes cambiarla)

fs.mkdirSync(outputDir, { recursive: true });

const validExt = ['.jpg', '.jpeg', '.png'];

const files = fs.readdirSync(inputDir);

files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    if (validExt.includes(ext)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${name}.webp`);

        sharp(inputPath)
            .toFormat('webp', { quality: 85 }) // puedes ajustar calidad 0–100
            .toFile(outputPath)
            .then(() => console.log(`✅ Convertido: ${file} → ${name}.webp`))
            .catch((err) => console.error(`❌ Error en ${file}:`, err));
    }
});
