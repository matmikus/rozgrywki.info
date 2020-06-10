<template>
    <div class="menu-items-container">
        <div class="menu-label">
            Udostępnij:
        </div>
        <ShareNetwork network="facebook"
                      :url="competition.link"
                      :title="competition.name"
                      :description="competition.description"
                      hashtags="rozgrywki.info">
            <div class="menu-item">
                <facebook-icon></facebook-icon>
                <span>Facebook</span>
            </div>
        </ShareNetwork>
        <ShareNetwork network="email"
                      :url="competition.link"
                      :title="competition.name"
                      :description="competition.description">
            <div class="menu-item">
                <email-icon></email-icon>
                <span>E-mail</span>
            </div>
        </ShareNetwork>
        <ShareNetwork network="whatsapp"
                      :url="competition.link"
                      :title="competition.name"
                      :description="competition.description">
            <div class="menu-item">
                <whatsapp-icon></whatsapp-icon>
                <span>Whatsapp</span>
            </div>
        </ShareNetwork>
        <ShareNetwork network="twitter"
                      :url="competition.link"
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
        components: { emailIcon, linkIcon, facebookIcon, twitterIcon, whatsappIcon },
        data () {
            return {
                competition: this.$store.state.competition
            }
        },
        methods: {
            onCopyClicked () {
                const el = document.createElement('textarea');
                el.value = this.competition.link;
                document.body.appendChild(el);
                el.select();
                // el.setSelectionRange(0, 99999);// For mobile devices
                document.execCommand('copy');
                document.body.removeChild(el);

                this.$store.dispatch('showSnackbar', 'Skopiowano link do schowka')
            }
        }
    };
</script>
