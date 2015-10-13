var mapper = (function() {

    function map(user) {
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            email: user.email,
            address: user.homeAddress.addressLine,
            city: user.homeAddress.city,
            zip: user.homeAddress.zip
        }
    }
    return {
        map: map
    }

})();

module.exports = mapper;
