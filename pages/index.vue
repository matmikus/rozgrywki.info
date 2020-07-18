<template>
    <div id="index-container">
        <div class="content-card">
            <div class="card-illustration-container">
                <first-illustration class="illustration"></first-illustration>
            </div>
            <div class="card-content-container">
                <div class="heading">ROZGRYWKI.INFO</div>
                Proste, szybkie
                i&nbsp;<u>darmowe</u> narzędzie do dzielenia się wynikami rywalizacji sportowej na
                każdym
                poziomie w każdej dyscyplinie sportu opartej na bezpośrednich pojedynkach. Poprzez formularz tworzenia rozgrywek łatwo wygenerujesz stronę swoich
                zawodów, która będzie dostępna dla wszystkich pod adresem
                <i style="white-space: nowrap">www.rozgrywki.info/twoja-nazwa</i>, a&nbsp;następnie szybko dodasz
                wyniki gier lub umożliwisz to samym uczestnikom poszczególnych
                pojedynków.
            </div>
        </div>
        <div class="content-card">
            <div class="card-illustration-container">
                <second-illustration class="illustration"></second-illustration>
            </div>
            <div class="card-content-container">
                <ul class="section">
                    <div class="heading ul-heading">Rodzaje rozgrywek</div>
                    <li>
                        Pucharowe
                    </li>
                    <li>
                        Każdy z każdym
                    </li>
                    <li>
                        Puchar podwójnej eliminacji (sytem brazylijski)
                    </li>
                    <li>
                        Mieszane (etapy składające się z powyższych rodzajów)
                    </li>
                </ul>
            </div>
        </div>
        <div class="content-card">
            <div class="card-illustration-container">
                <third-illustration class="illustration"></third-illustration>
            </div>
            <div class="card-content-container">
                <ul class="section">
                    <div class="heading ul-heading">Możliwości konfiguracji rozgrywek</div>
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
        </div>
        <div class="content-card">
            <div class="card-illustration-container">
                <fourth-illustration class="illustration"></fourth-illustration>
            </div>
            <div class="card-content-container">
                Intensywnie pracujemy nad kolejnymi funkcjonalnościami. W razie pytań lub sugestii
                napisz do nas na
                <b><a href="mailto:kontakt@rozgrywki.info">kontakt@rozgrywki.info</a></b>
            </div>
        </div>
        <div class="content-card">
            <div class="card-illustration-container">
                <fifth-illustration class="illustration"></fifth-illustration>
            </div>
            <div class="card-content-container">
                <div class="heading">Zobacz przykładowe rozgrywki<br>w różnych formatach zawodów</div>
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
    </div>
</template>

<script lang="ts">
    import firstIllustration from '@/assets/illustrations/undraw_shared_goals_3d12.svg';
    import secondIllustration from '@/assets/illustrations/undraw_placeholders_rklh.svg';
    import thirdIllustration from '@/assets/illustrations/undraw_set_preferences_kwia.svg';
    import fourthIllustration from '@/assets/illustrations/undraw_online_messaging_9ro6.svg';
    import fifthIllustration from '@/assets/illustrations/undraw_online_articles_79ff.svg';

    export default {
        layout: 'simple',
        components: {
            firstIllustration,
            secondIllustration,
            thirdIllustration,
            fourthIllustration,
            fifthIllustration
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
        line-height: 24px;
        color: var(--content-txt-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;

        .content-card {
            max-width: 800px;
            display: flex;
            align-items: center;
            margin: 64px;
        }

        .content-card:first-child, .content-card:last-child {
            margin-top: 128px;
            margin-bottom: 128px;
        }

        .content-card:nth-child(odd) {
            flex-direction: row-reverse;
        }

        .card-illustration-container {
            flex: 1;
            align-self: self-start;
        }

        .illustration {
            width: 100%;
            height: auto;
            fill: var(--main-color);
            transition: fill 250ms ease-in-out;
        }

        .card-content-container {
            flex: 1;
            padding: 0 32px;
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
            font-size: 120%;
        }

        .ul-heading {
            margin-left: -16px;
        }

        .buttons-container {
            display: flex;
        }

        .button {
            border-radius: 4px;
            padding: 0 16px;
            margin: 8px 16px 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            cursor: pointer;
            font-weight: 500;
            font-size: 16px;
            color: var(--bar-txt-color);
            background-color: var(--bar-bg-color);
        }

        a:last-child > .button {
            margin-right: 0;
        }

        @media (hover: hover) {
            .button:hover {
                color: var(--bar-txt-active);
            }
        }

        @media all and (max-width: 1000px) {
            .content-card {
                margin: 32px 24px;
            }

            .content-card:first-child, .content-card:last-child {
                margin-top: 48px;
                margin-bottom: 48px;
            }
        }

        @media all and (max-width: 700px) {
            .content-card {
                flex-direction: column !important;
            }

            .illustration {
                max-height: 50vh;
                max-width: 70vw;
                margin-bottom: 16px;
            }

            .card-illustration-container {
                display: flex;
                justify-content: center;
                align-self: unset;
            }

            .card-content-container {
                padding: 0;
            }
        }

        @media all and (orientation: landscape) and (max-width: 700px) {
            .content-card {
                margin: 32px 48px;
            }
        }

    }
</style>
