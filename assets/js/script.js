$(document).ready(function () {
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/'

    $('#nextTo').click(function (e) {
        e.preventDefault();
        $(".card-pokemon").html(" ");
        fetchPokemon();
    })

    fetchPokemon();

    function fetchPokemon() {
        $.ajax({
            url: endpoint,
            method: 'GET',
            success: function (response) {
                console.log(response);
                endpoint = response.next;
                response.results.forEach(function (pokemon) {
                    let list = `<div class='card col-3'>
                    <div class='card-body'> 
                    <h5 class='card-title'>${pokemon.name}</h5>
                    <a href='#' url='${pokemon.url}' 
                    class='btn btn-light btn-sm'>¡Quiero saber más
                    de este pokémon!</a> 
                    </div>
                    </div>`
                    $(".card-pokemon").append(list)
                })
            },
            complete: function () {
                $('.btn-light').click(
                    function (e) {
                        e.preventDefault();
                        $('#exampleModal').modal('show');
                        let data = ($(this).attr('url'));
                        // console.log(data);
                        $.ajax({
                            url: data,
                            method: 'GET',
                            success: function (response) {
                                let name = response.name
                                let type = response.types[0].type.name
                                let url_type = response.types[0].type.url

                                $.ajax({
                                    url: url_type,
                                    method: 'GET',
                                    success: function (response) {
                                        let generation = response.generation.name
                                        $('#generation').html(generation)
                                    }
                                })
                                let abi = ''
                                response.abilities.forEach(function (abilities) {
                                    abi = abi + ' ' + abilities.ability.name
                                })
                                let mov = ''
                                response.moves.forEach(function (moves, index) {
                                    if (index < 5) {
                                        mov = mov + ' ' + moves.move.name
                                    }
                                })
                                $('#exampleModalLabel').html(name)
                                $('#type').html(`Type: ${type}`)
                                $('#abilities').html(`Abilities: ${abi}`)
                                $('#moves').html(`Moves: ${mov}`)
                            }
                        })
                    }
                )
            }

        });
    }
});