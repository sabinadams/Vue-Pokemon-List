<template>
	<div class="container">
		<img alt="Vue logo" src="./assets/pokemon-logo.svg" />
		<div class="search-bar">
			<input
				class="search-box"
				placeholder="Filter pokémon..."
				v-model="filterText"
			/>
			<p v-if="filteredPokemon.length" class="poke-count">
				{{ filteredPokemon.length }} Pokémon
			</p>
		</div>
		<div class="pokemon-list" :class="{empty: filteredPokemon.length === 0 }">
			<PokeBall v-for="(poke, i) in filteredPokemon" balltype="poke" :pokemon="poke" :key="i"/>
			<PokeBall v-if="!allPokemonFound && !filterText.length" balltype="load" @click="getMorePokemon"/>
			<h4 v-if="!filteredPokemon.length" class="list-warning">No Pokémon matched your search. Open the ball to begin searching again!</h4>
			<PokeBall v-if="!filteredPokemon.length" balltype="ghost" @click="filterText = ''" />
		</div>
	</div>
</template>

<script>
import { computed, ref } from "vue"
import { usePokemonList } from '@/composable/usePokemonList'
import PokeBall from '@/components/pokeball'

export default {
	name: "App",
	setup() {
		const { pokemon, getMorePokemon, allPokemonFound } = usePokemonList()
		const filterText = ref('')
		const filteredPokemon = computed( () => {
			let filter = filterText.value
			if (!filter.length) return pokemon.value
			return pokemon.value.filter( poke => 
				poke.name.toLowerCase().includes(filter.toLowerCase())
			);
		})

		return {
			filteredPokemon,
			filterText,
			getMorePokemon,
			allPokemonFound
		}
	},
	components: {
		PokeBall
	}
}
</script>

<style scoped>
	@import 'app.css';
</style>