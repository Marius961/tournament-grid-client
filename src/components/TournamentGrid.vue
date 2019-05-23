<template>
    <div class="row justify-content-center" style="overflow-x: auto">
        <div class="col-auto pl-3 pr-3">
            <div class="row grid-2 align-items-center">
                <div class="col-auto stage" v-for="stageWithMatches in stagesWithMatches" :key="'tStage' + stageWithMatches.stage.id">
                    <div class="row no-gutters">
                        <h4 class="col-12 align-self-start">{{stageWithMatches.stage.name}}</h4>
                        <match :match="match" v-for="match in stageWithMatches.matches" :key="'match' + match.id"></match>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Match from "./Match";

    export default {
        computed: {
            stagesWithMatches() {
                let groupedMatches = [];

                const matchSort = (a, b) => +a.id + b.id;
                this.matches.sort(matchSort);

                this.matches.map(match => {
                    let index = groupedMatches.findIndex(elem => elem.stage.id === match.stage.id);
                    if (index > -1) {
                        let item = groupedMatches[index];
                        item.matches.push(match);
                        groupedMatches.splice(index, 1, item);
                    }
                    else {
                        groupedMatches.push({stage: match.stage, matches: [match]})
                    }
                });
                console.log(groupedMatches);
                const sortAsc = (a, b) => +a.stage.code - +b.stage.code;
                groupedMatches.sort(sortAsc);

                return  groupedMatches;
            }
        },
        props: {
            matches: {
                type: Array,
                required: true
            },
            teamsCount: {
                type: Number,
                required: true
            }
        },
        components: {
            'match': Match
        }
    }
</script>

<style scoped>
    @import "../assets/css/tournamentGrid.css";
</style>
