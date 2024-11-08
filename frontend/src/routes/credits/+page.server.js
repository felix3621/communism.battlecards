// src/routes/credits/+page.js
import { promises as fs } from 'fs';
import path from 'path';
// Define the path to the JSON file outside the frontend folder
const cardsPath = path.resolve('../','backend', 'data', 'Cards.json');
const avatarPath = path.resolve('../','backend', 'data', 'Avatars.json');

// on page load / request
export async function load() {
    try {
        // Read the JSON file using Node's fs module
        const cardsData = await fs.readFile(cardsPath, 'utf-8');
        const cards = JSON.parse(cardsData);
        const avatarData = await fs.readFile(avatarPath, 'utf-8');
        const avatars = JSON.parse(avatarData);

        return {
            Cards: cards,
            Avatars: avatars
        };
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return {
            Cards: [],
            Avatars: []
        };
    }
}