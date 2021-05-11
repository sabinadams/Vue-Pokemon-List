<template>
    <div class="pokeball-container" :class="{single: balltype === 'ghost'}">
        <div class="pokeball" :class="{loadMorePokeball: balltype === 'load', ghostBall: balltype === 'ghost'}">
            <div class="poke-button"></div>
            <div class="top">
                <p>{{label}}</p>
            </div>
        </div>
    </div>
</template>

<script>

import { computed } from 'vue'
export default {
    name: "PokeBall",
    props: {
        pokemon: Object,
        balltype: String
    },
    setup(props) {
        const label = computed( () => {
            switch( props.balltype ) {
                case 'load':
                    return 'Find More'
                case 'poke':
                    return props.pokemon.name.toLowerCase()
                case 'ghost':
                    return ''
                default: 
                    return ''
            }
        })
        return {
            label
        }
    }
};
</script>

<style scoped>
    @import "pokeball.css";
</style>