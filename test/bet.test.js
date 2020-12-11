import { expect, server, BASE_URL } from './setup';

describe('Bets', () => {
  it('posts a bet into the db', done => {
    const data = {
      user: 1, game: 401220118, team: 2, amount: 50
    };
    server
      .post(`${BASE_URL}/placeBet`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.newBet).to.have.property('game');
        expect(res.body.newBet).to.have.property('id');
        expect(res.body.newBet).to.have.property('user');
        expect(res.body.newBet).to.have.property('amount');
        expect(res.body.newBet).to.have.property('team');
      });
    done();
  });
  it('posts a bet into the db', done => {
    const data = {
      user: 1, game: 401220117, team: 2, amount: 50
    };
    server
      .post(`${BASE_URL}/placeBet`)
      .send(data)
      .expect(422)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body).to.be.instanceOf(String);
      });
    done();
  });

  it('get bets for user', done => {
    server
      .get(`${BASE_URL}/getUserBets/1`)
      .expect(200)
      .end((err, res) => {
        // expect(res.body.bets).to.be.instanceOf(Array);
        res.body.bets.forEach(b => {
          expect(b).to.have.property('id');
          expect(b).to.have.property('game');
          expect(b).to.have.property('team');
          expect(b).to.have.property('amount');
          expect(b).to.have.property('user');
          expect(b).to.have.property('createdAt');
          expect(b).to.have.property('updatedAt');
        });
        done();
      });
  });
});
