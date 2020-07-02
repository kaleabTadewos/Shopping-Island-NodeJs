const lib =  require('../testDemoFunctions/lib');

describe('absolute' , () => {
    it('absolute - should return a positive number for positive input' , () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('absolute - should return a positive number for negative input' , () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('absolute - should return a zero number for zero input' , () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});
