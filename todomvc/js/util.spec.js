describe('util', function() {

    describe('uuid', function() {

        it('should return a string of 36 chars', function() {
            var result = util.uuid();
            expect(result.length).toBe(36);
        });
    });

});
