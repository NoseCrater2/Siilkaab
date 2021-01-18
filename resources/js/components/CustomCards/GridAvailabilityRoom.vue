<template>
    <v-row justify="space-between">
        <v-col v-for="r in room" :key="r.id" cols="12" md="6" sm="12">
            <v-card   height="500" width="400">
                <v-img src="https://partourcaleta.com/images/chpanel/rooms/100001-screen.jpg" width="400" >
                   <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
                <v-card-title>{{r.name}}</v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        room: Array,
    }
}
</script>