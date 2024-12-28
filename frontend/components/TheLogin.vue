<script setup lang="ts">
const { isShow, toggle, error, doLogin, isLoading } = $(rwaAuthStore())
</script>

<template>
  <BsDialogDefault :show="isShow" @close="toggle">
    <div class="space-y-6 pb-8 sm:min-w-sm">
      <BsAlertError v-show="error">
        {{ error }}
      </BsAlertError>
      <BsLoading :isLoading="isLoading" mx-auto text-black>
        <div space-y-3 text-center>
          <BsBtnBlack @click="doLogin('twitter')">
            <span>Sign in with Twitter</span>
            <span i-logos-twitter h-5 w-5 ml-2 />
          </BsBtnBlack>
          <BsBtnBlack @click="doLogin('github')" v-if="false">
            <span>Sign in with Github</span>
            <span i-mdi-github h-5 w-5 ml-2 text-white />
          </BsBtnBlack>
        </div>
      </BsLoading>
    </div>
  </BsDialogDefault>
</template>
