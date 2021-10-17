
<template>
    <Page>
        <ActionBar>
          <StackLayout orientation="horizontal">
            <Label text="Post a message"></Label>
            <Button v-if="messageContent.length === 3" @tap="postMessage">Send</Button>
          </StackLayout>
        </ActionBar>
        <StackLayout>
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
            <TextField v-model="messageContent" />
          </StackLayout>
          <Button @tap="openImagePicker" >img</Button>
          <Button @tap="openFilePicker" >file</Button>
        </StackLayout>
    </Page>
</template>

<script>
  import * as imagepicker from "@nativescript/imagepicker";
  import * as bgHttp from "@nativescript/background-http";
  import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
  import { apolloClient } from '../../../app.js';
  import { gql } from "apollo-boost";
  import {Image} from 'tns-core-modules/ui/image';
  import {File, knownFolders, path} from 'tns-core-modules/file-system';
  import {ImageSource} from 'tns-core-modules/image-source';
  import axios from 'axios'


  export default {
  
    data() {
      return {
        messageContent: '',
        imagePicker: imagepicker,
        file: '',
        imagePickerOptions: {
          android: {
            isCaptureMood: false, // if true then camera will open directly.
            isNeedCamera: true,
            maxNumberFiles: 1,
            isNeedFolderList: true
          }, ios: {
            isCaptureMood: false, // if true then camera will open directly.
            isNeedCamera: true,
            maxNumberFiles: 1
          }
        },
        filePickerOptions: {
          android: {
              extensions: ['txt', 'pdf'],
              maxNumberFiles: 2
          },
          ios: {
            extensions: [kUTTypePDF, kUTTypeText],
            multipleSelection: true
          }
        },
        mediafilepicker: new Mediafilepicker(),
      };
    },

    methods:{
      openImagePicker() {
        this.mediafilepicker.openImagePicker(this.imagePickerOptions);
        
        this.mediafilepicker.on("getFiles", function (res) {
          let results = res.object.get("results");
          console.log(results);
          this.file = results
        });
        this.mediafilepicker.on("error", function (res) {
          let msg = res.object.get("msg");
          console.log(msg);
        });
        this.mediafilepicker.on("cancel", function (res) {
          let msg = res.object.get("msg");
          console.log(msg);
        });
      },

      openFilePicker() {
        this.mediafilepicker.openFilePicker(this.filePickerOptions);

        this.mediafilepicker.on("getFiles", function (res) {
          let results = res.object.get("results");
          console.log(results);
          this.file = results
        });
        this.mediafilepicker.on("error", function (res) {
          let msg = res.object.get("msg");
          console.log(msg);
        });
        this.mediafilepicker.on("cancel", function (res) {
          let msg = res.object.get("msg");
          console.log(msg);
        });
    },
      
      sendFile(id) {
        console.log('id == ', id);
        let session = bgHttp.session("image-upload");
        let request = {
          url: `http://192.168.1.63:8080/upload/${id}`,  // with user => localStorage.getItem("uid") + "/upload"   ,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: { id },
          description: "FileName"
        };
        let params = [{
          name: "file",
          filename: this.mediafilepicker.results[0].file,
          id,
        }];
        let task = session.multipartUpload(params, request);
        task.on("error", (e) => {
          console.log(e);
          return false;
        });
        task.on("complete", (e) => {
          return true
        });
      },

      async postMessage(){
        try{
          const { data } = await apolloClient.mutate({
            mutation: gql`
            mutation($data: PostInput!){
              CreatePost(data: $data)
            }`,
            variables:{
              data: { 
                message: this.messageContent,
                user: "61630e3c0665df912b3d9d8a",
                }
            }
          })
          if(data.CreatePost) {
            this.sendFile(data.CreatePost) 
              ? this.$navigator.back()
              : console.log('Something went wrong with sending file')
          } else {
            console.log('Post not created')
          }
          // Show warning that somethign went wrong!
        } catch (e){
          // Show warning that somethign went wrong!
          console.log(e)
        }
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
