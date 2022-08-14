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
        const [artist] = await db.query('SELECT * FROM Artist');
        res.status(200).json(artist);    
    } catch (err) {
        res.status(500).json(err);
    }
    db.end();
};

exports.readById = async (req,res) => {
    const db = await getDb();
    const { artistId } = req.params;
    
    const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', artistId);
    
    if (!artist) {
        res.sendStatus(404);
    } else {
        res.status(200).json(artist);
    }
    db.end();            
    };
    


  