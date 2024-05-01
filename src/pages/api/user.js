import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('./data/db.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            const { email } = req.query;
            const user = dbData.users.find(u => u.email === email);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                // Return the user data
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Failed to fetch user. Please try again later.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}