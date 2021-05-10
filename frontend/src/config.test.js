require('dotenv').config();

function env() {
   return process.env.REACT_APP_TMDB_API_KEY;
}

describe('Testing sum', () => {

    it('should equal',()=>{
       expect(env()).toBe('0ec54aae79a99439218831a0b6053b81');
    });
    
    test('also should equal', () => {
        expect(env()).toBe('0ec54aae79a99439218831a0b6053b81');
    }); 
});