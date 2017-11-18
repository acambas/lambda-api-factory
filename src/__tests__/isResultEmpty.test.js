import isResultEmpty from '../isResultEmpty'

test('should be true for empty array', () => {
  const input = []
  const res = isResultEmpty(input)
  expect(res).toEqual(true)
})

test('should be false for empty array', () => {
  const input = [1]
  const res = isResultEmpty(input)
  expect(res).toEqual(false)
})

test('should be false for object', () => {
  const input = {}
  const res = isResultEmpty(input)
  expect(res).toEqual(false)
})

test('should be true for null', () => {
  const input = null
  const res = isResultEmpty(input)
  expect(res).toEqual(true)
})
