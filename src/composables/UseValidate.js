export default function useValidate() {
  /**
   * Email string
   * @param {*} email
   * @returns
   */
  const emailRule = (email) => {
    if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)) {
      return 'The email is invalid.'
    }
    return true
  }

  /**
   * Password string
   * @param {*} password
   * @returns
   */
  const passwordRule = (password) => {
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/.test(password)) {
      return 'Password is invalid'
    }
    return true
  }

  /**
   * FullName string
   * @param {*} fullName
   * @returns
   */
  const fullNameRule = (fullName) => {
    if (!/^([\w]{4,})+\s+([\w\s]{4,})+$/.test(fullName)) {
      return 'FullName is invalid'
    }
    return true
  }

  return { fullNameRule, emailRule, passwordRule }
}
