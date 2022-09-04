const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete album', () => {
    let db;
    let albums;
    beforeEach(async () => {
      db = await getDb();
      await Promise.all([
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Four Tet',
          'Electronica',
        ]),
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Noisia',
          'Drum & Bass',
        ]),
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Tool',
          'Rock',
        ]),
      ]);  

      const [artists] = await db.query('SELECT * FROM Artist');

        const fourTet = artists[0];
        const noisia = artists[1];
        const tool = artists[2];

      await Promise.all([
        db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
          'New Energy',
          2017,
          fourTet.id,
        ]),
        db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
          'Split The Atom',
          2010,
          noisia.id,
        ]),
        db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
          '10,000 Days',
          2006,
          tool.id,
        ]),
      ]);
      [albums] = await db.query('SELECT * FROM Album');
    });
  
    afterEach(async () => {
      await db.query('DELETE FROM Album');
      await db.query('DELETE FROM Artist');
      await db.end();
    });
  
    describe('/album/albumId', () => {
      describe('DELETE', () => {
        it('deletes a single album with the correct id', async () => {
         
          const album = albums[0];
          const res = await request(app).delete(`/album/${album.id}`).send();
  
          expect(res.status).to.equal(200);
  
          const [
            [deletedAlbumRecord]
          ] = await db.query('SELECT * FROM Album WHERE id = ?', [album.id]);
  
          expect(!!deletedAlbumRecord).to.be.false;
        });
  
        it('returns a 404 if the album is not in the database', async () => {
          const res = await request(app).delete('/album/999999').send();
  
          expect(res.status).to.equal(404);
        });
      });
    });
});

