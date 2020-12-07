<template>
    <div id="my-competition-container">
        <div v-if="loading" class="loader">
            <loader></loader>
        </div>
        <div v-else-if="error" class="error">Wystąpił błąd przy pobieraniu rozgrywek :(</div>
        <div v-else>
            <div class="section-container">
                <div class="section-heading">
                    <div class="section-heading-icon">
                        <list-icon></list-icon>
                    </div>
                    MOJE ROZGRYWKI
                </div>
                <div class="section-content">
                    <div v-if="myCompetitions && myCompetitions.length === 0" class="empty-data">
                        Brak rozgrywek
                    </div>
                    <table v-else class="data-table" cellspacing="0">
                        <tr>
                            <th></th>
                            <th>Nazwa</th>
                            <th>Utworzone</th>
                            <th>Ostatnia aktualizacja</th>
                            <th>Akcje</th>
                        </tr>
                        <tr v-for="(competition, index) in myCompetitions"
                            :key="competition.id"
                            class="data-row">
                            <td>
                                <div class="index">
                                    #{{ index + 1 }}
                                </div>
                            </td>
                            <td class="competition-name">
                                {{ competition.name }}
                            </td>
                            <td>
                                {{ getNiceDate(competition.createdAt) }}
                            </td>
                            <td>
                                {{ getNiceDateTime(competition.updatedAt) }}
                            </td>
                            <td>
                                <div>
                                    <div class="button"
                                         @click="routeToCompetition(competition.routeName)">PODGLĄD
                                    </div>
                                    <div class="button"
                                         @click="routeToEdit(competition.routeName)">EDYCJA
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="button bottom-button" @click="routeToEdit('nowe')">DODAJ NOWE</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import getMyCompetitions from '@/graphql/getMyCompetitions.graphql';
    import loader from '@/components/Loader.vue';
    import listIcon from '@/assets/icons/list.svg';
    import { getUserId } from '@/scripts/getContextData.ts';

    export default {
        layout: 'simple',
        middleware: 'authenticated',
        components: {
            loader,
            listIcon
        },
        data () {
            return {
                loading: true,
                error: false
            };
        },
        apollo: {
            myCompetitions: {
                prefetch: true,
                query: getMyCompetitions,
                variables () {
                    return {
                        userId: getUserId(this)
                    };
                }
            }
        },
        watch: {
            myCompetitions (result: any) {
                this.loading = false;
                this.error = result === undefined;
            }
        },
        mounted () {
            const loginGreetings = this.$cookies.get('nuxt-login-greetings');

            if (!loginGreetings) {
                setTimeout(() => {
                    this.$store.dispatch('showSnackbar', { message: `Witaj ${this.$auth.user.name}!` });
                }, 500);
                this.$cookies.set('nuxt-login-greetings', true);
            }
        },
        methods: {
            getNiceDateTime (dateTime: string) {
                return this.$dayjs(dateTime).format('DD-MM-YYYY HH:mm:ss');
            },
            getNiceDate (dateTime: string) {
                return this.$dayjs(dateTime).format('DD-MM-YYYY');
            },
            routeToCompetition (routeName: string) {
                this.$router.push(`/${routeName}`);
            },
            routeToEdit (routeName: string = '') {
                this.$router.push(`/edycja/${routeName}`);
            }
        }
    };
</script>

<style lang="scss">
    #my-competition-container {
        min-height: 100%;
        padding-top: 56px;
        padding-bottom: 16px;
        box-sizing: border-box;
        font-weight: 300;
        line-height: 24px;
        position: absolute;
        display: inline-block;
        overflow-x: hidden;

        .error {
            text-align: center;
            color: var(--content1-color);
            padding-top: 32px;
        }

        .loader {
            position: fixed;
            top: calc(50% - 20px);
            left: calc(50% - 32px);
        }

        @media (orientation: landscape) and (max-width: 1000px) {
            padding-bottom: unset;
        }

        .section-container {
            padding: 32px 48px;
        }

        .section-heading, .section-content {
            color: var(--content1-color);
        }

        .section-heading {
            display: flex;
            align-items: center;
            font-weight: 800;
            font-size: 120%;
            color: var(--main-color);
            line-height: 1;
            margin-bottom: 8px;
        }

        .section-heading-icon {
            display: inline-flex;
            margin-right: 12px;
        }

        .section-heading-icon > * {
            fill: var(--main-color);
        }

        .data-table {
            border-collapse: separate;
            border-radius: $data-row-border-radius;
            padding-top: 24px;
            padding-bottom: 24px;
        }

        .data-row {
            white-space: nowrap;
        }

        .data-row > td {
            background-color: var(--bg1-color);
            padding: 8px 16px;
        }

        .data-row:not(:last-child) > td {
            border-bottom: 1px solid var(--content-divider-color);
        }

        .data-row:nth-child(2) > td:first-child {
            border-top-left-radius: $data-row-border-radius;
        }

        .data-row:nth-child(2) > td:last-child {
            border-top-right-radius: $data-row-border-radius;
        }

        .data-row:last-child > td:first-child {
            border-bottom-left-radius: $data-row-border-radius;
        }

        .data-row:last-child > td:last-child {
            border-bottom-right-radius: $data-row-border-radius;
        }

        .data-table > tr > th {
            text-align: center;
            font-size: 88%;
            line-height: 16px;
            font-weight: 200;
            padding: 8px 18px;
            color: var(--content5-color);
        }

        .data-row > td {
            text-align: center;
            padding: 16px 18px;
        }

        .data-row > td:first-child {
            font-weight: 600;
        }

        .data-row > td.competition-name {
            text-align: left;
        }

        .data-row .index {
            opacity: 0.5;
        }

        .empty-data {
            margin-bottom: 16px;
            margin-top: 12px;
            padding: 4px;
        }

        @media (max-width: 1000px) {
            max-width: 100vw;

            .data-table {
                padding-top: 8px;
            }

            .section-content {
                overflow-x: auto;
                padding: 0 16px;
            }

            .section-container {
                padding: 16px 0;
            }

            .section-heading {
                margin: 0 16px 8px 16px;
            }

            .bottom-button {
                margin-left: 16px;
            }

            .data-row th {
                padding: 0 8px;
            }

            .data-row td {
                padding: 8px;
            }

            .empty-data {
                margin-top: 8px;
            }
        }

        @media not all and (orientation: landscape) {
            .loader {
                left: calc(50% - 32px);
            }
        }

        .button:not(:last-child) {
            margin-right: 4px;
        }
    }
</style>
