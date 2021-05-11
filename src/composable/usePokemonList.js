import { ref, computed } from "vue"

export function usePokemonList() {
    let pokemon = ref([])
    let lastResponse = ref({
        next: 'https://pokeapi.co/api/v2/pokemon?limit=100',
        count: null
    })
    const allPokemonFound = computed(() => {
        return pokemon.value.length === lastResponse.value.count
    })


    getMorePokemon()

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