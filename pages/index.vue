<template>
    <div id="index-container">
        <div class="content-card"><span class="pretty-name">ROZGRYWKI.INFO</span> to proste, szybkie
            i <u>darmowe</u> narzędzie do dzielenia się wynikami rywalizacji sportowej na każdym
            poziomie w każdej dyscyplinie sportu opartej na bezpośrednich pojedynkach pomiędzy
            uczestnikami. Poprzez formularz tworzenia rozgrywek łatwo wygenerujesz stronę swoich
            zawodów, która będzie dostępna dla wszystkich pod adresem
            <i>www.rozgrywki.info/twoja&#8209;nazwa&#8209;rozgrywek</i>, a następnie szybko dodasz
            wyniki poszczególnych gier lub umożliwisz to samym uczestnikom poszczególnych
            pojedynków.
            <ul class="section">
                <div class="heading">Rodzaje rozgrywek</div>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Pucharowe
                </li>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Każdy z każdym
                </li>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Puchar podwójnej eliminacji (sytem brazylijski)
                </li>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Mieszane (etapy składające się z powyższych rodzajów)
                </li>
            </ul>
            <ul class="section">
                <div class="heading">Możliwości konfiguracji rozgrywek</div>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Punkty za wygraną / przegraną / remis (jeśli umożliwiony)
                </li>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Opcjonalnie mecz i rewanż w pucharze, runda rewanżowa w systemie każdy z każdym
                </li>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Kolejność branych pod uwagę czynników decydujących o miejscu w tabeli lub
                    zwycięzcy pucharowego dwumeczu
                </li>
                <li>
                    <div>
                        <ball-icon/>
                    </div>
                    Losowanie układu rozgrywek lub rozstawienie uczestników
                </li>
            </ul>
            Intensywnie pracujemy nad kolejnymi funkcjonalnościami. W razie pytań lub sugestii
            napisz do nas na
            <b><a href="mailto:kontakt@rozgrywki.info">kontakt@rozgrywki.info</a></b>
            <div class="section">
                <div class="heading">Zobacz przykładowe rozgrywki</div>
                <div class="buttons-container">
                    <div class="button">Puchar</div>
                    <div class="button">Liga</div>
                    <div class="button">Mieszane</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import ballIcon from '@/assets/icons/ball.svg';

    export default {
        layout: 'simple',
        components: { ballIcon },
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
        font-weight: 300;
        letter-spacing: 1px;
        line-height: 24px;
        color: var(--content-txt-color);
        background-color: var(--content-bg-color);

        .content-card {
            padding: 16px;
            overflow-wrap: break-word;
        }

        .pretty-name {
            font-weight: 400;
            font-size: 120%;
        }

        .section {
            padding: 0;
            margin: 16px 0;
        }

        ul {
            list-style: none;
        }

        li {
            display: flex;
            align-items: flex-start;
        }

        li svg {
            height: 12px;
            width: 12px;
            padding-right: 8px;
            fill: var(--content-txt-color);
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        .heading {
            margin-bottom: 8px;
            font-size: 120%;
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
            font-weight: 400;
            font-size: 16px;
            color: var(--bar-txt-color);
            background-color: var(--bar-bg-color);
        }

        @media (hover: hover) {
            .button:hover {
                color: var(--bar-txt-active);
            }
        }
    }

    @media all and (min-width: 1000px) {
        #index-container {
            .content-card {
                padding: 48px;
            }
        }
    }
</style>
