<template>
    <div class="menu-items-container">
        <div class="menu-label">
            Udostępnij:
        </div>
        <ShareNetwork network="facebook"
                      :url="getFullUrl(competition.routeName)"
                      :title="competition.name"
                      :description="competition.description"
                      hashtags="rozgrywki.info">
            <div class="menu-item">
                <facebook-icon></facebook-icon>
                <span>Facebook</span>
            </div>
        </ShareNetwork>
        <ShareNetwork network="email"
                      :url="getFullUrl(competition.routeName)"
                      :title="competition.name"
                      :description="competition.description">
            <div class="menu-item">
                <email-icon></email-icon>
                <span>E-mail</span>
            </div>
        </ShareNetwork>
        <ShareNetwork network="whatsapp"
                      :url="getFullUrl(competition.routeName)"
                      :title="competition.name"
                      :description="competition.description">
            <div class="menu-item">
                <whatsapp-icon></whatsapp-icon>
                <span>Whatsapp</span>
            </div>
        </ShareNetwork>
        <ShareNetwork network="twitter"
                      :url="getFullUrl(competition.routeName)"
                      :title="competition.name">
            <div class="menu-item">
                <twitter-icon></twitter-icon>
                <span>Twitter</span>
            </div>
        </ShareNetwork>

        <div class="menu-item" @click="onCopyClicked">
            <link-icon></link-icon>
            <span>Kopiuj link</span>
        </div>
    </div>
</template>

<script lang="ts">
    import emailIcon from '@/assets/icons/email.svg';
    import linkIcon from '@/assets/icons/link.svg';
    import facebookIcon from '@/assets/icons/facebook.svg';
    import twitterIcon from '@/assets/icons/twitter.svg';
    import whatsappIcon from '@/assets/icons/whatsapp.svg';

    export default {
        components: {
            emailIcon, linkIcon, facebookIcon, twitterIcon, whatsappIcon
        },
        data () {
            return {
                competition: this.$store.state.competition
            };
        },
        methods: {
            getFullUrl (route: String): String {
                return `www.rozgrywki.info/${route}`;
            },
            onCopyClicked () {
                this.$copyText(this.getFullUrl(this.competition.routeName)).then(() => {
                    this.$store.dispatch('showSnackbar', 'Skopiowano link do schowka');
                });
            }
        }
    };
</script>
