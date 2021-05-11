import { ref, watchEffect } from "vue"

export function usePokemonList() {
    let pokemon = ref([])
    let lastResponse = ref({
        next: 'https://pokeapi.co/api/v2/pokemon?limit=100'
    })
    let allPokemonFound = ref(false)

    getMorePokemon()

    watchEffect(() => {
        allPokemonFound.value = pokemon.value.length === lastResponse.value.count
    })

    function getMorePokemon() {
        if (allPokemonFound.value) return
        fetch(lastResponse.value.next)
            .then(response => response.json())
            .then(data => {
                pokemon.value.push(...data.results)
                lastResponse.value = data
            })
    }

    return {
        pokemon,
        getMorePokemon,
        allPokemonFound
    }
}