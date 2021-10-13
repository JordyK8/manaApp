<template>
    <Page>
        <ActionBar>
            <Label text="Post a message"></Label>
        </ActionBar>
        <StackLayout>
          <StackLayout orientation="horizontal">
            <FlexboxLayout orientation="horizontal">
              <Label :text="'fa-clock-o' | fonticon"></Label>
              <Label text="Direct"></Label>
              <Label :text="'fa-caret-down' | fonticon"></Label>
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  export default {
    data() {
      return {
        message: "<!-- Search page content goes here -->"
      };
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
