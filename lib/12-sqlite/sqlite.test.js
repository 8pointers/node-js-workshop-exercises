const { promisify } = require('util');
const sqlite3 = require('sqlite3').verbose();

describe('sqlite', function() {
  let run, get, all;
  beforeEach(() => {
    database = new sqlite3.Database('test.db');
    run = promisify(database.run.bind(database));
    get = promisify(database.get.bind(database));
    all = promisify(database.all.bind(database));
  });
  it('should be able to use relational database', async function() {
    await run(
      `create table if not exists person(
        id integer primary key,
        name varchar(255) not null
      )`
    );
    await run('delete from person');
    await run('insert into person(name) values(?)', 'First');
    const person = await get('select * from person where id = ?', 1);
    expect(person).toEqual({ id: 1, name: 'First' });

    await Promise.all(['Second', 'Third', 'Fourth'].map(name => run('insert into person(name) values (?)', name)));
    const people = await all('select * from person');
    expect(people).toEqual([
      { id: 1, name: 'First' },
      { id: 2, name: 'Second' },
      { id: 3, name: 'Third' },
      { id: 4, name: 'Fourth' }
    ]);
  });
});
