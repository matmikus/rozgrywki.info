<template>
    <div>
        <div class="menu-label">
            Udostępnij:
        </div>
        <div class="menu-item">
            <facebook-icon></facebook-icon>
            <span>Facebook</span>
        </div>
        <div class="menu-item">
            <email-icon></email-icon>
            <span>E-mail</span>
        </div>
        <div class="menu-item">
            <whatsapp-icon></whatsapp-icon>
            <span>Whatsapp</span>
        </div>
        <div class="menu-item">
            <twitter-icon></twitter-icon>
            <span>Twitter</span>
        </div>
        <div class="menu-item">
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
        components: { emailIcon, linkIcon, facebookIcon, twitterIcon, whatsappIcon }
    };
</script>
