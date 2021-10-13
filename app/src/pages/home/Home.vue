<template>
    <Page backgroundColor="lightgrey">
    <StackLayout>
      <GridLayout columns="50, *, 50" rows="45, 70" backgroundColor="black">
        <Label  borderRadius="50" height="30" width="30" backgroundColor="white" style="text-align: center" fontSize="15" class="fa" :text="'fa-bars' | fonticon" row="0" col="0" />
        <TextView paddingLeft="15" height="35" padding="5" class="align-center transparent" editable="false" row="0" col="1" borderRadius="8">
          <FormattedString >
            <Span class="fa" :text="'fa-search' | fonticon" fontSize="20"/>
            <Span text="M" fontSize="15" color="transparent"/>
            <Span text="My timeline" fontSize="15" />
          </FormattedString>
        </TextView>
        <Label row="0" col="3" color="white" style="text-align: center" fontSize="22" class="fa" :text="'fa-bell' | fonticon" />
        <Label class="text-center" row="0" col="3" fontSize="10"  fontWeigth="bold" marginLeft="12" marginBottom="25" backgroundColor="red" color="white" borderRadius="50" borderColor="red" borderWidth="1" height="13.5" width="13.5" text="16" />
        <StackLayout padding="10" row="1" colSpan="3" >
          <Label color="white" fontSize="22" text="My timeline"/>
          <FlexboxLayout orientation="vertical">
            <Label color="white" marginLeft="5" fontSize="12" class="fa" :text="'fa-map-marker' | fonticon" />
            <Label color="white" marginLeft="5" text="Middelburg"/>
          </FlexboxLayout>

        </StackLayout>
      </GridLayout>
      <FlexboxLayout backgroundColor="white" height="35" borderWidth="0,0,1,0" borderColor="grey">
        <Label text="MESSAGES" marginLeft="5" marginRight="5" />
        <Label text="IMPORTANT" marginLeft="5" marginRight="5" />
        <Label text="FILES" marginLeft="5" marginRight="5" />
      </FlexboxLayout>
      <FlexboxLayout backgroundColor="white" height="35" borderWidth="0,0,1,0" borderColor="grey">
        <Label class="fa" @tap="createPost" fontSize="35" :text="'fa-plus-circle' | fonticon"/>
      </FlexboxLayout>

      <ScrollView orientation="vertical" height="100%">
        <ListView for="post in posts" @itemTap="onPostTap" class="list-group" marginTop="5">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <StackLayout backgroundColor="lightgrey" >
              <GridLayout columns="50, *, 20" rows="65" marginTop="-10" backgroundColor="white">
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
              <Label :text="post.message" backgroundColor="white"/>
            <StackLayout backgroundColor="white">

              <Image v-if="post.img" 
                  src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png" 
                  stretch="aspectFit"
                  width="350" height="350"
                  backgroundColor="white"
              />
            </StackLayout>
              <FlexboxLayout alignItems="flex-start" orientation="vertical" flexDirection="row" backgroundColor="white">
                <Label fontSize="10" :text="`${post.likes} likes`" />
                <Label fontSize="10" :text="`${post.comments.length} comments`" />
                <Label fontSize="10" alignSelf="flex-end" :text="`${post.seen}x seen`" />
              </FlexboxLayout>
              <GridLayout rows="55" columns="*,*" backgroundColor="white">
                <TextView editable="false" row="0" col="0" height="45" style="text-align: center" width="100%" class="borderRight">
                  <FormattedString >
                    <Span marginTop="3" class="fa" :text="'fa-thumbs-o-up' | fonticon" />
                    <Span text="   "/>
                    <Span marginTop="3" text="Like" />
                  </FormattedString>
                </TextView>
                <TextView editable="false" row="0" col="1" height="45" style="text-align: center" width="100%" class="borderLeft">
                  <FormattedString>
                    <Span marginTop="3" class="fa" :text="'fa-comment-o' | fonticon" />
                    <Span text="   "/>
                    <Span marginTop="3" text="Reply" />
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
  import { gql } from "apollo-boost";
  import { apolloClient } from '../../../app.js'


  export default {

    data() {
      return {
        users: [{name: ''}],
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

    async created(){
      console.log('hoi');
      apolloClient.query({
        query: gql`
        query{
          FindUser{
            name
            email
            _id
          }
        }`,
        variables:{},
      }).then((data) =>{
        console.log(data.data.FindUser);
        this.users = data.data.FindUser
      })
    },
    methods: {
      createPost(){
        try{
          this.$navigator.navigate('/createPost')
        } catch(e){
          console.log(e);
        }
      },
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

  .borderRight{
    margin-top: 40px;
    margin-bottom: -20px;
    border-width:  0.5 0.25 0 0;
    border-color:lightgray;
  }
  .borderLeft{
    margin-top: 40px;
    margin-bottom: -20px;
    border-width:  0.5 0 0 0.25;
    border-color:lightgray;
  }
  .transparent{
    background-color: rgba(255, 255, 255, 0.7);
  }
   ListView { separator-color: transparent; }
</style>
