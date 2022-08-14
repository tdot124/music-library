const getDb = require('../services/db');

exports.create = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;

    try {

    await db.query(
        'INSERT INTO Artist (name, genre) VALUES (?, ?)', [
            name,
            genre,
        ]);
    res.sendStatus(201);
    } catch (err) {
    res.sendStatus(500).json(err);
    }

    db.end();
  };

exports.read = async (_,res) => {
    const db = await getDb();

    try {
        const [artistData] = await db.query('SELECT * FROM Artist');
        res.status(200).json(artistData);    
    } catch (err) {
        res.status(500).json(err);
    }
    db.end();
};

  