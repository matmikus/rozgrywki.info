<template>
    <div class="menu-items-container">
        <div class="menu-item">
                <person-icon></person-icon>
                <span>Logowanie</span>
            </div>
            <div class="menu-item">
                <person-add-icon></person-add-icon>
                <span>Nowe konto</span>
            </div>
            <div class="menu-item">
                <ball-icon></ball-icon>
                <span>O aplikacji</span>
            </div>
    </div>
</template>

<script lang="ts">
    import personIcon from '@/assets/icons/person.svg';
    import personAddIcon from '@/assets/icons/person_add.svg';
    import ballIcon from '@/assets/icons/ball.svg';

    export default {
        components: { personIcon, personAddIcon, ballIcon }
    };
</script>
