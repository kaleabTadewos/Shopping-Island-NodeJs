const lib =  require('../testDemoFunctions/lib');

test('it should return absolute value of a number' , () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
});