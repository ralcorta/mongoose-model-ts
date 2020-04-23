import { Person } from './person'

test('should return true if the person was created by save function successfully', async () => {
  const person = new Person({ name: "Rodrigo", age: 21 });

  person.save();

  const result = await Person.findById(person.id);

  expect(result?.id).toBe(person.id);
})
