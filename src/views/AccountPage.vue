<template>
  <div class="account-page">
    <div class="account-page__container">
      <div class="user-navigation">
        <img class="user-navigation__image" :src="user.image" alt="" />
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <BaseButton
          class="user-navigation__cart"
          @click.native="myOrders"
          text="My orders"
        />

        <BaseButton
          class="user-navigation__cart"
          @click.native="logOut"
          text="Log out"
        />
      </div>
      <div class="user-information">
        <h3 class="user-information__item">Username: {{ user.username }}</h3>
        <h3 class="user-information__item">Email: {{ user.email }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class AccountPage extends Vue {
  get user() {
    return this.$store.state.user;
  }

  myOrders(): void {
    this.$router.push({
      name: "CartPage",
    });
  }

  logOut(): void {
    this.$router.push({
      name: "LoginPage",
    });
    this.$store.commit("user/logoutUser");
  }
}
</script>
<style scoped lang="scss">
.account-page {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  color: $white;
  min-height: 100vh;
  width: 100%;

  &__container {
    display: flex;
    justify-content: space-around;
    max-width: 900px;
    width: 100%;
    background-color: $grey-lite;
    border-radius: 20px;
    box-shadow: 0 5px 15px 0 $grey-lite;
    padding: 20px 0;
    margin: 10px;

    .user-navigation {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 5px 15px 0 $black;
      border-radius: 20px;

      &__image {
        max-width: 200px;
        height: 200px;
        border-radius: 20px;
        box-shadow: 0 0 0 4px $black;
        margin: 16px;
        padding: 8px;
      }

      &__cart {
        width: 90%;
        margin: 8px;
      }
    }
    .user-information {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 20px;

      &__item:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
@media (max-width: 767px) {
  .account-page {
    .user-navigation__image {
      max-width: 100px;
      height: 100px;
      margin: 8px 4px;
    }
  }
}
</style>
