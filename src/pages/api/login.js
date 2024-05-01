import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const dbPath = path.resolve('./data/db.json');
export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            const { email, password } = req.body;
            console.log(req.body)
            const user = dbData.users.find(u => u.email === email && u.password === password);

            if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
            } else {
                // Generate a token for the authenticated user
                const token = jwt.sign({ userId: user.name }, 'your_secret_key');

                // Set the token in a HttpOnly cookie
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