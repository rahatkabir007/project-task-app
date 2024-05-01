import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const dbPath = path.resolve('./data/db.json');
export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            const { email, password } = req.body;
            const user = dbData.users.find(u => u.email === email);

            if (!user) {
                res.status(500).json({ error: 'Invalid email' });
            } else if (user.password !== password) {
                res.status(500).json({ error: 'Wrong password' });
            } else {
                const token = jwt.sign({ userId: user.name }, 'secret_key');
                res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);

                res.status(200).json({ token });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Failed to login. Please try again later.' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}