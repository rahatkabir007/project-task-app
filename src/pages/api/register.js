import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('./data/db.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const userData = req.body;
            const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            if (dbData.users.some(user => user.email === userData.email)) { 
                return res.status(409).json({ error: 'User already exists' });
            }
            dbData.users.push(userData);
            fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Failed to register user. Please try again later.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
