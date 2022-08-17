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