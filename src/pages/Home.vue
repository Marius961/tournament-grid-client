<template>
    <div>
        <div class="row">
            <div class="col-12 t-container">
                <div class="row">
                    <div class="col-12 t-filler"></div>
                    <div class="col-12 text-center">Tournament builder</div>
                </div>
            </div>
            <div class="col-12 m-0 t-info-segment">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <div class="row">
                                <h4 class="col-12 font-weight-bold">Що таке Tournament builder?</h4>
                                <p class="col-12">Сервіс для побудови турнірних сіток до 64-х команд.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <router-link to="/tournaments" tag="button" class="col-auto t-btn t-btn-primary">Перейти до турнірів</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 t-container">
                <div class="row">
                    <div class="col-12 t-filler"></div>
                    <div class="col-12 text-center img-2">
                        <img src="../assets/img/logo.png" alt="">
                    </div>
                </div>
            </div>
            <div class="col-12 t-info-segment">
                <div class="row align-items-center">
                    <div class="col-4">
                        <div class="row text-right">
                            <h3 class="col-12">Відслідковування турнірів</h3>
                            <p class="col-12">Кожен може відслідкувати статус будт-якого турніру, переглянути рахунок, стадію турніру, та інші деталі.</p>
                        </div>
                        <div class="row justify-content-end mt-4 pr-4">
                            <router-link to="/tournaments" tag="button" class="col-auto t-btn t-btn-primary">Спробувати</router-link>
                        </div>
                    </div>
                    <div class="col-8 img-auto">
                        <img src="../assets/img/grid_1.png" alt="s">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    @import "../assets/css/home.css";
</style>
