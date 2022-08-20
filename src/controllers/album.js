const getDb = require('../services/db');

exports.create = async (req,res) => {
    const { name, year} = req.body;
    const { artistId } = req.params;

    const db = await getDb();

    const [[artist]] = await db.query(`SELECT * FROM Artist WHERE id = ?`, 
    [artistId]);

    if (!artist) {
        res.status(404).json(`artist not exist ${artistId}`);
    } else {
    try {
        await db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
            name,
            year,
            artistId,
        ]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).json(err);
    }
    db.end();
}
}

exports.read = async (_,res) => {
    const db = await getDb();

    try {
        const [albums] = await db.query('SELECT * FROM Album');
        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json(err);
    }
    db.end();
}

exports.readById = async (req,res) => {
    const db = await getDb();
    const { albumId } = req.params;
    
    const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', albumId);

    if(!album) {
        res.sendStatus(404);
    } else {
        res.status(200).json(album);
    }
    db.end();
    };

exports.updateById = async (req,res) => {
    const db = await getDb();
    const { albumId } = req.params;
    const data = req.body;

    try {
        const [
            { affectedRows }
        ] = await db.query('UPDATE Album SET ? WHERE id = ?', [data, albumId]);
        
        if (!affectedRows) {
            res.sendStatus(404);
        } else {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }     
    db.end();
}

exports.deleteById = async (req,res) => {
    const db = await getDb();
    const { albumId } = req.params;

    const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', albumId);
    
    if (!album) {
        res.sendStatus(404);
    } else {

    try {
        await db.query('DELETE FROM Album WHERE id = ?', albumId);
        res.status(200).send();
        } catch (err) {
        res.sendStatus(500).json(err);
    }    
    db.end();
}
}