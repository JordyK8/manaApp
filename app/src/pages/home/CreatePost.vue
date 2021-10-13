<template>
    <Page>
        <ActionBar>
          <StackLayout orientation="horizontal">
            <Label text="Post a message"></Label>
            <Button v-if="messageContent" @tap="postMessage">Send</Button>
          </StackLayout>
        </ActionBar>
        <StackLayout v-if="!showPicker">
          <StackLayout padding="10" backgroundColor="#f2ef23" orientation="horizontal">
            <FlexboxLayout marginLeft="5" padding="5" borderWidth="1" borderRadius="10" orientation="horizontal">
              <Label marginLeft="4" class="fa" :text="'fa-clock-o' | fonticon"></Label>
              <Label marginLeft="5" text="Direct"></Label>
              <Label marginLeft="5" marginRight="5" class="fa" :text="'fa-caret-down' | fonticon"></Label>
            </FlexboxLayout>
            <FlexboxLayout marginLeft="10" padding="5" borderWidth="1" borderRadius="10" orientation="horizontal">
              <Label marginLeft="4" class="fa" :text="'fa-clock-o' | fonticon"></Label>
              <Label marginLeft="5" text="Direct"></Label>
              <Label marginLeft="5" marginRight="5" class="fa" :text="'fa-caret-down' | fonticon"></Label>
            </FlexboxLayout>
          </StackLayout>
          <StackLayout>
            <TextField v-model="message" />
          </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  export default {
    data() {
      return {
        messageContent: '',
      };
    },
    methods:{
      postMessage(){
        console.log('posting,...')
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
