/// <reference types="cypress" />

it("Assertivas de Igualdade", () => {

  const a = 1

  expect(a, "Deveria ser igual a 1").eq(1)

  expect(a).equal(1)
  expect(a).equals(1)
  expect(a).to.equal(1)
  expect(a).to.be.equal(1)

  expect(a).not.to.be.equal(0)
})

it("Assertivas booleanas", () => {

  const a = true
  const b = null
  let c;

  expect(a).to.be.true
  expect(true).to.be.true

  expect(b).to.be.null

  expect(c).to.be.undefined


})

it("Assertivas em objetos", () => {

  const obj = {
    a: 1,
    b: 2
  }

  // expect(obj).to.be.eq({a:1, b:2}) //Não funciona

  expect(obj).to.be.deep.equal({a: 1, b: 2})
  expect(obj).eql({a:1, b:2})

  expect(obj).include({a:1})

  expect(obj).to.have.property('a') //Precisa estar entre aspas
  expect(obj).to.have.property('b', 2)

  expect(obj).to.not.be.empty
  
})

it('Assertivas em arreios', () => {

  const arr = [1,2,3]

  expect(arr).to.have.members([1,2,3])
  expect(arr).to.include.members([1,3])

  expect([]).to.be.empty

})

it("Assertivas de tipagem", () => {

  const num = 3;
  const str = "Hello"

  expect(num).to.be.a('number')
  expect(str).to.be.a('string')

})

it("Assertivas em 'String'", () => {

  const str = "Hello"

  expect(str).to.have.length(5)

  expect(str).to.contains("llo")

  expect(str).to.match(/He/) //Utilizando REGEX
})

it("Assertivas em 'Numbers'", () => {

  const int = 4
  const float = 2.5

  expect(int).to.be.greaterThan(3)
  expect(int).to.be.above(3)

  expect(int).to.be.lessThan(5)
  expect(int).to.be.below(5)

  expect(float).to.be.closeTo(2.4, 0.11)

})