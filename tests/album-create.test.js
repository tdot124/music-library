const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
    let db;

    const artistTestData = {
        name: "Four Tet",
        genre: "Electronica"
    };

    beforeEach(async () => {
        db = await getDb();

        await db.query('INSERT INTO Artist SET ?', artistTestData);
    });

    afterEach(async () => {
        await db.query('DELETE FROM Artist');
        await db.query('DELETE FROM Album');
        await db.end();
    });

  describe('/album', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {

        const [[artistEntries]] = await db.query(
          `SELECT * FROM Artist`
        );

        const albumTestData = {
          name: 'New Energy',
          year: 2017
        }

        const res = await request(app).post(`/artist/${artistEntries.id}/album`).send(albumTestData);

        expect(res.status).to.equal(201);        
        
        const [[albumEntries]] = await db.query(
            `SELECT * FROM Album`
        );   

        expect(albumEntries.name).to.equal(albumTestData.name);
        expect(albumEntries.year).to.equal(albumTestData.year);
        expect(albumEntries.artistId).to.equal(artistEntries.id);
      });

      it('sends 404 if artist does not exist', async () => {

        const res = await request(app).post(`/artist/126728372983198/album`);

        expect(res.status).to.equal(404);        
        
      });
    });
  });
});