import {getAllMentors, GET_ALL_MENTORS, getAllMentees, GET_ALL_MENTEES, setMentors, SET_MENTORS, setMentees, SET_MENTEES} from '../users-search.actions'

describe('getAllMentors', () => {
	it('creates a GET_ALL_MENTORS action with a message', () => {
		expect(getAllMentors()).toEqual({
			type: GET_ALL_MENTORS,
		})
	})
})

describe('getAllMentees', () => {
	it('creates a GET_ALL_MENTEES action with a message', () => {
		expect(getAllMentees()).toEqual({
			type: GET_ALL_MENTEES,
		})
	})
})

describe('setMentors', () => {
	it('creates a SET_MENTORS action with a message', () => {
		const mentors = 'MyMessage';
		expect(setMentors(mentors)).toEqual({
			type: SET_MENTORS,
			mentors
		})
	})
})

describe('setMentees', () => {
	it('creates a SET_MENTEES action with a message', () => {
		const mentees = 'MyMessage';
		expect(setMentees(mentees)).toEqual({
			type: SET_MENTEES,
			mentees
		})
	})
})