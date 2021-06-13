import {Express, Request, Response} from 'express';

export default function (app:Express){
    app.get('/api/users', async (req, res) => {
        try {
            let users = ["ARUNIMA, AKA, WRAITH"];
            res.status(200).send(users);
        } catch (error) {
            res.send(404);
        }
    })
}


