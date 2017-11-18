export default result => {
  if (Array.isArray(result)) {
    if (result.length > 0) {
      return false
    }
  } else if (result) {
    return false
  }
  return true
}
