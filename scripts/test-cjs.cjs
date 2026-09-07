const assert = require('node:assert/strict')

const cjs = require('../dist/index.cjs')
const types = require('../dist/types/index.cjs')
const rules = require('../dist/rules/index.cjs')
const tool = require('../dist/tool/index.cjs')

assert.equal(typeof cjs.isString, 'function')
assert.equal(typeof types.isString, 'function')
assert.equal(typeof rules.hasMin, 'function')
assert.equal(typeof tool.map, 'function')

const user = cjs.isObject(
  cjs.map('id', cjs.isString()),
  cjs.map('age', cjs.isNumber(cjs.hasMin(0)))
)

const check = user({ id: '42', age: 35 })
assert.equal(check.isValid(), true)
assert.deepEqual(check.getParsed(), { id: '42', age: 35 })
assert.deepEqual(check.getErrors(), [])

async function interop() {
  const esm = await import('../dist/index.js')
  const mixed = esm.isObject(cjs.map('id', cjs.isString()))
  const mixedCheck = mixed({ id: 'x' })
  assert.equal(mixedCheck.isValid(), true)
  assert.deepEqual(mixedCheck.getParsed(), { id: 'x' })
}

interop()
  .then(() => {
    console.log('cjs ok')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
