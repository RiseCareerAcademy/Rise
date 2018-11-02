const { postMatches, getAllMatches, getMatchById, getMatchByUserId } = require('../match.controller');

jest.mock('../../../db');
const db = require('../../../db');

describe('postMatches', () => {
	let res;
	let rows;
	let err;

	beforeEach(() => {
		rows = [['yo mamma'], ['suckerbergs']];
		err = undefined;
		db.all = jest.fn((sql, args, cb) => {
			cb(err, rows);
		});

		res = {
			json: jest.fn(() => res),
			status: jest.fn(() => res),
		};
	});

	it('should respond 500 with missing fields', () => {
		const req = {
			body: {
				match_id: 'MyMatchId',
			},
		};

		postMatches(req, res);

		expect(res.status.mock.calls[0][0]).toBe(500);
		expect(res.json.mock.calls).toHaveLength(1);
	});

	it('should respond with rows when db is valid', () => {
		const req = {
			body: {
				match_id: 'MyMatchId',
				mentor_id: 'MyMentorId',
				mentee_id: 'MyMenteeId',
			},
		};

		postMatches(req, res);

		expect(db.all.mock.calls[0][0]).toEqual(
			`INSERT INTO Matches VALUES ('MyMatchId', 'MyMentorId','MyMenteeId')`
		);

		expect(res.json.mock.calls[0][0]).toEqual({
			success: true,
			rows: rows,
		});
	});

	it('should throw an error on database error', () => {
		const req = {
			body: {
				match_id: 'MyMatchId',
				mentor_id: 'MyMentorId',
				mentee_id: 'MyMenteeId',
			},
		};
		
		err = new Error('Some Fatal Database Error');

		// NOTE: Create a new anonymous function that returns the function
		// that throws the error.
		expect(() => postMatches(req, res)).toThrowError(err);
	});
});