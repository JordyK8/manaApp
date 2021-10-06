<template>
    <Page backgroundColor="lightgrey">
    <StackLayout>
      <GridLayout columns="50, *, 50" rows="50, 50" backgroundColor="#3c495e">
        <Label text="0,0" row="0" col="0" backgroundColor="#43b883"/>
        <Label text="0,1" row="0" col="1"  backgroundColor="#1c6b48"/>
        <Label text="1,0" row="0" col="3"  backgroundColor="#289062"/>
        <Label text="hoi" row="1" colSpan="3" backgroundColor="#289062"/>
      </GridLayout>
      <FlexboxLayout backgroundColor="#3c495e" height="40">
        <Label text="first" width="70" backgroundColor="#43b883"/>
        <Label text="second" width="70" backgroundColor="#1c6b48"/>
        <Label text="third" width="70" backgroundColor="#289062"/>
      </FlexboxLayout>
      <ScrollView orientation="vertical" height="100%">
        <FlexboxLayout marginTop="15px" orientation="vertical">
            <Label  text="Recent messages"/>
            <Label  text="sorting"/>
        </FlexboxLayout>
        <ListView for="post in posts" @itemTap="onPostTap" class="list-group">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <StackLayout backgroundColor="white" marginTop="5">
              <GridLayout columns="50, *, 20" rows="65" marginTop="-10">
                <Image 
                col="0" row="0"
                  src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png" 
                  stretch="aspectFit"
                  width="40" height="40"
                />
                <StackLayout col="1" row="0">
                  <FlexboxLayout orientation="vertical">
                    <Label :text="post.user.name"/>
                    <Label fontSize="15" class="fa" :text="'fa-caret-right' | fonticon" />
                    <Label fontSize="10" :text="post.user.group" />
                  </FlexboxLayout>
                  <FlexboxLayout orientation="vertical">
                    <Label fontSize="15" class="fa" :text="'fa-clock-o' | fonticon" />
                    <Label fontSize="10" text="1 hour ago" />
                  </FlexboxLayout>

                </StackLayout>
                <Label fontWeight="lighter" marginTop="-10" col="2" row="0" fontSize="20" class="fa" :text="'fa-ellipsis-v' | fonticon" />
              </GridLayout>
              <Label :text="post.message" />
              <Image v-if="post.img"
                  src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png" 
                  stretch="aspectFit"
                  width="350" height="350"
              />
              <FlexboxLayout alignItems="flex-start" orientation="vertical" flexDirection="row">
                <Label fontSize="10" :text="`${post.likes} likes`" />
                <Label fontSize="10" :text="`${post.comments.length} comments`" />
                <Label fontSize="10" alignSelf="flex-end" :text="`${post.seen}x seen`" />
              </FlexboxLayout>
              <GridLayout class="borderedRight" rows="40" columns="*,*">
                <TextView editable="false" row="0" col="0" class="borderedLeft" style="text-align: center">
                  <FormattedString >
                    <Span class="fa" :text="'fa-thumbs-o-up' | fonticon" />
                    <Span text="Like!" />
                  </FormattedString>
                </TextView>
                <TextView editable="false" row="0" col="1" class="borderedRight" style="text-align: center" >
                  <FormattedString>
                    <Span class="fa" :text="'fa-thumbs-o-up' | fonticon" />
                    <Span text="Like!" />
                  </FormattedString>
                </TextView>
              </GridLayout>
            </StackLayout>
          </v-template>
        </ListView>
      </ScrollView>
    </StackLayout>
    </Page>
</template>

<script>

  export default {
    data() {
      return {
        posts:[
          {
            user : {
              name: "Johny",
              avatar: null,
              group: "Managers"
            },
            img: true,
            message: "The is a new post for the people who would like to read it.",
            comments:[],
            likes: 9,
            seen: 3
          },
          {
            user : {
              name: "Piedro",
              avatar: null,
              group: "Accountants"
            },
            img: null,
            message: "I lost my wigg, can anybody tell me where it is?",
            comments:[],
            likes: 2,
            seen: 1
          }
        ]
      };
    },
    methods: {
      onPostTap(args) {
        console.log('clicked')
      }
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles
  .homeText{
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }
  .borderedRight{
    border-left:0.25px solid lightgray;
    border-bottom: 0.5px solid lightgray;
    border-top: 0.5px solid lightgray;
    border-right:0.5px solid lightgray;
    border-width: 1;
    border-color:lightgray;
  }
  .borderedLeft{
    border-right:0.25px solid lightgray;
    border-bottom: 0.5px solid lightgray;
    border-top: 0.5px solid lightgray;
    border-left:0.5px solid lightgray;
    border-width: 1;
    border-color:lightgray;
  }
   ListView { separator-color: transparent; }
</style>
