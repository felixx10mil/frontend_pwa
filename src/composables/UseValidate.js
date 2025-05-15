export default function useValidate() {
  const emailRule = (val) => {
    if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(val)) {
      return 'The email is invalid.'
    }
    return true
  }

  const passwordRule = (val) => {
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/.test(val)) {
      return 'Password is invalid'
    }
    return true
  }

  return { emailRule, passwordRule }
}
