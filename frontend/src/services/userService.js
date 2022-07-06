import $api from '../http'

export default class UserService {
  static fetchUsers() {
    $api.get('/users')
  }
}
