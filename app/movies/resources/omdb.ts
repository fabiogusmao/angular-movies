export default function OMDB($resource) {
    // Angular $resource: https://docs.angularjs.org/api/ngResource/service/$resource
    return $resource(null, null, {
        get: {
            url: 'http://www.omdbapi.com/?i=:movieId&y=&plot=full&r=json',
            method: 'GET'
        },
        search: {
            url: 'http://www.omdbapi.com/?s=:query&y=:year&plot=short&type=movie&r=json&page=:page',
            method: 'GET'
        }
    })
}
OMDB.$inject = ['$resource'];