import { setUser, SET_USER, getUser, GET_USER, registerMentee, REGISTER_MENTEE, registerWithLinkedin, REGISTER_WITH_LINKEDIN, uploadProfilePic, UPLOAD_PROFILE_PIC, failedRegisterMentee,FAILED_REGISTER_MENTEE, failedRegisterMentor, FAILED_REGISTER_MENTOR, failedLogin, FAILED_LOGIN, logoutUser, LOGOUT_USER, setUserFields, SET_USER_FIELDS, registerMentor, REGISTER_MENTOR, login, LOGIN } from '../user.actions';

describe('setUser', () => {
	it('creates a SET_USER action with a message', () => {
		const user = 'MyMessage';
		expect(setUser(user)).toEqual({
			type: SET_USER,
			user
		})
	})
})

describe('getUser', () => {
	it('creates a GET_USER action with a message', () => {
		const userId = 'MyMessage';
		expect(getUser(userId)).toEqual({
			type: GET_USER,
			userId
		})
	})
})

describe('registerMentee', () => {
	it('rcreates a REGISTER_MENTEE action with a number', () => {
		const mentee = 5;
		expect(registerMentee(mentee)).toEqual({
			type: REGISTER_MENTEE,
			mentee
		})
	})
})

describe('registerWithLinkedin', () => {
	it('rcreates a REGISTER_WITH_LINKEDIN action with a number', () => {
		expect(registerWithLinkedin()).toEqual({
			type: REGISTER_WITH_LINKEDIN,
		})
	})
})

describe('uploadProfilePic', () => {
	it('rcreates a UPLOAD_PROFILE_PIC action with a number', () => {
        const uri = 5;
        const user_id = 5;
		expect(uploadProfilePic(uri, user_id)).toEqual({
			type: UPLOAD_PROFILE_PIC,
			uri, user_id
		})
	})
})

describe('failedRegisterMentee', () => {
	it('rcreates a FAILED_REGISTER_MENTEE action with a number', () => {
		const error = 5;
		expect(failedRegisterMentee(error)).toEqual({
			type: FAILED_REGISTER_MENTEE,
			error
		})
	})
})

describe('failedRegisterMentor', () => {
	it('rcreates a FAILED_REGISTER_MENTOR action with a number', () => {
		const error = 5;
		expect(failedRegisterMentor(error)).toEqual({
			type: FAILED_REGISTER_MENTOR,
			error
		})
	})
})

describe('failedLogin', () => {
	it('rcreates a FAILED_LOGIN action with a number', () => {
		const error = 5;
		expect(failedLogin(error)).toEqual({
			type: FAILED_LOGIN,
			error
		})
	})
})

describe('logoutUser', () => {
	it('rcreates a LOGOUT_USER action with a number', () => {
		expect(logoutUser()).toEqual({
			type: LOGOUT_USER,
		})
	})
})

describe('setUserFields', () => {
	it('rcreates a SET_USER_FIELDS action with a number', () => {
		const fields = 5;
		expect(setUserFields(fields)).toEqual({
			type: SET_USER_FIELDS,
			fields
		})
	})
})

describe('registerMentor', () => {
	it('rcreates a REGISTER_MENTOR action with a number', () => {
		const mentor = 5;
		expect(registerMentor(mentor)).toEqual({
			type: REGISTER_MENTOR,
			mentor
		})
	})
})

describe('login', () => {
	it('rcreates a LOGIN action with a number', () => {
        const email_address = 5;
        const password = 5;
		expect(login(email_address, password)).toEqual({
			type: LOGIN,
			email_address, password
		})
	})
})
