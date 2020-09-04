<template>
    <div id="index-container">
        <div class="content-card content-card--introduction">
            <div class="card-content-container">
                <div class="heading heading--introduction">Na czym to polega?</div>
                <p>
                    Jest to proste, szybkie i&nbsp;<b>darmowe</b> narzędzie do dzielenia się
                    wynikami rywalizacji sportowej na każdym poziomie w każdej dyscyplinie
                    sportu
                    opartej na bezpośrednich pojedynkach.
                </p>
                <p>
                    Poprzez formularz tworzenia rozgrywek łatwo wygenerujesz stronę swoich
                    zawodów,
                    która będzie dostępna dla wszystkich pod adresem:
                    <br><b style="white-space: nowrap">www.rozgrywki.info/twoja-nazwa</b>
                </p>
                <p>
                    Następnie szybko dodasz wyniki gier lub umożliwisz to samym uczestnikom
                    poszczególnych pojedynków.
                </p>
            </div>
            <div class="card-illustration-container">
                <first-illustration class="illustration illustration--right"></first-illustration>
            </div>
        </div>
        <div class="introduction-bottom-triangle"></div>
        <div class="content-card content-card-types">
            <div class="heading">Rodzaje rozgrywek</div>
            <div class="types">
                <div class="type-container">
                    <div class="type-icon-container">
                        <cup-icon></cup-icon>
                    </div>
                    <div class="type-name">Pucharowe</div>
                </div>
                <div class="type-container">
                    <div class="type-icon-container">
                        <football-icon></football-icon>
                    </div>
                    <div class="type-name">Każdy z każdym</div>
                </div>
                <div class="type-container">
                    <div class="type-icon-container">
                        <volleyball-icon></volleyball-icon>
                    </div>
                    <div class="type-name">Puchar podwójnej eliminacji</div>
                    <div class="type-description">(sytem brazylijski)</div>
                </div>
                <div class="type-container">
                    <div class="type-icon-container">
                        <complex-icon></complex-icon>
                    </div>
                    <div class="type-name">Mieszane</div>
                    <div class="type-description">(etapy składające się z poprzednich rodzajów)
                    </div>
                </div>
            </div>
        </div>
        <div class="content-card">
            <div class="card-content-container">
                <ul class="section">
                    <div class="heading ul-heading">Konfiguracja rozgrywek</div>
                    <li>
                        Punkty za wygraną / przegraną / remis (jeśli umożliwiony)
                    </li>
                    <li>
                        Opcjonalnie mecz i rewanż w pucharze, runda rewanżowa w systemie każdy z
                        każdym
                    </li>
                    <li>
                        Kolejność branych pod uwagę czynników decydujących o miejscu w tabeli lub
                        zwycięzcy pucharowego dwumeczu
                    </li>
                    <li>
                        Losowanie układu rozgrywek lub rozstawienie uczestników
                    </li>
                </ul>
            </div>
            <div class="card-illustration-container">
                <third-illustration class="illustration illustration--right"></third-illustration>
            </div>
        </div>
        <div class="content-card">
            <div class="card-illustration-container">
                <fourth-illustration class="illustration illustration--left"></fourth-illustration>
            </div>
            <div class="card-content-container">
                <div class="heading">Bądźmy w kontakcie!</div>
                Intensywnie pracujemy nad kolejnymi funkcjonalnościami. W razie pytań lub sugestii
                napisz do nas na <a class="mail" href="mailto:kontakt@rozgrywki.info">kontakt@rozgrywki.info</a>
            </div>
        </div>
        <div class="content-card content-card-examples">
            <div class="heading heading--examples">Zobacz przykładowe rozgrywki w różnych
                formatach zawodów
            </div>
            <div class="buttons-container">
                <nuxt-link to="/puchar-soltysa">
                    <div class="button">Puchar</div>
                </nuxt-link>
                <nuxt-link to="/liga-trojek">
                    <div class="button">Liga</div>
                </nuxt-link>
                <nuxt-link to="/mistrzostwa-wszechswiata">
                    <div class="button">Mieszane</div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import firstIllustration from '@/assets/illustrations/undraw_shared_goals_3d12.svg';
    import thirdIllustration from '@/assets/illustrations/undraw_set_preferences_kwia.svg';
    import fourthIllustration from '@/assets/illustrations/undraw_online_messaging_9ro6.svg';
    import cupIcon from '@/assets/icons/cup.svg';
    import footballIcon from '@/assets/icons/football.svg';
    import volleyballIcon from '@/assets/icons/ball.svg';
    import complexIcon from '@/assets/icons/complex.svg';

    export default {
        layout: 'simple',
        components: {
            firstIllustration,
            thirdIllustration,
            fourthIllustration,
            cupIcon,
            footballIcon,
            volleyballIcon,
            complexIcon
        },
        mounted () {
            console.log(this.$i18n.locale);// TODO to delete
            console.log(this.$t('greeting'));// TODO to delete
        }
    };
