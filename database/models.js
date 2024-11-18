const Movie = require('../api/models/movie')
const User = require('../api/models/user')
const Actors = require('../api/models/actors')
const Adress = require('../api/models/adresses')
const Country = require('../api/models/country')


function addRelationsToModels() {
    try {
        Country.hasMany(User, {
            foreignKey: 'countryId',
            as: 'users'
        });

        User.belongsTo(Country, {
            foreignKey: 'countryId',
            as: 'country'
        });
        User.hasOne(Adress, {
            foreignKey: 'userId',
            as: 'adresses'
        });

        Adress.belongsTo(User, {
            foreignKey: 'usersId',
            as: 'user'
        });

        Actors.belongsToMany(Movie, {
            through: 'ActorMovies',
            as: 'movie',
            foreignKey: 'actorsId',
            timestamps: false
        });


        Movie.belongsToMany(Actors, {
            through: 'ActorsMovies',
            as: 'actors',
            foreignKey: 'movieId',
            timestamps: false
        });
        console.log('Relations added to all models')
    } catch (error) {
        throw error
    }
}

module.exports = addRelationsToModels


