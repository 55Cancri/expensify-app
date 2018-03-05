import { startLogin, login, startLogout, logout } from '../../actions/auth'

// with testing actions, you're just testing if the action returns
// the desired output. You can ask
// when this function (action) is run, does output correctly

test('should generate login action object', () => {
  const uid = 'abc123'
  const action = login(uid)

  // to equal an object
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  })
})

test('should generate logout action object', () => {
  const action = logout()

  expect(action).toEqual({
    type: 'LOGOUT'
  })
})