</script>

<style lang="scss">
    #index-container {
        min-height: 100%;
        padding-top: 56px;
        box-sizing: border-box;
        color: var(--content1-color);
        background-color: var(--bg2-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;
        line-height: 19px;

        .content-card {
            display: flex;
            padding: 0 16vw 128px 16vw;
        }

        .content-card--introduction {
            position: relative;
            overflow: hidden;
            background: var(--bg1-color);
            padding-bottom: 0;
            padding-top: 128px;
        }

        .content-card-types {
            flex-direction: column;
            width: 100%;
            box-sizing: border-box;
            margin-top: 40px;
        }

        .types {
            display: flex;
            justify-content: space-between;
        }

        .type-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
        }

        .type-icon-container {
            margin-top: 64px;
            margin-bottom: 16px;
            width: 128px;
            height: 128px;
        }

        .type-icon-container > * {
            fill: var(--content3-color);
            height: 100%;
            width: 100%;
        }

        .type-name {
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: var(--content2-color);
            padding: 0 16px;
            text-align: center;
        }

        .type-description {
            font-weight: 200;
            font-size: 16px;
            line-height: 19px;
            color: var(--content3-color);
            margin-top: 8px;
            padding: 0 16px;
            text-align: center;
        }

        .introduction-bottom-triangle {
            width: 100%;
            height: 128px;
            background-image: linear-gradient(to bottom right, #474A51 0%, #474A51 50%, #373740 50%, #373740 100%);
            position: relative;
            z-index: 1;
        }

        .introduction-bottom-triangle::before {
            position: absolute;
            content: "";
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: linear-gradient(to bottom right, #FFFFFF 0%, #FFFFFF 50%, #F2F3F5 50%, #F2F3F5 100%);
            z-index: -1;
            transition: opacity 250ms ease-in-out;
            opacity: 0;
        }

        .card-illustration-container {
            flex: 1;
            align-self: center;
        }

        .illustration {
            padding: 24px;
            box-sizing: border-box;
            width: 100%;
            height: auto;
            fill: var(--main-color);
            transition: fill 250ms ease-in-out;
        }

        .illustration--right {
            padding-left: 8vw;
        }

        .illustration--left {
            padding-right: 8vw;
        }

        .card-content-container {
            flex: 1;
            align-self: center;
        }

        ul {
            list-style-type: square;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        .heading {
            margin-bottom: 8px;
            font-size: 163%;
            font-weight: 500;
            line-height: 30px;
            color: var(--content2-color);
        }

        .ul-heading {
            margin-left: -16px;
            margin-bottom: 32px;
        }

        .heading--introduction {
            font-size: 238%;
            margin-bottom: 32px;
            font-weight: 600;
        }

        .heading--examples {
            font-size: 194%;
            text-align: center;
            margin-top: 32px;
        }

        .content-card-examples {
            flex-direction: column;
            width: 100%;
            box-sizing: border-box;
        }

        .section {
            list-style-type: disc;
        }

        .section > li {
            line-height: 19px;
            padding-bottom: 16px;
        }

        a.mail {
            color: var(--main-color);
            font-weight: 600;
        }

        .buttons-container {
            display: flex;
            justify-content: space-around;
            margin-top: 64px;
        }

        .button {
            border-radius: 4px;
            padding: 0 16px;
            margin: 8px 16px 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 223px;
            height: 43px;
            cursor: pointer;
            color: $button-color;
            background-color: $button-bg;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
        }

        a:last-child > .button {
            margin-right: 0;
        }

        @media (hover: hover) {
            .button:hover {
                background-color: $button-bg-hover;
            }
        }

        /*@media all and (max-width: 700px) {*/
        /*.content-card {*/
        /*flex-direction: column !important;*/
        /*}*/

        /*.illustration {*/
        /*max-height: 50vh;*/
        /*max-width: 70vw;*/
        /*margin-bottom: 16px;*/
        /*}*/

        /*.card-illustration-container {*/
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-self: unset;*/
        /*}*/
        /*}*/
    }

    .light-mode {
        #index-container {
            .introduction-bottom-triangle::before {
                opacity: 1;
            }
        }
    }
</style>
